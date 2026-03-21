"use client";

import { useRef, useCallback } from "react";
import { useI18n } from "@/locales";
import { trackEvent } from "@/lib/analytics";
import type { CalcResult, Goal } from "@/types";

interface ResultCardProps {
  result: CalcResult;
  goal: Goal;
  onReset: () => void;
}

const BMI_CATEGORIES = ["underweight", "normal", "overweight", "obese"] as const;

const CATEGORY_COLORS = {
  underweight: { bar: "bg-blue-400", text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  normal: { bar: "bg-green-500", text: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  overweight: { bar: "bg-orange-400", text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  obese: { bar: "bg-red-500", text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

const CATEGORY_EMOJI = {
  underweight: "💧",
  normal: "✅",
  overweight: "⚠️",
  obese: "🚨",
};

// BMI scale: underweight < 18.5, normal 18.5-24, overweight 24-28, obese >= 28
// Map BMI 10-40 to 0-100%
function bmiToPercent(bmi: number): number {
  const min = 10;
  const max = 40;
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}

interface MacroBarProps {
  label: string;
  grams: number;
  calories: number;
  color: string;
  percentage: number;
}

function MacroBar({ label, grams, calories, color, percentage }: MacroBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {grams}g · {calories} kcal
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function ResultCard({ result, goal, onReset }: ResultCardProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);

  const colors = CATEGORY_COLORS[result.bmiCategory];
  const bmiPercent = bmiToPercent(result.bmi);

  const proteinKcal = result.macros.protein * 4;
  const carbsKcal = result.macros.carbs * 4;
  const fatKcal = result.macros.fat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        style: { borderRadius: "24px", padding: "4px" },
      });
      const link = document.createElement("a");
      link.download = "bmi-result.png";
      link.href = dataUrl;
      link.click();
      trackEvent("save_image", { bmi_category: result.bmiCategory });
    } catch (err) {
      console.error("Failed to save image", err);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="space-y-4 bg-white p-1 rounded-3xl">
        {/* Header */}
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-gray-800">{t.result.title}</h2>
        </div>

        {/* BMI Card */}
        <div className={`rounded-3xl border-2 ${colors.border} ${colors.bg} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-0.5">
                {t.result.bmiTitle}
              </p>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black ${colors.text}`}>
                  {result.bmi}
                </span>
                <span
                  className={`text-sm font-bold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                >
                  {CATEGORY_EMOJI[result.bmiCategory]}{" "}
                  {t.result.bmiCategories[result.bmiCategory]}
                </span>
              </div>
            </div>
          </div>

          {/* BMI Scale Bar */}
          <div className="space-y-2 mt-3">
            <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-300 via-green-400 via-orange-400 to-red-500">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-700 rounded-full shadow-md transition-all duration-1000"
                style={{ left: `calc(${bmiPercent}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              {BMI_CATEGORIES.map((c) => (
                <span
                  key={c}
                  className={c === result.bmiCategory ? `font-bold ${colors.text}` : ""}
                >
                  {t.result.bmiCategories[c]}
                </span>
              ))}
            </div>
          </div>

          {/* Ideal Weight */}
          <div className="mt-4 pt-4 border-t border-white/60">
            <p className="text-sm text-gray-500">
              {t.result.idealWeight}:{" "}
              <span className="font-bold text-gray-700">
                {result.idealWeightMin} ~ {result.idealWeightMax} kg
              </span>
            </p>
          </div>
        </div>

        {/* BMR + TDEE */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border-2 border-gray-100 bg-gray-50 p-4 text-center">
            <p className="text-xs font-semibold text-gray-400 mb-1">
              {t.result.bmrTitle}
            </p>
            <p className="text-3xl font-black text-gray-800">
              {result.bmr.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">kcal {t.result.perDay}</p>
            <p className="text-xs text-gray-400 mt-1">{t.result.bmrDesc}</p>
          </div>
          <div className="rounded-3xl border-2 border-indigo-100 bg-indigo-50 p-4 text-center">
            <p className="text-xs font-semibold text-indigo-400 mb-1">
              {t.result.tdeeTitle}
            </p>
            <p className="text-3xl font-black text-indigo-700">
              {result.tdee.toLocaleString()}
            </p>
            <p className="text-xs text-indigo-400 mt-0.5">kcal {t.result.perDay}</p>
            <p className="text-xs text-indigo-400 mt-1">{t.result.tdeeDesc}</p>
          </div>
        </div>

        {/* Target Calories */}
        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white text-center shadow-lg shadow-green-200">
          <p className="text-sm font-semibold text-green-100 mb-1">
            🎯 {t.result.targetTitle}
          </p>
          <p className="text-5xl font-black mb-1">
            {result.targetCalories.toLocaleString()}
          </p>
          <p className="text-sm text-green-100">kcal {t.result.perDay}</p>
          <p className="text-xs text-green-200 mt-2">
            {t.result.targetDesc[goal]}
          </p>
        </div>

        {/* Macros */}
        <div className="rounded-3xl border-2 border-gray-100 bg-white p-5 space-y-4">
          <p className="text-sm font-bold text-gray-700">{t.result.macroTitle}</p>
          <MacroBar
            label={t.result.protein}
            grams={result.macros.protein}
            calories={proteinKcal}
            color="bg-blue-500"
            percentage={totalMacroKcal > 0 ? (proteinKcal / totalMacroKcal) * 100 : 0}
          />
          <MacroBar
            label={t.result.carbs}
            grams={result.macros.carbs}
            calories={carbsKcal}
            color="bg-amber-400"
            percentage={totalMacroKcal > 0 ? (carbsKcal / totalMacroKcal) * 100 : 0}
          />
          <MacroBar
            label={t.result.fat}
            grams={result.macros.fat}
            calories={fatKcal}
            color="bg-rose-400"
            percentage={totalMacroKcal > 0 ? (fatKcal / totalMacroKcal) * 100 : 0}
          />
        </div>

        {/* Health Tip */}
        <div className={`rounded-3xl border-2 ${colors.border} ${colors.bg} p-4`}>
          <p className={`text-sm font-bold ${colors.text} mb-1.5`}>
            💡 {t.result.healthTip}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.result.tips[result.bmiCategory]}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSaveImage}
          className="flex-1 py-3.5 rounded-2xl border-2 border-green-200 bg-green-50 text-green-700 font-semibold text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
        >
          📷 {t.result.saveImage}
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          🔄 {t.result.recalculate}
        </button>
      </div>
    </div>
  );
}
