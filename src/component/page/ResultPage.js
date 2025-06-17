'use client';

import MobileFrame from '@/component/layout/MobileFrame';
import { usePsyStore } from '@/app/store/store';

export default function ResultPage() {
  const psyState = usePsyStore(state => state);
  const { explorer, chill, foodie, culture } = psyState.scoreDetail;

  let country = '';
  let desc = '';

  if (explorer >= chill && explorer >= foodie && explorer >= culture) {
    country = '蒙古';
    desc = '你最適合前往蒙古，奔馳草原、擁抱壯闊大自然與冒險。';
  } else if (chill >= explorer && chill >= foodie && chill >= culture) {
    country = '釜山';
    desc = '你最適合前往釜山，享受海邊療癒、放鬆悠閒假期。';
  } else if (foodie >= explorer && foodie >= chill && foodie >= culture) {
    country = '香港';
    desc = '你最適合前往香港，品嚐世界美食、感受城市活力。';
  } else if (culture >= explorer && culture >= chill && culture >= foodie) {
    country = '東京';
    desc = '你最適合前往東京，深入文化巷弄、體驗多元風情。';
  }

  const playAgain = () => window.location.reload();

  return (
    <MobileFrame>
      <div className="flex flex-col items-center gap-8">
        <div className="text-xl font-bold text-black text-center">你最適合旅遊的國家是</div>
        <div className="text-4xl font-extrabold text-[#3b9edb] text-center">{country}</div>
        <div className="text-lg text-black text-center">{desc}</div>
        <button
          onClick={playAgain}
          className="w-full bg-[#6ec1e4] border-4 border-black rounded-none text-black font-bold py-4 shadow-[4px_4px_0px_#222] hover:bg-[#3b9edb] hover:shadow-[8px_8px_0px_#222] hover:-translate-y-1 hover:scale-105 transition"
        >
          再玩一次
        </button>
      </div>
    </MobileFrame>
  );
}
