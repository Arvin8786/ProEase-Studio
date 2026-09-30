// Fetch Arabic text and English translation for a specific Surah
export async function getSurahVerses(surahNumber) {
  const [arabicRes, transRes] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahNumber}`),
    fetch(`https://api.quran.com/api/v4/quran/translations/131?chapter_number=${surahNumber}`) // 131 = Sahih International
  ]);

  const arabicData = await arabicRes.json();
  const transData = await transRes.json();

  return arabicData.verses.map((v, index) => ({
    id: v.id,
    verse_key: v.verse_key,
    text_uthmani: v.text_uthmani,
    translation: transData.translations[index]?.text.replace(/<[^>]+>/g, '') || '',
    audio_url: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${v.id}.mp3`
  }));
}
