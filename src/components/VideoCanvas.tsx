import React, { useRef, useEffect, useState } from 'react';
import { Verse } from '../services/quranApi';

interface VideoCanvasProps {
  currentVerse: Verse | null;
  bgVideoUrl: string;
}

export const VideoCanvas: React.FC<VideoCanvasProps> = ({ currentVerse, bgVideoUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // 1. Draw Background Video
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } else {
        // Dark gradient placeholder
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Dark Overlay for Contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Render Quran Arabic Text
      if (currentVerse) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';

        // Arabic Verse
        ctx.font = 'bold 54px "Amiri", "Traditional Arabic", serif';
        ctx.fillText(currentVerse.text_uthmani, canvas.width / 2, canvas.height / 2 - 40);

        // English Translation Subtitle
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '32px sans-serif';
        ctx.fillText(currentVerse.translation, canvas.width / 2, canvas.height / 2 + 60);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentVerse]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Hidden background video source element */}
      <video
        ref={videoRef}
        src={bgVideoUrl}
        loop
        muted
        playsInline
        autoPlay
        className="hidden"
      />

      {/* 9:16 Aspect Ratio Canvas Display */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={1920}
        className="w-[360px] h-[640px] rounded-2xl shadow-2xl border border-slate-700"
      />
    </div>
  );
};
