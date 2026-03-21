# Next.js 项目 SEO 完整指南

> 基于实际项目总结，适用于所有 Next.js 14+ App Router 项目。
> 按照本文档步骤操作，可覆盖 90% 的 SEO 基础工作。

---

## 目录

1. [TDK - 标题、描述、关键词](#一tdk---标题描述关键词)
2. [Open Graph - 社交分享预览](#二open-graph---社交分享预览)
3. [Sitemap - 站点地图](#三sitemap---站点地图)
4. [Robots.txt - 爬虫规则](#四robotstxt---爬虫规则)
5. [JSON-LD 结构化数据](#五json-ld-结构化数据)
6. [FAQ 内容模块](#六faq-内容模块)
7. [Google Search Console 提交](#七google-search-console-提交)
8. [数据统计埋点](#八数据统计埋点)
9. [检查清单](#九上线前-seo-检查清单)
10. [时间线预期](#十排名时间线预期)

---

## 一、TDK - 标题、描述、关键词

### 作用
TDK 是 Google 理解你网站内容的最基础信号，直接影响搜索结果的展示样式和点击率。

### 在哪里写
`src/app/layout.tsx` — 全局生效，所有页面共享。子页面可在各自的 `page.tsx` 中覆盖。

### 代码示例

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // ① Title：核心关键词前置，控制在 60 字符以内
  title: "BMI计算器 - 免费在线体质指数与卡路里计算 | BMI Calculator",

  // ② Description：包含核心功能、用户动作、差异化点，120-160 字符
  description:
    "免费在线BMI体质指数计算器，输入身高体重即可计算BMI、基础代谢率(BMR)和每日总消耗(TDEE)，科学制定减脂增肌饮食计划。支持中英文、公制英制单位。",

  // ③ Keywords：精确词 + 长尾词 + 中英文混合
  keywords: [
    "BMI计算器",
    "BMI在线计算",
    "卡路里计算器",
    "基础代谢率计算",
    "BMR计算",
    "TDEE计算",
    "减脂计划",
    "BMI calculator",
    "calorie calculator",
    "weight loss calculator",
  ],

  // ④ 其他基础配置
  authors: [{ name: "你的网站名" }],
  robots: "index, follow", // 允许 Google 收录和跟踪链接
};
```

### 写作原则

| 字段 | 长度限制 | 核心原则 |
|------|---------|---------|
| Title | ≤ 60 字符 | 核心关键词放最前面，超出会被截断 |
| Description | 120-160 字符 | 包含动作词（"输入/计算/制定"），提升点击率 |
| Keywords | 10-20 个 | 精确词 + 长尾词，避免堆砌无关词 |

---

## 二、Open Graph - 社交分享预览

### 作用
控制链接分享到微信、微博、Twitter、Facebook 时显示的预览卡片（标题、描述、图片）。没有 OG 标签，分享出去的链接会显示为一段乱糟糟的 URL。

### 代码示例

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  // ...TDK 配置

  openGraph: {
    title: "BMI计算器 - 免费在线体质指数与卡路里计算",
    description: "免费在线BMI计算器，快速计算体质指数、基础代谢率和每日总热量消耗。",
    type: "website",         // 网站类型，文章用 "article"
    locale: "zh_CN",
    alternateLocale: "en_US",
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }], // 可选，分享时显示的图片
  },

  twitter: {
    card: "summary",         // 有图片时用 "summary_large_image"
    title: "BMI计算器 - 免费在线体质指数与卡路里计算",
    description: "免费在线BMI计算器，帮你科学制定减脂或增肌计划。",
  },
};
```

### 建议
- 准备一张 **1200×630px** 的 `og-image.png` 放在 `public/` 目录，分享效果更好
- 可用 [opengraph.xyz](https://www.opengraph.xyz) 预览分享效果

---

## 三、Sitemap - 站点地图

### 作用
告诉 Google「我的网站有哪些页面」，加快收录速度。没有 sitemap，Google 靠自己爬虫发现页面，可能需要数周。

### 创建文件
`src/app/sitemap.ts` — Next.js 自动生成 `/sitemap.xml`

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://你的默认域名.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // 首页
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly", // 更新频率：daily/weekly/monthly/yearly
      priority: 1,                // 优先级 0-1，首页设为最高
    },
    // 多页面时继续添加
    // {
    //   url: `${BASE_URL}/blog/article-slug`,
    //   lastModified: new Date("2024-01-01"),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}
```

### 环境变量配置

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://你的域名.com
```

> 绑定自定义域名后只需修改环境变量，无需改代码。

### 验证
部署后访问 `你的域名/sitemap.xml` 确认能正常访问。

---

## 四、Robots.txt - 爬虫规则

### 作用
告诉 Google 和其他搜索引擎爬虫哪些页面可以抓取，哪些不行，并指向 sitemap 地址。

### 创建文件
`src/app/robots.ts` — Next.js 自动生成 `/robots.txt`

```typescript
// src/app/robots.ts
import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://你的默认域名.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",   // 对所有爬虫生效
      allow: "/",       // 允许抓取所有页面
      // disallow: ["/admin", "/api"], // 不想被收录的路径
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // 告诉爬虫 sitemap 在哪
  };
}
```

### 验证
部署后访问 `你的域名/robots.txt` 确认格式正确。

---

## 五、JSON-LD 结构化数据

### 作用
用机器可读的格式告诉 Google「这个页面是什么类型的内容」。Google 可能在搜索结果中展示**富摘要（Rich Results）**，让你的结果比普通链接更醒目，点击率提升 2-3 倍。

### 常用类型

| Schema 类型 | 适用场景 | 搜索结果效果 |
|------------|---------|------------|
| `WebApplication` | 在线工具/App | 显示应用评分、价格 |
| `FAQPage` | 含有问答内容 | 直接展开问题列表 |
| `Article` | 博客文章 | 显示发布时间、作者 |
| `Product` | 产品页 | 显示价格、评分 |
| `HowTo` | 教程/步骤 | 显示步骤列表 |

### 在 Next.js 中使用

```tsx
// src/app/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ① 工具类网站用 WebApplication
    {
      "@type": "WebApplication",
      name: "网站名称",
      description: "网站描述",
      applicationCategory: "HealthApplication", // 根据类型修改
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",           // 免费工具
        priceCurrency: "CNY",
      },
    },
    // ② 有 FAQ 内容时加 FAQPage
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面内容 */}
    </>
  );
}
```

### 验证工具
- [Google 富媒体搜索测试](https://search.google.com/test/rich-results) — 检查结构化数据是否有效
- [Schema.org 验证器](https://validator.schema.org) — 检查格式是否正确

---

## 六、FAQ 内容模块

### 作用
- **覆盖长尾关键词**：每个 FAQ 问题就是一个用户搜索词
- **增加页面内容量**：内容越丰富 Google 越容易理解页面主题
- **配合 FAQPage JSON-LD**：搜索结果可直接展开问答，占更多版面

### FAQ 问题选题原则

```
✅ 选用户真实会搜的问题（去百度/Google 搜主关键词，看联想词）
✅ 回答要有实质内容，200-400 字最佳
✅ 答案中自然带入核心关键词
❌ 不要写"关于我们"、"如何联系"这类对 SEO 无意义的问题
```

### 参考结构

```
每个 FAQ 项：
  问题（= 用户搜索词）
  答案（实质内容 + 自然包含关键词 + 200字左右）
```

---

## 七、Google Search Console 提交

### 作用
让 Google 主动来爬你的网站，而不是等 Google 自己发现。提交后收录速度从「几周」加速到「几天」。

### 完整步骤

**Step 1：添加域名验证**

在 `layout.tsx` 的 metadata 里加入验证码：

```typescript
export const metadata: Metadata = {
  // ...其他配置
  verification: {
    google: "从Search Console获取的验证码",
  },
};
```

> 验证码获取：[search.google.com/search-console](https://search.google.com/search-console) → 添加资源 → 网址前缀 → HTML 标记

**Step 2：部署到线上**

验证码必须在线上能访问才能通过验证，本地 localhost 无效。

**Step 3：回到 Search Console 点击验证**

**Step 4：提交 Sitemap**

```
左侧菜单 → 站点地图 → 输入「sitemap.xml」→ 提交
```

**Step 5：请求编入索引（可选，加速首次收录）**

```
左侧菜单 → 网址检查 → 输入首页 URL → 请求编入索引
```

### 后续用 Search Console 能做什么

| 功能 | 用途 |
|------|------|
| 效果报告 | 查看哪些关键词带来了展示和点击 |
| 覆盖率 | 查看哪些页面被收录，哪些有问题 |
| 核心网页指标 | 查看 LCP/CLS/INP 性能数据 |
| 链接报告 | 查看有哪些外部网站链接了你 |

---

## 八、数据统计埋点

### Google Analytics 4（面向海外用户）

**安装：**
```bash
npm install @next/third-parties
```

**在 layout.tsx 使用：**
```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

// 在 <html> 标签内加入（环境变量控制，没配置时不加载）
{process.env.NEXT_PUBLIC_GA_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
)}
```

**环境变量：**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 百度统计（面向国内用户）

**创建组件 `src/components/BaiduAnalytics.tsx`：**
```tsx
import Script from "next/script";

export default function BaiduAnalytics({ baiduId }: { baiduId: string }) {
  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}
```

**环境变量：**
```bash
NEXT_PUBLIC_BAIDU_ID=你的32位百度统计ID
```

### 自定义事件埋点

```typescript
// src/lib/analytics.ts
declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
```

**隐私注意事项：**
```
✅ 可以上报：用户行为（点击了哪个功能、选择了什么目标）
✅ 可以上报：聚合统计（BMI 分类分布、年龄段分布）
❌ 不应上报：精确年龄、精确 BMI 数值等个人健康数据
```

---

## 九、上线前 SEO 检查清单

```
基础配置
□ layout.tsx 中 Title 已填写，核心词在前，≤60字符
□ layout.tsx 中 Description 已填写，120-160字符
□ layout.tsx 中 Keywords 已填写，10-20个
□ layout.tsx 中 robots = "index, follow"
□ <html> 标签设置了正确的 lang 属性（中文：zh-CN）

社交分享
□ openGraph.title 已填写
□ openGraph.description 已填写
□ openGraph.type 已设置
□ twitter.card 已设置
□ （可选）准备了 1200×630 的 og-image.png

技术文件
□ src/app/sitemap.ts 已创建，URL 使用环境变量
□ src/app/robots.ts 已创建，指向 sitemap
□ 环境变量 NEXT_PUBLIC_SITE_URL 已配置

结构化数据
□ 页面加入了适合的 JSON-LD（WebApplication / FAQPage / Article）
□ 用 Google 富媒体测试工具验证通过

内容质量
□ 页面有实质性文字内容（不只是工具，还有说明/FAQ）
□ FAQ 至少 5 条，问题对应真实用户搜索词
□ 图片有 alt 属性

Search Console
□ 域名已验证（verification.google 已填写）
□ sitemap 已提交
□ 首页已请求编入索引
```

---

## 十、排名时间线预期

```
第 1-2 周    Search Console 显示页面已收录，开始有展示量（可能很少）
第 1-3 个月  长尾词（如"BMI计算器在线免费"）开始出现在第 2-3 页
第 3-6 个月  持续更新内容后，部分关键词进入第 1 页
6 个月以上   积累外链（知乎/小红书引用）后，核心词排名稳步提升
```

### 影响排名的核心因素

| 因素 | 权重 | 你能做的 |
|------|------|---------|
| 内容质量和相关性 | ⭐⭐⭐⭐⭐ | 写高质量 FAQ 和科普内容 |
| 外链数量和质量 | ⭐⭐⭐⭐ | 知乎/小红书发内容带链接 |
| 页面加载速度 | ⭐⭐⭐ | Next.js + Vercel 已保障 |
| 用户体验信号 | ⭐⭐⭐ | 降低跳出率，增加停留时间 |
| 关键词精准度 | ⭐⭐⭐ | TDK 关键词与内容匹配 |

---

## 附：Next.js SEO 相关文件结构

```
src/
├── app/
│   ├── layout.tsx        # TDK + OG + 验证码 + GA 脚本
│   ├── page.tsx          # JSON-LD 结构化数据
│   ├── sitemap.ts        # 自动生成 /sitemap.xml
│   └── robots.ts         # 自动生成 /robots.txt
├── components/
│   ├── FAQ.tsx           # FAQ 内容模块（配合 FAQPage JSON-LD）
│   └── BaiduAnalytics.tsx # 百度统计组件
└── lib/
    └── analytics.ts      # GA4 自定义事件埋点工具函数
```

---

> 最后更新：2026-03-21
> 适用框架：Next.js 14+ App Router
