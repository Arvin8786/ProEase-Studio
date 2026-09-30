// src/utils/exportVideo.ts

export function recordCanvasToWebM(
  canvas: HTMLCanvasElement,
  audioElement: HTMLAudioElement,
  durationMs: number,
  onFinish: (blobUrl: string) => void
) {
  const stream = canvas.captureStream(60); // 60 FPS
  
  // Combine canvas video stream with audio track
  if ((audioElement as any).captureStream) {
    const audioStream = (audioElement as any).captureStream();
    audioStream.getAudioTracks().forEach((track: MediaStreamTrack) => stream.addTrack(track));
  }

  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    onFinish(url);
  };

  recorder.start();
  setTimeout(() => recorder.stop(), durationMs);
}
