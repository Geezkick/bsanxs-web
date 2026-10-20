import { setDefaultResultOrder } from "node:dns";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

setDefaultResultOrder("ipv4first");

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  // Browser submissions must originate from this same site.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return NextResponse.json(
          { error: "Invalid request origin." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;

  const getText = (key: string) =>
    typeof input[key] === "string" ? (input[key] as string).trim() : "";

  // Honeypot: report generic success without storing bot submissions.
  if (getText("website")) {
    return NextResponse.json({ success: true });
  }

  const name = getText("name");
  const email = getText("email");
  const company = getText("company");
  const service = getText("service");
  const budget = getText("budget");
  const message = getText("message");

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json(
      { error: "Please enter a valid name." },
      { status: 400 }
    );
  }

  if (email.length > 254 || !validEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (
    company.length > 200 ||
    service.length > 100 ||
    budget.length > 100 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("project_enquiries")
      .insert({
        name,
        email,
        company: company || null,
        service: service || null,
        budget: budget || null,
        message,
        status: "new",
      });

    if (error) {
      console.error("Enquiry insert failed:", error.code);
      return NextResponse.json(
        { error: "We couldn't submit your enquiry. Please try again shortly." },
        { status: 500 }
      );
    }

    // Email is best-effort: a delivery failure must not lose the enquiry.
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.BSANXS_EMAIL_FROM;
    const notificationEmail = process.env.BSANXS_NOTIFICATION_EMAIL;

    if (apiKey && from && notificationEmail) {
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      };

      const notify = fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
          from,
          to: [notificationEmail],
          subject: `New BSANXS project enquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || "Not provided"}`,
            `Service: ${service || "Not specified"}`,
            `Budget: ${budget || "Not specified"}`,
            "",
            "Project message:",
            message,
          ].join("\n"),
          reply_to: email,
        }),
      });

      const confirm = fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
          from,
          to: [email],
          subject: "We received your project enquiry | BSANXS",
          text: [
            `Hello ${name},`,
            "",
            "Thank you for contacting BSANXS. We have received your project enquiry and will review it.",
            "",
            "Regards,",
            "BSANXS",
          ].join("\n"),
        }),
      });

      const results = await Promise.allSettled([notify, confirm]);
      for (const result of results) {
        if (
          result.status === "rejected" ||
          (result.status === "fulfilled" && !result.value.ok)
        ) {
          console.error("An enquiry email could not be delivered.");
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "A connection issue prevented submission. Please try again." },
      { status: 500 }
    );
  }
}
