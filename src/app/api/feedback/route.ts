import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting: max 5 requests per IP per 10 minutes
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000; // 10 minutes
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests, please try again later." },
        { status: 429 }
      );
    }

    const { email, message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const to = process.env.FEEDBACK_TO_EMAIL;
    if (!to) {
      console.error("FEEDBACK_TO_EMAIL is not configured");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "BMI Calculator Feedback <onboarding@resend.dev>",
      to,
      replyTo: email || undefined,
      subject: `[BMI Calculator] 新反馈${email ? ` from ${email}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#16a34a;margin-bottom:4px;">📬 新用户反馈</h2>
          <p style="color:#6b7280;font-size:14px;margin-top:0;">来自 BMI & 卡路里计算器</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#374151;font-weight:600;width:80px;vertical-align:top;">邮箱</td>
              <td style="padding:10px 0;color:#6b7280;">
                ${email ? `<a href="mailto:${email}" style="color:#16a34a;">${email}</a>` : "未提供"}
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#374151;font-weight:600;vertical-align:top;">内容</td>
              <td style="padding:10px 0;color:#374151;line-height:1.6;white-space:pre-wrap;">${message.trim()}</td>
            </tr>
          </table>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
          <p style="color:#9ca3af;font-size:12px;">
            发送时间：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
