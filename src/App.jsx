import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Download, Sparkles, Video, 
  CheckCircle2, RefreshCw, Layers, Type, Search 
} from 'lucide-react';

// Insert your Pexels API key here or load via import.meta.env.VITE_PEXELS_API_KEY
const PEXELS_API_KEY = "6mKMhZrxXlna1oHIaFYheBlevUvQ3aPRXAvaqOmqGXbEj8s9PLmLnmX2";

export default function App() {
  const [videoMode, setVideoMode] = useState(null); // 'shorts' | 'recitation'
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('nature dark');
  const [loadingVideos, setLoadingVideos] = useState(false);
  
  // Customization state
  const [arabicText, setArabicText] = useState('فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ');
  const [translationText, setTranslationText] = useState('So which of the favors of your Lord would you deny?');
  const [surahInfo, setSurahInfo] = useState('Surah Ar-Rahman : 13');
  const [lifeLesson, setLifeLesson] = useState('Reflection: Never take everyday blessings for granted.');
  
  const [autoContrast, setAutoContrast] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Render & export gating
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExportComplete, setIsExportComplete] = useState(false);

  // Fetch videos from Pexels API based on selected video format
  const fetchPexelsVideos = async (query = 'nature') => {
    if (!PEXELS_API_KEY) return;
    setLoadingVideos(true);
    
    // Automatically filter orientation based on chosen mode: portrait (9:16) or landscape (16:9)
    const orientation = videoMode === 'shorts' ? 'portrait' : 'landscape';
    
    try {
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=9&orientation=${orientation}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      
      if (data.videos && data.videos.length > 0) {
        const formattedVideos = data.videos.map((vid) => {
          // Find HD or SD MP4 video link
          const videoFile = vid.video_files.find(f => f.quality === 'hd') || vid.video_files[0];
          return {
            id: vid.id,
            title: `Pexels Video ${vid.id}`,
            url: videoFile.link,
            thumbnail: vid.image,
            brightness: 'dark' // Default dark backdrop styling
          };
        });
        setVideoList(formattedVideos);
        setSelectedVideo(formattedVideos[0]);
      }
    } catch (error) {
      console.error('Error fetching Pexels videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  // Re-fetch videos when mode changes or user submits search
  useEffect(() => {
    if (videoMode) {
      fetchPexelsVideos(searchQuery);
    }
  }, [videoMode]);

  // Handle simulated video export pipeline
  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setIsExportComplete(false);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setIsExportComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. MANDATORY MODE SELECTION MODAL */}
      {!videoMode && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Select Video Format</h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">
              Choose your format to unlock tailor-made layout tools and background controls.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setVideoMode('shorts')}
                className="flex flex-col items-center p-6 bg-slate-800/50 hover:bg-emerald-950/30 border border-slate-700 hover:border-emerald-500/50 rounded-xl transition-all group"
              >
                <div className="w-12 h-16 border-2 border-emerald-400/60 group-hover:border-emerald-400 rounded-md flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="text-xs font-semibold text-emerald-400">9:16</span>
                </div>
                <h3 className="font-semibold text-white mb-1">Shorts / Reels</h3>
                <p className="text-xs text-slate-400">Portrait mode for 1 verse & key reflections</p>
              </button>

              <button
                onClick={() => setVideoMode('recitation')}
                className="flex flex-col items-center p-6 bg-slate-800/50 hover:bg-emerald-950/30 border border-slate-700 hover:border-emerald-500/50 rounded-xl transition-all group"
              >
                <div className="w-16 h-10 border-2 border-emerald-400/60 group-hover:border-emerald-400 rounded-md flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="text-xs font-semibold text-emerald-400">16:9</span>
                </div>
                <h3 className="font-semibold text-white mb-1">Full Recitation</h3>
                <p className="text-xs text-slate-400">Landscape mode for full Surahs & scrolling text</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base">Quranic Reflections Studio</h1>
            <span className="text-xs text-slate-400 capitalize">
              {videoMode ? `${videoMode} Mode (${videoMode === 'shorts' ? '9:16' : '16:9'})` : 'Initializing...'}
            </span>
          </div>
        </div>

        {videoMode && (
          <button
            onClick={() => setVideoMode(null)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            Switch Format
          </button>
        )}
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN: CONTROLS & PEXELS ENGINE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="font-semibold text-sm text-slate-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-400" />
              Scripture & Text
            </h2>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Surah / Reference</label>
              <input
                type="text"
                value={surahInfo}
                onChange={(e) => setSurahInfo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Arabic Ayah</label>
              <textarea
                rows={2}
                value={arabicText}
                onChange={(e) => setArabicText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Translation</label>
              <textarea
                rows={2}
                value={translationText}
                onChange={(e) => setTranslationText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            {videoMode === 'shorts' && (
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Life Lesson Takeaway</label>
                <input
                  type="text"
                  value={lifeLesson}
                  onChange={(e) => setLifeLesson(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* PEXELS LIVE VIDEO SEARCH */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold text-sm text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Pexels Background Loops
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Live API</span>
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search background (e.g., sky, desert, clouds)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:border-emerald-500 outline-none"
              />
              <button
                onClick={() => fetchPexelsVideos(searchQuery)}
                className="p-2 bg-emerald-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-emerald-400"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingVideos ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading videos from Pexels...</div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pt-2">
                {videoList.map((vid) => (
                  <button
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVideo?.id === vid.id ? 'border-emerald-400' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CANVAS PREVIEW & EXPORT ACTION */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
          <div
            className={`relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl transition-all duration-300 ${
              videoMode === 'shorts' ? 'w-[300px] h-[533px]' : 'w-full max-w-[600px] h-[337px]'
            }`}
          >
            {selectedVideo && (
              <video
                key={selectedVideo.url}
                src={selectedVideo.url}
                autoPlay
                loop
                muted={!isPlaying}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-black/40 backdrop-blur-md border-white/10 text-white">
                  {surahInfo}
                </span>
              </div>

              <div className="p-4 rounded-xl border text-center space-y-3 bg-black/40 backdrop-blur-md border-white/10">
                <p className="text-2xl leading-relaxed text-white">
                  {arabicText}
                </p>
                <p className="text-xs text-white opacity-90">
                  {translationText}
                </p>
              </div>

              {videoMode === 'shorts' && lifeLesson && (
                <div className="p-2.5 rounded-lg border text-center text-xs font-medium bg-amber-500/20 text-amber-300 border-amber-500/40">
                  {lifeLesson}
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-[600px] bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                isExporting 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                  Processing ({exportProgress}%)
                </>
              ) : isExportComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  Download 1080p Video
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate & Export
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
