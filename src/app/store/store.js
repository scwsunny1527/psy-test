import { create } from 'zustand'

// 狀態管理
const usePsyStore = create((set) => ({
  state: 0, //0:start, 1:question, 2:displayResult, 3: result
  questionState: 0,
  totalQuestions: 5,
  scoreDetail: { explorer: 0, chill: 0, foodie: 0, culture: 0 },
  updateState: (newState) => set((state) => ({ state: newState })),
  updateQuestionState: (newState) => set((state) => ({ questionState: newState })),
  updateTotalQuestions: (newState) => set((state) => ({ totalQuestions: newState })),
  updateScoreDetail: (addValue) => set((state) => {
    const newDetail = { ...state.scoreDetail };
    Object.keys(addValue).forEach(key => {
      newDetail[key] = (newDetail[key] || 0) + addValue[key];
    });
    return { scoreDetail: newDetail };
  }),
  resetScoreDetail: () => set(() => ({
    scoreDetail: { explorer: 0, chill: 0, foodie: 0, culture: 0 }
  }))
}));

// 題庫（不出現城市名）
const useQuestionStore = create((set) => ({
  questions: {
    "1": {
      title: "你最嚮往的旅遊畫面？",
      options: [
        { title: "在熱鬧的街頭尋找新奇小吃", value: { foodie: 2, explorer: 1, culture: 1, chill: 0 } },
        { title: "海邊放空，感受微風和浪聲", value: { chill: 2, explorer: 1, foodie: 0, culture: 1 } },
        { title: "走進巷弄，發現隱藏的咖啡館", value: { culture: 2, foodie: 1, explorer: 1, chill: 0 } },
        { title: "參加戶外體驗活動，享受刺激", value: { explorer: 2, chill: 0, foodie: 1, culture: 1 } }
      ]
    },
    "2": {
      title: "你最想體驗哪種旅遊方式？",
      options: [
        { title: "夜晚燈火下的熱鬧市集", value: { culture: 2, foodie: 1, explorer: 1, chill: 0 } },
        { title: "遼闊草原，呼吸新鮮空氣", value: { chill: 2, explorer: 1, foodie: 0, culture: 1 } },
        { title: "時尚步行街，感受潮流脈動", value: { explorer: 2, culture: 1, foodie: 1, chill: 0 } },
        { title: "海岸邊的悠閒午后", value: { chill: 2, foodie: 1, explorer: 0, culture: 1 } }
      ]
    },
    "3": {
      title: "若只能帶一樣東西出門，你會帶？",
      options: [
        { title: "相機，記錄每個瞬間", value: { explorer: 1, culture: 2, foodie: 1, chill: 0 } },
        { title: "野餐墊，隨時找個地方躺著休息", value: { chill: 2, foodie: 1, explorer: 0, culture: 1 } },
        { title: "美食指南，絕不錯過任何美味", value: { foodie: 2, explorer: 1, chill: 1, culture: 0 } },
        { title: "地圖，準備隨時展開冒險", value: { explorer: 2, chill: 1, foodie: 0, culture: 1 } }
      ]
    },
    "4": {
      title: "你最在意旅途中哪種感受？",
      options: [
        { title: "品嚐在地特色食物", value: { foodie: 2, explorer: 1, culture: 1, chill: 0 } },
        { title: "體驗當地人的生活步調", value: { culture: 2, chill: 1, explorer: 1, foodie: 0 } },
        { title: "享受自然帶來的寧靜", value: { chill: 2, explorer: 1, foodie: 0, culture: 1 } },
        { title: "挑戰新鮮刺激的活動", value: { explorer: 2, foodie: 1, chill: 0, culture: 1 } }
      ]
    },
    "5": {
      title: "旅程結束時你希望留下什麼回憶？",
      options: [
        { title: "一張張美食照和飽足的味蕾", value: { foodie: 2, explorer: 1, chill: 0, culture: 1 } },
        { title: "朋友間的歡笑和悠閒時光", value: { chill: 2, culture: 1, explorer: 1, foodie: 0 } },
        { title: "獨特的文化體驗和故事", value: { culture: 2, explorer: 1, foodie: 1, chill: 0 } },
        { title: "突破自我的冒險挑戰", value: { explorer: 2, chill: 0, foodie: 1, culture: 1 } }
      ]
    }
  }
}));

export { usePsyStore, useQuestionStore };
