import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

// Upstash Redis 持久化限流（Serverless 环境安全）
// 若未配置 Redis，降级为宽松放行（不影响功能，但限流失效）
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
    })
  : null;

const RATE_LIMIT = 5;          // 最多 5 次
const RATE_WINDOW = 60 * 10;   // 10 分钟（秒）

async function checkRateLimit(ip: string): Promise<boolean> {
  if (!redis) return true; // 未配置 Redis 时放行
  const key = `feedback:rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_WINDOW);
  return count <= RATE_LIMIT;
}

// 防止 XSS / HTML 注入：对插入邮件 HTML 的内容做转义
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    // 修复 IP 伪造：优先使用 x-real-ip，取最后一个 x-forwarded-for 值
    const ip =
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ??
      "unknown";

    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests, please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, message } = body;

    // 修复消息长度：加上限 2000 字
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 2000
    ) {
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

    // 修复 HTML 注入：对所有用户输入做转义后再插入 HTML
    const safeEmail = email ? escapeHtml(email.trim()) : "";
    const safeMessage = escapeHtml(message.trim());

    await resend.emails.send({
      from: "BMI Calculator Feedback <onboarding@resend.dev>",
      to,
      replyTo: email || undefined,
      subject: `[BMI Calculator] 新反馈${safeEmail ? ` from ${safeEmail}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#16a34a;margin-bottom:4px;">📬 新用户反馈</h2>
          <p style="color:#6b7280;font-size:14px;margin-top:0;">来自 BMI &amp; 卡路里计算器</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#374151;font-weight:600;width:80px;vertical-align:top;">邮箱</td>
              <td style="padding:10px 0;color:#6b7280;">
                ${safeEmail
                  ? `<a href="mailto:${safeEmail}" style="color:#16a34a;">${safeEmail}</a>`
                  : "未提供"}
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#374151;font-weight:600;vertical-align:top;">内容</td>
              <td style="padding:10px 0;color:#374151;line-height:1.6;white-space:pre-wrap;">${safeMessage}</td>
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
