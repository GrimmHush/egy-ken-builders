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

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const projectType = (body.projectType ?? "").toString().trim();
  const budget = (body.budget ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
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
