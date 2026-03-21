import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/locales";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI & 卡路里计算器 | BMI & Calorie Calculator",
  description:
    "免费在线BMI计算器，支持BMR基础代谢率和TDEE每日总消耗计算。Free BMI calculator with BMR and TDEE calculation for weight loss or muscle gain.",
  keywords: [
    "BMI计算器",
    "卡路里计算",
    "基础代谢率",
    "TDEE",
    "减脂",
    "增肌",
    "BMI calculator",
    "calorie calculator",
    "BMR",
    "weight loss",
  ],
  openGraph: {
    title: "BMI & 卡路里计算器 | BMI & Calorie Calculator",
    description:
      "免费在线BMI计算器，支持基础代谢率和每日总消耗计算，制定科学减脂增肌计划。",
    type: "website",
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
    </html>
  );
}
