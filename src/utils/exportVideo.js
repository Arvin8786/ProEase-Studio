export function recordCanvasToWebM(canvas, audioElement, durationMs, onFinish) {
  const stream = canvas.captureStream(60); // 60 FPS
  
  // Attach audio track if available
  if (audioElement && audioElement.captureStream) {
    const audioStream = audioElement.captureStream();
    audioStream.getAudioTracks().forEach((track) => stream.addTrack(track));
  }

  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    onFinish(url);
  };

  recorder.start();
  setTimeout(() => recorder.stop(), durationMs);
}
