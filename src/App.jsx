import React, { useState } from 'react';

export default function App() {
  const [verse] = useState({
    verse_key: '1:1',
    text_uthmani: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Quranic Reflections Studio
      </h1>

      {/* 9:16 Shorts Preview Frame */}
      <div style={{
        width: '300px',
        height: '533px',
        borderRadius: '16px',
        border: '1px solid #334155',
        background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Top Header Badge */}
        <div style={{
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          alignSelf: 'center',
          color: '#38bdf8'
        }}>
          Surah Al-Fatihah : 1
        </div>

        {/* Center Scripture Display */}
        <div>
          <p style={{
            fontSize: '28px',
            lineHeight: '1.8',
            marginBottom: '16px',
            fontFamily: 'serif'
          }}>
            {verse.text_uthmani}
          </p>
          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.4' }}>
            {verse.translation}
          </p>
        </div>

        {/* Bottom Tag */}
        <div style={{
          fontSize: '12px',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          Reflection: Beginning with Allah's mercy
        </div>
      </div>
    </div>
  );
}
