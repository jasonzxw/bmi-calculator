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
  feedback: {
    title: "Feedback",
    subtitle: "Your suggestions help us improve",
    emailLabel: "Your email",
    emailPlaceholder: "So we can reply to you (optional)",
    messageLabel: "Your feedback",
    messagePlaceholder: "Any issues, suggestions, or ideas? We'd love to hear from you.",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    successTitle: "Thank you for your feedback!",
    successDesc: "We've received your message and will read it carefully.",
    errorTitle: "Submission failed, please try again later",
    errors: {
      messageRequired: "Please enter your feedback",
      messageTooShort: "Feedback must be at least 10 characters",
      emailInvalid: "Please enter a valid email address",
    },
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Science-based answers about BMI and calorie calculation",
    items: [
      {
        q: "What is a healthy BMI range?",
        a: "For most adults, a BMI between 18.5 and 24.9 is considered normal. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese. Keep in mind BMI is a population-level statistical tool and doesn't account for muscle mass or body composition.",
      },
      {
        q: "What is the difference between BMR and TDEE?",
        a: "BMR (Basal Metabolic Rate) is the minimum number of calories your body needs to sustain basic functions while completely at rest — essentially if you stayed in bed all day. TDEE (Total Daily Energy Expenditure) adds your physical activity on top of BMR, giving you the total calories burned in a typical day. TDEE is the key number for planning your diet.",
      },
      {
        q: "How many calories should I cut to lose weight?",
        a: "A daily deficit of 300–500 kcal is generally recommended. Since 1 kg of fat contains roughly 7,700 kcal, a 500 kcal daily deficit can lead to about 0.45 kg of weight loss per week. Avoid deficits larger than 1,000 kcal/day as this can cause muscle loss and metabolic slowdown.",
      },
      {
        q: "My BMI is normal but I have belly fat — is that okay?",
        a: "This is known as \"normal-weight obesity\" or TOFI (Thin Outside, Fat Inside). BMI can't distinguish fat from muscle, so abdominal (visceral) fat can be high even at a normal BMI. Excess visceral fat is linked to increased cardiovascular risk. Consider tracking waist circumference and body fat percentage for a fuller picture.",
      },
      {
        q: "How much protein do I need to build muscle?",
        a: "For muscle gain, aim for 1.6–2.2 g of protein per kg of body weight per day. For a 70 kg person, that's roughly 112–154 g of protein daily. Good sources include chicken breast, eggs, beef, tofu, and Greek yogurt. Sufficient protein intake is essential — even with hard training, muscle growth is limited without enough protein.",
      },
      {
        q: "Why does my actual weight change differ from the calculated prediction?",
        a: "TDEE formulas are based on population averages, and individual metabolic rates can vary by ±15%. Food labels also carry inherent calorie measurement errors. The best approach is to follow the calculated targets for 2–3 weeks, then adjust your intake based on actual weight changes rather than making large adjustments upfront.",
      },
    ],
  },
};

export default en;
