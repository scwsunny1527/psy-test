'use client';


export default function StartPage({ nextStep }) {
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      {/* 標題與說明有像素框，內容置中 */}
      <div className="border-4 border-black bg-white px-6 py-6 rounded-none shadow-[4px_4px_0px_#222] mb-8 w-full max-w-[420px] flex flex-col items-center text-center">
        <div className="text-3xl font-extrabold text-black mb-2">
          旅遊心理測驗
        </div>
        <div className="text-black font-medium text-base leading-relaxed">
          五個問題，帶你找到最適合你的旅遊國家！
        </div>
      </div>
      {/* 按鈕不在框內，置中 */}
      <button
        onClick={nextStep}
        className="w-[180px] bg-[#6ec1e4] border-4 border-black rounded-none text-black font-bold py-4 shadow-[4px_4px_0px_#222] hover:bg-[#3b9edb] hover:shadow-[8px_8px_0px_#222] hover:-translate-y-1 hover:scale-105 transition text-center"
      >
        開始測驗
      </button>
    </div>
  );
}
