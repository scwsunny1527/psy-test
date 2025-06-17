'use client';

export default function MobileFrame({children}) {
  return (
    <div
      className="
        w-full max-w-[420px] min-h-[520px]
        bg-[#fff] border-4 border-[#222] rounded-none
        flex flex-col justify-center items-center
        p-8 md:p-12
        relative overflow-hidden
        shadow-[8px_8px_0px_#222]
        pixel-card
      "
      style={{
        imageRendering: 'pixelated',
        boxShadow: '8px 8px 0px #222',
      }}
    >
      {children}
    </div>
  );
}
