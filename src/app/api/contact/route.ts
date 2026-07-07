import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
// Serverless instances don't share this map, so it's a speed bump for
// unsophisticated spam, not a guarantee.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages in a short time. Please try again later, or call or WhatsApp us." },
      { status: 429 },
    );
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const projectType = (body.projectType ?? "").toString().trim();
  const budget = (body.budget ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();
  const honeypot = (body.company ?? "").toString().trim();

  // A filled honeypot means a bot; pretend success so it moves on.
  if (honeypot) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 422 },
    );
  }

  if (
    name.length > 200 ||
    email.length > 254 ||
    phone.length > 50 ||
    projectType.length > 100 ||
    budget.length > 100 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Your message is too long — please shorten it and try again." },
      { status: 422 },
    );
  }

  const html = `
    <h2>New enquiry — ${site.name}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>Project type:</strong> ${escapeHtml(projectType) || "—"}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budget) || "—"}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;

  // Until Resend is configured (API key + verified domain), log the lead so the
  // form still works in development / preview. Configure the env vars to send.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — lead logged, not emailed:", {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "EGY-KEN Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      replyTo: email,
      subject: `New enquiry from ${name} — ${projectType || "General"}`,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please call or WhatsApp us." },
      { status: 502 },
    );
  }
}
