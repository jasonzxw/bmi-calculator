import type { FormData, CalcResult, ActivityLevel } from "@/types";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

export function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(
  bmi: number
): "underweight" | "normal" | "overweight" | "obese" {
  if (bmi < 18.5) return "underweight";
  if (bmi < 24.0) return "normal";
  if (bmi < 28.0) return "overweight";
  return "obese";
}

// Mifflin-St Jeor equation
export function calcBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

export function calcTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

export function calcTargetCalories(
  tdee: number,
  goal: "lose" | "maintain" | "gain"
): number {
  if (goal === "lose") return Math.max(1200, tdee - 500);
  if (goal === "gain") return tdee + 300;
  return tdee;
}

export function calcMacros(
  targetCalories: number,
  weightKg: number,
  goal: "lose" | "maintain" | "gain"
): { protein: number; carbs: number; fat: number } {
  // protein: 2g/kg for lose/gain, 1.6g/kg for maintain
  const proteinG =
    goal === "maintain"
      ? Math.round(weightKg * 1.6)
      : Math.round(weightKg * 2.0);
  const proteinKcal = proteinG * 4;

  // fat: 25% of total calories
  const fatKcal = targetCalories * 0.25;
  const fatG = Math.round(fatKcal / 9);

  // carbs: remaining calories
  const carbsKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
  const carbsG = Math.round(carbsKcal / 4);

  return { protein: proteinG, carbs: carbsG, fat: fatG };
}

export function calcIdealWeight(
  heightCm: number
): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: Math.round(18.5 * heightM * heightM),
    max: Math.round(23.9 * heightM * heightM),
  };
}

export function calculate(data: FormData): CalcResult {
  const bmi = calcBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const idealWeight = calcIdealWeight(data.height);
  const bmr = calcBMR(data.weight, data.height, data.age, data.gender);
  const tdee = calcTDEE(bmr, data.activityLevel);
  const targetCalories = calcTargetCalories(tdee, data.goal);
  const macros = calcMacros(targetCalories, data.weight, data.goal);

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    idealWeightMin: idealWeight.min,
    idealWeightMax: idealWeight.max,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    macros,
  };
}

// Unit converters
export function ftInToCm(feet: number, inches: number): number {
  return Math.round((feet * 30.48 + inches * 2.54) * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round((lb * 0.453592) * 10) / 10;
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}
