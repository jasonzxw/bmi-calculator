const en = {
  meta: {
    title: "BMI & Calorie Calculator - Health Weight Management Tool",
    description:
      "Free online BMI calculator with BMR and TDEE calculation. Create a science-based plan for weight loss or muscle gain.",
  },
  header: {
    title: "BMI & Calorie Calculator",
    subtitle: "Assess your weight, set your health goals",
  },
  form: {
    gender: "Gender",
    male: "Male",
    female: "Female",
    age: "Age",
    agePlaceholder: "Enter your age",
    ageUnit: "yrs",
    height: "Height",
    heightPlaceholder: "Enter height",
    weight: "Weight",
    weightPlaceholder: "Enter weight",
    unit: "Unit",
    metric: "Metric (cm/kg)",
    imperial: "Imperial (ft·in/lb)",
    heightFtPlaceholder: "Feet",
    heightInPlaceholder: "Inches",
    activityLevel: "Activity Level",
    activities: {
      sedentary: { label: "Sedentary", desc: "Little or no exercise" },
      light: { label: "Light", desc: "Exercise 1-3 days/week" },
      moderate: { label: "Moderate", desc: "Exercise 3-5 days/week" },
      active: { label: "Very Active", desc: "Hard exercise every day" },
    },
    goal: "Your Goal",
    goals: {
      lose: { label: "Lose Fat", desc: "Calorie deficit to burn fat" },
      maintain: { label: "Maintain", desc: "Keep current weight" },
      gain: { label: "Build Muscle", desc: "Calorie surplus for muscle" },
    },
    calculate: "Calculate Now",
    reset: "Recalculate",
    errors: {
      required: "Please fill in all required fields",
      ageRange: "Age must be between 1 and 120",
      heightRange: "Please enter a valid height",
      weightRange: "Please enter a valid weight",
    },
  },
  result: {
    title: "Your Health Report",
    bmiTitle: "BMI Index",
    bmiCategories: {
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
    idealWeight: "Ideal Weight Range",
    bmrTitle: "Basal Metabolic Rate (BMR)",
    bmrDesc: "Calories burned at complete rest",
    tdeeTitle: "Total Daily Energy Expenditure (TDEE)",
    tdeeDesc: "Calories burned with your activity level",
    targetTitle: "Daily Calorie Target",
    targetDesc: {
      lose: "Weight loss: ~500 kcal deficit",
      maintain: "Maintenance: matches your TDEE",
      gain: "Muscle gain: ~300 kcal surplus",
    },
    macroTitle: "Macro Nutrients Reference",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    kcal: "kcal",
    perDay: "/ day",
    saveImage: "Save Result Image",
    recalculate: "Recalculate",
    healthTip: "Health Tip",
    tips: {
      underweight:
        "You are underweight. Consider increasing your caloric intake and consult a doctor or nutritionist for a healthy weight gain plan.",
      normal:
        "Your weight is in the healthy range. Keep up your balanced diet and regular exercise!",
      overweight:
        "You are slightly overweight. A balanced diet and regular exercise can gradually bring you to a healthy range.",
      obese:
        "Your weight exceeds the healthy range. It's recommended to consult a doctor or nutritionist for a science-based weight loss plan.",
    },
  },
  footer: {
    disclaimer:
      "This tool is for reference only and does not replace professional medical advice. Please consult a doctor for health concerns.",
  },
  lang: "Language",
};

export default en;
