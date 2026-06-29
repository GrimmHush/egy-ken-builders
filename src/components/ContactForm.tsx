"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Residential",
  "Commercial / Mixed-Use",
  "Civil & Infrastructure",
  "Padel / Sports Facility",
  "Facades & Joinery",
  "Other",
];

const budgets = [
  "Under KSh 5M",
  "KSh 5M – 20M",
  "KSh 20M – 50M",
  "KSh 50M – 100M",
  "KSh 100M+",
  "Not sure yet",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldBase =
  "w-full rounded-md border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-concrete-dark transition-colors focus:border-steel focus:outline-none focus:ring-2 focus:ring-steel/25";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-deep">
      {children}
      {required && <span className="ml-0.5 text-amber-deep">*</span>}
    </label>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    const message = String(data.get("message") ?? "").trim();
    if (message.length < 10) next.message = "Please add a few details (at least 10 characters).";
    return next;
  }

  function handleBlur(e: React.FocusEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const name = (e.target as unknown as HTMLInputElement).name;
    if (name !== "name" && name !== "email" && name !== "message") return;
    const next = validate(form);
    setErrors((prev) => ({ ...prev, [name]: next[name as keyof Errors] }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    const firstInvalid = (["name", "email", "message"] as const).find(
      (k) => next[k],
    );
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMsg("");
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center rounded-xl border border-steel/20 bg-white p-10 text-center shadow-card"
        role="status"
      >
        <CheckCircle2 className="h-12 w-12 text-steel" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-navy-deep">
          Thank you — message received.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-charcoal/75">
          Our team will get back to you within one business day. For anything
          urgent, call or WhatsApp us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-steel hover:text-amber-deep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      noValidate
      className="rounded-xl border border-concrete/50 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>Full name</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Wanjiru"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldBase, errors.name ? "border-red-500" : "border-concrete")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" required>Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldBase, errors.email ? "border-red-500" : "border-concrete")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+254 7xx xxx xxx"
            className={cn(fieldBase, "border-concrete")}
          />
        </div>

        <div>
          <Label htmlFor="projectType">Project type</Label>
          <select id="projectType" name="projectType" defaultValue="" className={cn(fieldBase, "border-concrete")}>
            <option value="" disabled>Select…</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="budget">Estimated budget</Label>
          <select id="budget" name="budget" defaultValue="" className={cn(fieldBase, "border-concrete")}>
            <option value="" disabled>Select a range…</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message" required>Tell us about your project</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Location, scope, timeline and anything else we should know…"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(fieldBase, "resize-y", errors.message ? "border-red-500" : "border-concrete")}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite" className="min-h-5">
        {status === "error" && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" /> {serverMsg || "Couldn't send — please try again or contact us directly."}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-200 hover:bg-amber-soft active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
    </form>
  );
}
