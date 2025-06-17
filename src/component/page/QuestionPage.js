'use client';

import MobileFrame from '@/component/layout/MobileFrame';
import { usePsyStore, useQuestionStore } from '@/app/store/store';

export default function QuestionPage({ questionIndex, nextStep }) {
  const questionData = useQuestionStore(state => state);
  const psyData = usePsyStore(state => state);

  // 先加分再跳下一頁
  const clickAnswer = (option) => {
    psyData.updateScoreDetail(option.value);
    nextStep();
  };

  // 統一像素主色（亮藍）
  const optionClass = `
    w-full bg-[#6ec1e4] border-4 border-black rounded-none
    text-black text-base font-bold
    py-4 px-2
    shadow-[4px_4px_0px_#222]
    mb-4
    transition
    cursor-pointer
    hover:bg-[#3b9edb]
    hover:shadow-[8px_8px_0px_#222]
    hover:-translate-y-1 hover:scale-105
    active:scale-95
    focus:outline-none
  `;

  return (
    <MobileFrame>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="w-12 h-12 flex justify-center items-center font-bold text-lg text-black border-4 border-black bg-[#ffe066] rounded-none shadow-[2px_2px_0_#222] mb-2">
          Q{questionIndex + 1}
        </div>
        <div className="text-center font-bold text-xl text-black mb-6">
          {questionData.questions[(questionIndex+1).toString()].title}
        </div>
        <div className="flex flex-col gap-2 w-full">
          {questionData.questions[(questionIndex+1).toString()].options.map((option, index) => (
            <button
              className={optionClass}
              onClick={() => clickAnswer(option)}
              key={option.title + index}
            >
              {option.title}
            </button>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
