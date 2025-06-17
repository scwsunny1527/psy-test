'use client';

import MobileFrame from '@/component/layout/MobileFrame';
import { usePsyStore } from '@/app/store/store';

export default function DisplayResultPage({ nextStep }) {
  const psyState = usePsyStore(state => state);
  const { explorer, chill, foodie, culture } = psyState.scoreDetail;
  const total = explorer + chill + foodie + culture || 1;
  const percent = (v) => Math.round((v / total) * 100);

  const traits = [
    { label: "冒險魂", value: explorer },
    { label: "悠閒感", value: chill },
    { label: "美食力", value: foodie },
    { label: "文化感", value: culture },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="text-xl font-bold mb-2 text-black">你的旅遊人格指數</div>
        <div className="w-full flex flex-col gap-3">
          {traits.map(trait => (
            <div key={trait.label} className="flex items-center gap-2">
              <span className="font-semibold text-black">{trait.label}：</span>
              <span className="font-bold text-[#3b9edb]">{percent(trait.value)}%</span>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-[#6ec1e4] border-4 border-black rounded-none text-black font-bold py-4 shadow-[4px_4px_0px_#222] hover:bg-[#3b9edb] hover:shadow-[8px_8px_0px_#222] hover:-translate-y-1 hover:scale-105 transition"
          onClick={nextStep}
        >
          查看專屬你的旅遊國家
        </button>
      </div>
    </MobileFrame>
  );
}
