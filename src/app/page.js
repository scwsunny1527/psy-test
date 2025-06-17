'use client';

import StartPage from '@/component/page/StartPage';
import QuestionPage from '@/component/page/QuestionPage';
import DisplayResultPage from '@/component/page/DisplayResultPage';
import ResultPage from '@/component/page/ResultPage';
import { useState, useRef, useEffect, createContext } from 'react';
import { usePsyStore } from '@/app/store/store';
import FloatingWidget from '@/component/FloatingWidget';

// 全域 context，讓子元件能用 playButtonSound
export const ButtonSoundContext = createContext(() => {});

function MusicButton({ isPlaying, toggleMusic }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '4px solid #000',
        boxShadow: '2px 2px 0 #222',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
      }}
      onClick={toggleMusic}
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
    >
      <img
        src={isPlaying ? '/31.webp' : '/32.webp'}
        alt={isPlaying ? '音樂播放中' : '音樂暫停'}
        style={{
          width: 42,
          height: 42,
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function Croissant() {
  const psyState = usePsyStore((state) => state);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // 背景音樂
  const buttonAudioRef = useRef(null); // 按鈕音效

  // 一進頁面就嘗試自動播放背景音樂
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
    // 初始化按鈕音效
    buttonAudioRef.current = new window.Audio('/botton.mp3');
    buttonAudioRef.current.volume = 0.8;
  }, []);

  // 切換背景音樂播放/暫停
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // 用戶互動時啟動音樂
  const playMusicOnStart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play();
      setIsPlaying(true);
    }
    nextStep();
  };

  // 全域播放按鈕音效
  const playButtonSound = () => {
    if (buttonAudioRef.current) {
      buttonAudioRef.current.currentTime = 0;
      buttonAudioRef.current.play();
    } else {
      // fallback
      const audio = new window.Audio('/botton.mp3');
      audio.volume = 0.8;
      audio.play();
    }
  };

  const nextStep = () => {
    if (psyState.state >= 3) return;
    if (psyState.state == 1) {
      if (psyState.questionState < psyState.totalQuestions - 1) {
        psyState.updateQuestionState(psyState.questionState + 1);
      } else {
        psyState.updateState(psyState.state + 1);
      }
    } else {
      psyState.updateState(psyState.state + 1);
    }
  };

  const prevStep = () => {
    if (psyState.state <= 0) return;
    psyState.updateState(psyState.state - 1);
  };

  return (
    <>
      {/* 隱藏背景音樂 */}
      <audio
        ref={audioRef}
        id="bg-music"
        src="/bg.mp3"
        loop
        style={{ display: 'none' }}
      />

      {/* 左上角 flex 容器：小視窗＋音樂控制鈕 並排 */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20, // 調整兩圓圈間距
          zIndex: 3000,
        }}
      >
        <FloatingWidget />
        <MusicButton isPlaying={isPlaying} toggleMusic={toggleMusic} />
      </div>

      {/* 提供 playButtonSound 給所有子元件 */}
      <ButtonSoundContext.Provider value={playButtonSound}>
        <div
          className="w-screen h-screen flex justify-center items-center"
          style={{
            backgroundImage: "url('/bgg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {psyState.state == 0 && (
            <StartPage nextStep={playMusicOnStart} />
          )}
          {psyState.state == 1 && (
            <QuestionPage nextStep={nextStep} questionIndex={psyState.questionState} />
          )}
          {psyState.state == 2 && (
            <DisplayResultPage nextStep={nextStep} />
          )}
          {psyState.state == 3 && <ResultPage />}
        </div>
      </ButtonSoundContext.Provider>
    </>
  );
}
