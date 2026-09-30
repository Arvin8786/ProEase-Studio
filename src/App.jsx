import React, { useState } from 'react';
import { VideoCanvas } from './components/VideoCanvas';

export default function App() {
  const [verse] = useState({
    id: 1,
    verse_key: '1:1',
    text_uthmani: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4">Quran Video Short Generator</h1>
      <VideoCanvas currentVerse={verse} bgVideoUrl="" />
    </div>
  );
}
