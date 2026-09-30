import React, { useRef, useEffect } from 'react';

export function VideoCanvas({ currentVerse, bgVideoUrl }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      // 1. Draw Background Video or Fallback Gradient
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Dark Overlay for Text Readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Render Quran Arabic Text & English Subtitle
      if (currentVerse) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';

        // Arabic Verse Text
        ctx.font = 'bold 50px serif';
        ctx.fillText(currentVerse.text_uthmani, canvas.width / 2, canvas.height / 2 - 40);

        // English Translation
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '28px sans-serif';
        ctx.fillText(currentVerse.translation, canvas.width / 2, canvas.height / 2 + 60);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentVerse]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Hidden HTML5 video player supplying background frames */}
      <video
        ref={videoRef}
        src={bgVideoUrl}
        loop
        muted
        playsInline
        autoPlay
        className="hidden"
      />

      {/* 9:16 Vertical Video Canvas */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={1920}
        className="w-[320px] h-[568px] rounded-2xl shadow-2xl border border-slate-700"
      />
    </div>
  );
}
