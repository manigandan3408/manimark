import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "manigandan3408@gmail.com";

const VALID_REQUEST_TYPES = [
  "Project Enquiry",
  "Website Problem",
  "Service Request",
  "Feedback",
  "Other",
];

function sanitize(input: string, maxLength: number): string {
  return input.slice(0, maxLength).trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple IP-based rate limiting using the database
async function checkRateLimit(
  supabase: ReturnType<typeof createClient>,
  ip: string
): Promise<boolean> {
  // Allow max 3 submissions per IP per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", oneHourAgo);

  // We can't filter by IP since we don't store it, but we can limit total submissions per hour
  // as a basic spam protection. Allow max 30 total per hour.
  if (error) return true; // fail open
  return (count ?? 0) < 30;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    // Validate required fields
    const name = sanitize(body?.name ?? "", 200);
    const email = sanitize(body?.email ?? "", 200);
    const phone = sanitize(body?.phone ?? "", 50);
    const requestType = sanitize(body?.requestType ?? "", 50);
    const message = sanitize(body?.message ?? "", 5000);

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "A valid email address is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!requestType || !VALID_REQUEST_TYPES.includes(requestType)) {
      return new Response(
        JSON.stringify({ error: "A valid request type is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store submission in the database
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Rate limit check
    const allowed = await checkRateLimit(supabase, "");
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: insertData, error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        request_type: requestType,
        message,
        email_sent: false,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (insertError || !insertData) {
      console.error("Database insert error:", insertError?.message);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const submissionId = insertData.id;
    const submissionDate = insertData.created_at;

    // Send email notification via Resend
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured — submission saved but no email sent");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Your message has been received. I'll get back to you soon.",
          emailSent: false,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isProblemReport = requestType === "Website Problem";
    const subjectPrefix = isProblemReport
      ? "New Website Problem Report"
      : "New Customer Enquiry";
    const emailSubject = `${subjectPrefix} — ${name}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#16161f;border:1px solid #2a2a38;border-radius:8px;overflow:hidden;">
      <div style="background:#0f0f16;padding:24px 32px;border-bottom:1px solid #2a2a38;">
        <h1 style="color:#e8e8f0;font-size:20px;font-weight:600;margin:0;letter-spacing:0.5px;">${emailSubject}</h1>
        <p style="color:#8a8a9e;font-size:13px;margin:8px 0 0;">MANIMARK Website Contact Form</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;width:120px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;color:#e8e8f0;font-size:15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c4a86f;font-size:15px;text-decoration:none;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Phone</td>
            <td style="padding:8px 0;"><a href="tel:${phone}" style="color:#c4a86f;font-size:15px;text-decoration:none;">${phone}</a></td>
          </tr>` : ""}
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Request Type</td>
            <td style="padding:8px 0;color:#e8e8f0;font-size:15px;">${requestType}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Date</td>
            <td style="padding:8px 0;color:#e8e8f0;font-size:15px;">${submissionDate}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Submission ID</td>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-family:monospace;">${submissionId}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8a8a9e;font-size:13px;font-weight:500;vertical-align:top;">Status</td>
            <td style="padding:8px 0;color:#c4a86f;font-size:15px;">New</td>
          </tr>
        </table>
        <div style="margin:24px 0;border-top:1px solid #2a2a38;"></div>
        <p style="color:#8a8a9e;font-size:13px;font-weight:500;margin:0 0 8px;">Message</p>
        <div style="background:#0a0a0f;border:1px solid #2a2a38;border-radius:6px;padding:16px;color:#b8b8c8;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="background:#0f0f16;padding:16px 32px;border-top:1px solid #2a2a38;">
        <p style="color:#5a5a6e;font-size:12px;margin:0;">This message was submitted through the MANIMARK website contact form.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    const textBody = `${subjectPrefix} — ${name}

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}Request Type: ${requestType}
Date: ${submissionDate}
Submission ID: ${submissionId}
Status: New

Message:
${message}

---
This message was submitted through the MANIMARK website contact form.`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MANIMARK Website <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errorText);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Your message has been received. There was a delay in email delivery — your submission is still saved.",
          emailSent: false,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark email as sent
    await supabase
      .from("contact_submissions")
      .update({ email_sent: true })
      .eq("id", submissionId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thanks — your message has been received. I'll get back to you soon.",
        emailSent: true,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
