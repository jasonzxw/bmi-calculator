import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import zh from "@/locales/zh";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "BMI计算器 - 免费在线体质指数与卡路里计算",
      description:
        "免费在线BMI体质指数计算器，输入身高体重即可计算BMI、基础代谢率(BMR)和每日总消耗(TDEE)，科学制定减脂增肌饮食计划。",
      applicationCategory: "HealthApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CNY",
      },
      featureList: [
        "BMI体质指数计算",
        "基础代谢率(BMR)计算",
        "每日总消耗(TDEE)计算",
        "三大营养素分配建议",
        "减脂/增肌/维持热量方案",
        "公制英制单位切换",
        "中英文双语支持",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: zh.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Calculator />
      <FAQ />
    </>
  );
}
