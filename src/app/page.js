'use client';

import StartPage from '@/component/page/StartPage';
import QuestionPage from '@/component/page/QuestionPage';
import DisplayResultPage from '@/component/page/DisplayResultPage';
import ResultPage from '@/component/page/ResultPage';
import { useState, useRef, useEffect, createContext } from 'react';
import { usePsyStore } from '@/app/store/store';

// 建立一個 context 讓子元件能用 playButtonSound
export const ButtonSoundContext = createContext(() => {});

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

      {/* 左上角像素風格音樂控制圓圈 */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#fff', // 白色底
          border: '4px solid #000', // 黑色線條
          boxShadow: '2px 2px 0 #222',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={toggleMusic}
      >
        <img
          src={isPlaying ? '/31.webp' : '/32.webp'}
          alt={isPlaying ? '音樂播放中' : '音樂暫停'}
          style={{
            width: 42,
            height: 42,
            imageRendering: 'pixelated', // 像素風格
          }}
        />
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
