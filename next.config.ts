import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 防止页面被嵌入 iframe（Clickjacking 攻击）
          { key: "X-Frame-Options", value: "DENY" },
          // 防止浏览器猜测 MIME 类型（MIME 嗅探攻击）
          { key: "X-Content-Type-Options", value: "nosniff" },
          // 控制 Referrer 信息，避免泄露完整 URL
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // 强制 HTTPS（部署后生效）
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // 禁止浏览器使用过时的 XSS 过滤器，改由 CSP 控制
          { key: "X-XSS-Protection", value: "0" },
          // 限制浏览器 API 权限（摄像头/麦克风/地理位置等）
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // 内容安全策略：限制资源加载来源，防止 XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js 需要 inline script（nonce 方案更安全，但配置复杂）
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://hm.baidu.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://hm.baidu.com https://api.resend.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
