"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import CalculatorForm from "./CalculatorForm";
import ResultCard from "./ResultCard";
import { calculate } from "@/lib/calc";
import { trackEvent } from "@/lib/analytics";
import type { FormData, CalcResult, Goal } from "@/types";

export default function Calculator() {
  const { t, locale, setLocale } = useI18n();
  const [result, setResult] = useState<CalcResult | null>(null);
  const [lastGoal, setLastGoal] = useState<Goal>("maintain");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCalculate = (data: FormData) => {
    setIsAnimating(true);
    setTimeout(() => {
      const res = calculate(data);
      setResult(res);
      setLastGoal(data.goal);
      setIsAnimating(false);
      trackEvent("calculate", {
        gender: data.gender,
        age: data.age,
        bmi: res.bmi,
        bmi_category: res.bmiCategory,
        goal: data.goal,
        activity_level: data.activityLevel,
        unit_system: data.unitSystem,
      });
      setTimeout(() => {
        document.getElementById("result-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }, 600);
  };

  const handleReset = () => {
    trackEvent("reset", {});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLocaleChange = (l: "zh" | "en") => {
    setLocale(l);
    trackEvent("language_switch", { locale: l });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">
                {t.header.title}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {t.header.subtitle}
              </p>
            </div>
          </div>
          {/* Language Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            <button
              onClick={() => handleLocaleChange("zh")}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${
                locale === "zh"
                  ? "bg-green-500 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              中文
            </button>
            <button
              onClick={() => handleLocaleChange("en")}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${
                locale === "en"
                  ? "bg-green-500 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Form Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <CalculatorForm onCalculate={handleCalculate} />
        </section>

        {/* Loading Animation */}
        {isAnimating && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-green-200 border-t-green-500 animate-spin" />
            <p className="text-gray-400 text-sm font-medium">
              {locale === "zh" ? "正在计算中..." : "Calculating..."}
            </p>
          </div>
        )}

        {/* Result Section */}
        {result && !isAnimating && (
          <section
            id="result-section"
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
          >
            <ResultCard result={result} goal={lastGoal} onReset={handleReset} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          {t.footer.disclaimer}
        </p>
      </footer>
    </div>
  );
}
