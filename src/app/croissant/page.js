'use client';

import StartPage from '@/component/page/StartPage';
import QuestionPage from '@/component/page/QuestionPage';
import DisplayResultPage from '@/component/page/DisplayResultPage';
import ResultPage from '@/component/page/ResultPage';
import { useState, useRef } from 'react';
import { usePsyStore } from '@/app/store/store';

export default function Croissant() {
  const psyState = usePsyStore((state) => state);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 切換音樂播放/暫停
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

  // 保持原本 nextStep 功能
  const nextStep = function () {
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

  const prevStep = function () {
    if (psyState.state <= 0) return;
    psyState.updateState(psyState.state - 1);
  };

  return (
    <>
      {/* 隱藏 audio 標籤 */}
      <audio
        ref={audioRef}
        id="bg-music"
        src="/bg.mp3"
        loop
        style={{ display: 'none' }}
      />

      {/* 音樂控制 icon，固定右上角 */}
      <div
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1000,
          cursor: 'pointer',
        }}
        onClick={toggleMusic}
      >
        <img
          src={isPlaying ? '/31.webp' : '/32.webp'}
          alt={isPlaying ? '音樂播放中' : '音樂暫停'}
          width={40}
          height={40}
        />
      </div>

      <div
        className="w-screen h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url('/bgg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
    </>
  );
}
