const zh = {
  meta: {
    title: "BMI & 卡路里计算器 - 健康体重管理工具",
    description:
      "免费在线 BMI 计算器，支持基础代谢率(BMR)和每日总消耗(TDEE)计算，帮助你制定科学减脂增肌计划。",
  },
  header: {
    title: "BMI & 卡路里计算器",
    subtitle: "科学评估体重，制定健康目标",
  },
  form: {
    gender: "性别",
    male: "男",
    female: "女",
    age: "年龄",
    agePlaceholder: "请输入年龄",
    ageUnit: "岁",
    height: "身高",
    heightPlaceholder: "请输入身高",
    weight: "体重",
    weightPlaceholder: "请输入体重",
    unit: "单位",
    metric: "公制 (cm/kg)",
    imperial: "英制 (ft·in/lb)",
    heightFtPlaceholder: "英尺",
    heightInPlaceholder: "英寸",
    activityLevel: "活动量",
    activities: {
      sedentary: { label: "久坐", desc: "几乎不运动，办公族" },
      light: { label: "轻度", desc: "每周运动 1-3 次" },
      moderate: { label: "中度", desc: "每周运动 3-5 次" },
      active: { label: "高强度", desc: "每天高强度运动" },
    },
    goal: "你的目标",
    goals: {
      lose: { label: "减脂", desc: "热量赤字，燃烧脂肪" },
      maintain: { label: "维持", desc: "保持现有体重" },
      gain: { label: "增肌", desc: "热量盈余，增长肌肉" },
    },
    calculate: "立即计算",
    reset: "重新计算",
    errors: {
      required: "请填写所有必填项",
      ageRange: "年龄请输入 1-120 之间的数值",
      heightRange: "身高请输入合理数值",
      weightRange: "体重请输入合理数值",
    },
  },
  result: {
    title: "你的健康报告",
    bmiTitle: "BMI 体质指数",
    bmiCategories: {
      underweight: "偏轻",
      normal: "正常",
      overweight: "超重",
      obese: "肥胖",
    },
    idealWeight: "理想体重范围",
    bmrTitle: "基础代谢率 (BMR)",
    bmrDesc: "静止状态下每日消耗热量",
    tdeeTitle: "每日总消耗 (TDEE)",
    tdeeDesc: "考虑活动量后的每日消耗",
    targetTitle: "建议每日摄入",
    targetDesc: {
      lose: "减脂模式：热量赤字约 500 kcal",
      maintain: "维持模式：与消耗持平",
      gain: "增肌模式：热量盈余约 300 kcal",
    },
    macroTitle: "三大营养素参考",
    protein: "蛋白质",
    carbs: "碳水化合物",
    fat: "脂肪",
    kcal: "千卡",
    perDay: "/ 天",
    saveImage: "保存结果图片",
    recalculate: "重新计算",
    healthTip: "健康提示",
    tips: {
      underweight:
        "您的体重偏轻，建议适当增加营养摄入，并咨询医生或营养师以制定合理的增重计划。",
      normal: "您的体重在健康范围内，继续保持均衡饮食和规律运动的好习惯！",
      overweight:
        "您的体重略微超重，建议通过合理饮食和适量运动逐步调整到健康范围。",
      obese:
        "您的体重已超出健康范围，建议尽快咨询医生或营养师，制定科学的减重方案。",
    },
  },
  footer: {
    disclaimer:
      "本工具仅供参考，不能替代专业医疗建议。如有健康问题，请咨询专业医生。",
  },
  lang: "语言",
};

export default zh;
