'use client';
import { useState } from 'react';

function HamburgerIcon() {
  // 三條線的漢堡選單 SVG
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="6" y="9" width="20" height="3" rx="1.5" fill="#222" />
      <rect x="6" y="15" width="20" height="3" rx="1.5" fill="#222" />
      <rect x="6" y="21" width="20" height="3" rx="1.5" fill="#222" />
    </svg>
  );
}

function CloseIcon() {
  // 叉叉 SVG
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="8" y="22" width="24" height="3" rx="1.5" fill="#222" transform="rotate(-45 8 22)" />
      <rect x="8" y="22" width="24" height="3" rx="1.5" fill="#222" transform="rotate(45 8 22)" />
    </svg>
  );
}

export default function FloatingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 小視窗開關圓形按鈕 */}
      <button
  onClick={() => setOpen(!open)}
  style={{
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#fff',
    border: '4px solid #000',
    boxShadow: '2px 2px 0 #222',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    zIndex: 2000,
    padding: 0,
    transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = '#e0f7fa';
    e.currentTarget.style.boxShadow = '8px 8px 0 #222';
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = '#fff';
    e.currentTarget.style.boxShadow = '4px 4px 0 #222';
    e.currentTarget.style.transform = 'scale(1)';
  }}
  aria-label={open ? '關閉視窗' : '開啟視窗'}
>
  {open ? 'Ｘ' : (
    // 三條線可用 SVG 或直接字元
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="6" y="9" width="20" height="3" rx="1.5" fill="#222" />
      <rect x="6" y="15" width="20" height="3" rx="1.5" fill="#222" />
      <rect x="6" y="21" width="20" height="3" rx="1.5" fill="#222" />
    </svg>
  )}
</button>

      {/* 小視窗內容（展開時固定左上角下方） */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 92,
            left: 24,
            width: 280,
            minHeight: 120,
            background: '#fff',
            border: '4px solid #000',
            boxShadow: '4px 4px 0 #222',
            borderRadius: 12,
            zIndex: 1999,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
            小撇步
          </div>
          <div>
            香港: 1-1-1-1-1 /
            釜山: 2-2-2-2-2
            東京: 3-3-2-2-2 /
            蒙古: 4-4-4-4-4
          </div>
        </div>
      )}
    </>
  );
}
