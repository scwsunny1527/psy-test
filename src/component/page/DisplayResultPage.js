'use client';

import MobileFrame from '@/component/layout/MobileFrame';
import Image from 'next/image';
import { usePsyStore } from '@/app/store/store';

export default function DisplayResultPage({ nextStep }) {
  // 這裡請改成你的四個指標分數（用 store 取得）
  // 這裡用預設值，請用你的 scoreDetail 結構
  const { explorer = 1, chill = 1, foodie = 1, culture = 1 } = usePsyStore(state => state.scoreDetail || {});

  const total = explorer + chill + foodie + culture || 1;
  const percent = (v) => Math.round((v / total) * 100);

  const traits = [
    { label: "冒險魂", value: explorer, img: "/11.webp" },
    { label: "悠閒感", value: chill, img: "/12.webp" },
    { label: "文化感", value: culture, img: "/14.webp" },
    { label: "美食力", value: foodie, img: "/13.webp" },

  ];

  return (
    <MobileFrame>
      <div className="flex flex-col items-center w-full">
        <div className="text-xl font-bold text-[#000000] mb-6">你的旅遊人格指數</div>
        {/* 2x2 方格排列，間距2px */}
        <div
          className="grid grid-cols-2 grid-rows-2 gap-[20px] w-full max-w-[260px] mb-28"
          style={{ margin: '0 auto' }}
        >
          {traits.map((trait) => (
            <div
              key={trait.label}
              className="flex flex-col items-center group relative"
              style={{ minWidth: 0 }}
            >
              {/* 圖片區（hover放大+灰色覆蓋+大字百分比） */}
              <div className="relative w-[110px] h-[110px] mb-1 transition-transform duration-200 group-hover:scale-110">
                <Image
                  src={trait.img}
                  alt={trait.label}
                  fill
                  className="rounded object-cover"
                  style={{ transition: 'transform 0.2s' }}
                  sizes="110px"
                />
                {/* 灰色覆蓋與大字百分比 */}
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
                  <span className="text-white text-3xl font-extrabold drop-shadow-lg">{percent(trait.value)}%</span>
                </div>
              </div>
              {/* 指標名稱與百分比同一行 */}
              <div className="flex flex-row items-center gap-2 text-base font-bold text-[#1098EC]">
                <span>{trait.label}</span>
                <span className="text-black text-base font-extrabold">{percent(trait.value)}%</span>
              </div>
            </div>
          ))}
        </div>
        {/* 按鈕下移，空出空間 */}
        <button
          className="w-full mt-8 bg-[#6ec1e4] border-4 border-black rounded-none text-black font-bold py-4 shadow-[4px_4px_0px_#222] hover:bg-[#3b9edb] hover:shadow-[8px_8px_0px_#222] hover:-translate-y-1 hover:scale-105 transition"
          onClick={nextStep}
        >
          查看適合你的旅遊城市
        </button>
      </div>
    </MobileFrame>
  );
}
