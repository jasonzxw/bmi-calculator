"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import type { FormData, Gender, ActivityLevel, Goal, UnitSystem } from "@/types";
import { ftInToCm, lbToKg } from "@/lib/calc";

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
}

const ACTIVITY_ICONS: Record<ActivityLevel, string> = {
  sedentary: "🪑",
  light: "🚶",
  moderate: "🏃",
  active: "💪",
};

const GOAL_ICONS: Record<Goal, string> = {
  lose: "🔥",
  maintain: "⚖️",
  gain: "💪",
};

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const { t } = useI18n();

  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("sedentary");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): boolean => {
    const errs: string[] = [];
    const ageNum = Number(age);
    if (!age || !weight || (unitSystem === "metric" ? !heightCm : !heightFt)) {
      errs.push(t.form.errors.required);
    } else {
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120)
        errs.push(t.form.errors.ageRange);
      const weightNum = Number(weight);
      if (isNaN(weightNum) || weightNum < 20 || weightNum > 600)
        errs.push(t.form.errors.weightRange);
      if (unitSystem === "metric") {
        const hNum = Number(heightCm);
        if (isNaN(hNum) || hNum < 50 || hNum > 300)
          errs.push(t.form.errors.heightRange);
      } else {
        const ft = Number(heightFt);
        if (isNaN(ft) || ft < 1 || ft > 9)
          errs.push(t.form.errors.heightRange);
      }
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalHeightCm =
      unitSystem === "metric"
        ? Number(heightCm)
        : ftInToCm(Number(heightFt), Number(heightIn) || 0);
    const finalWeightKg =
      unitSystem === "metric" ? Number(weight) : lbToKg(Number(weight));

    onCalculate({
      gender,
      age: Number(age),
      height: finalHeightCm,
      weight: finalWeightKg,
      activityLevel,
      goal,
      unitSystem,
    });
  };

  const activities: ActivityLevel[] = ["sedentary", "light", "moderate", "active"];
  const goals: Goal[] = ["lose", "maintain", "gain"];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Unit System Toggle */}
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-gray-500">{t.form.unit}:</span>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {(["metric", "imperial"] as UnitSystem[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnitSystem(u)}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${
                unitSystem === u
                  ? "bg-green-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {u === "metric" ? t.form.metric : t.form.imperial}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.form.gender}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as Gender[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-semibold text-base transition-all ${
                gender === g
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <span className="text-xl">{g === "male" ? "♂" : "♀"}</span>
              <span>{g === "male" ? t.form.male : t.form.female}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Age / Height / Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.form.age}
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t.form.agePlaceholder}
              className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {t.form.ageUnit}
            </span>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.form.height}
          </label>
          {unitSystem === "metric" ? (
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder={t.form.heightPlaceholder}
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                cm
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="numeric"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder={t.form.heightFtPlaceholder}
                  className="w-full px-3 py-3 pr-8 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-300"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  ft
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="numeric"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder={t.form.heightInPlaceholder}
                  className="w-full px-3 py-3 pr-8 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-300"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  in
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.form.weight}
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={t.form.weightPlaceholder}
              className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {unitSystem === "metric" ? "kg" : "lb"}
            </span>
          </div>
        </div>
      </div>

      {/* Activity Level */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.form.activityLevel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activities.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setActivityLevel(a)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center ${
                activityLevel === a
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <span className="text-2xl">{ACTIVITY_ICONS[a]}</span>
              <span
                className={`text-sm font-semibold ${
                  activityLevel === a ? "text-green-700" : "text-gray-700"
                }`}
              >
                {t.form.activities[a].label}
              </span>
              <span className="text-xs text-gray-400 leading-tight">
                {t.form.activities[a].desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.form.goal}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all text-center ${
                goal === g
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <span className="text-2xl">{GOAL_ICONS[g]}</span>
              <span
                className={`text-sm font-semibold ${
                  goal === g ? "text-green-700" : "text-gray-700"
                }`}
              >
                {t.form.goals[g].label}
              </span>
              <span className="text-xs text-gray-400 leading-tight">
                {t.form.goals[g].desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {err}
            </p>
          ))}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-bold shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.01] active:scale-[0.99] transition-all"
      >
        {t.form.calculate} →
      </button>
    </form>
  );
}
