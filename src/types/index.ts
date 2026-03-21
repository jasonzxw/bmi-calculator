export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
export type Goal = "lose" | "maintain" | "gain";
export type UnitSystem = "metric" | "imperial";

export interface FormData {
  gender: Gender;
  age: number;
  height: number; // always stored in cm
  weight: number; // always stored in kg
  activityLevel: ActivityLevel;
  goal: Goal;
  unitSystem: UnitSystem;
}

export interface CalcResult {
  bmi: number;
  bmiCategory: "underweight" | "normal" | "overweight" | "obese";
  idealWeightMin: number;
  idealWeightMax: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: number; // grams
    carbs: number;   // grams
    fat: number;     // grams
  };
}
