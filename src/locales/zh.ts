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
  faq: {
    title: "常见问题",
    subtitle: "关于 BMI 和卡路里计算的科学解答",
    items: [
      {
        q: "BMI 多少算正常？",
        a: "根据中国成人标准，BMI 在 18.5 ~ 23.9 之间为正常范围；低于 18.5 为偏轻；24.0 ~ 27.9 为超重；28.0 及以上为肥胖。注意 BMI 是群体性统计指标，不能单独判断个人健康状况。",
      },
      {
        q: "BMR 和 TDEE 有什么区别？",
        a: "BMR（基础代谢率）是你在完全静止状态下维持生命所需的最低热量，相当于整天躺着不动的消耗。TDEE（每日总消耗）是在 BMR 基础上叠加日常活动、运动等所有热量消耗的总和，是制定饮食计划的关键数字。",
      },
      {
        q: "每天少吃多少卡路里可以减肥？",
        a: "一般建议每天制造 300 ~ 500 kcal 的热量赤字。1 公斤脂肪约含 7700 kcal 热量，每天少吃 500 kcal，理论上一周可减约 0.45 kg。不建议每天赤字超过 1000 kcal，过度节食会导致肌肉流失和代谢下降。",
      },
      {
        q: "BMI 正常但肚子有赘肉，是正常的吗？",
        a: "这种情况叫做「隐性肥胖」或「体重正常性肥胖（TOFI）」。BMI 只反映体重与身高的比例，无法区分脂肪和肌肉。腹部脂肪（内脏脂肪）过多对心血管健康的危害甚至比 BMI 超标更大，建议结合腰围、体脂率综合判断。",
      },
      {
        q: "增肌期间需要吃多少蛋白质？",
        a: "增肌期建议每公斤体重摄入 1.6 ~ 2.2 g 蛋白质。例如体重 70 kg，每天应摄入 112 ~ 154 g 蛋白质。优质蛋白来源包括：鸡胸肉、鸡蛋、牛肉、豆腐、希腊酸奶等。蛋白质充足是增肌的必要条件，缺乏蛋白质即使训练努力也难以增肌。",
      },
      {
        q: "计算出的热量只是参考，实际效果为什么和预期不同？",
        a: "TDEE 公式基于统计平均值，每个人的实际代谢率存在 ±15% 的个体差异。此外，食物标签上的热量本身也有误差。建议按计算结果执行 2-3 周，根据实际体重变化再微调摄入量，而不是一次性大幅增减。",
      },
    ],
  },
};

export default zh;
