import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { I18nProvider } from "@/locales";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI计算器 - 免费在线体质指数与卡路里计算 | BMI Calculator",
  description:
    "免费在线BMI体质指数计算器，输入身高体重即可计算BMI、基础代谢率(BMR)和每日总消耗(TDEE)，科学制定减脂增肌饮食计划。支持中英文、公制英制单位。",
  keywords: [
    "BMI计算器",
    "BMI在线计算",
    "体质指数计算器",
    "卡路里计算器",
    "基础代谢率计算",
    "BMR计算",
    "TDEE计算",
    "每日热量需求",
    "减脂计划",
    "增肌饮食",
    "健康体重计算",
    "体重指数",
    "BMI calculator",
    "calorie calculator",
    "BMR calculator",
    "TDEE calculator",
    "weight loss calculator",
    "daily calorie intake",
  ],
  authors: [{ name: "BMI Calculator" }],
  robots: "index, follow",
  openGraph: {
    title: "BMI计算器 - 免费在线体质指数与卡路里计算",
    description:
      "免费在线BMI计算器，快速计算体质指数、基础代谢率和每日总热量消耗，帮你科学制定减脂或增肌计划。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "BMI计算器 - 免费在线体质指数与卡路里计算",
    description:
      "免费在线BMI计算器，快速计算体质指数、基础代谢率和每日总热量消耗，帮你科学制定减脂或增肌计划。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
