'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Compass,
  BookMarked,
  GitFork,
  HelpCircle,
  Sparkles,
  MapPin,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  Languages,
} from 'lucide-react';
import { CHAPTER_1_DATA, LocationPoint } from '../data/chapter1Data';
import { EventBus, GAME_EVENTS, setAppLanguage } from '../game/EventBus';
import LocationCardModal from '../components/LocationCardModal';
import SeerahJournal from '../components/SeerahJournal';
import LineageTreeModal from '../components/LineageTreeModal';
import QuizModal from '../components/QuizModal';
import confetti from 'canvas-confetti';

// Dynamic import with SSR disabled for Phaser canvas
const GameContainer = dynamic(() => import('../components/GameContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/9] max-w-5xl mx-auto rounded-2xl bg-slate-900 border-4 border-amber-300 flex flex-col items-center justify-center text-amber-300 gap-3 shadow-2xl">
      <Compass className="w-12 h-12 animate-spin" />
      <span className="text-base font-semibold font-bengali">
        আরবের মানচিত্র ও দৃশ্যপট লোড হচ্ছে... (Loading Map)
      </span>
    </div>
  ),
});

export default function HomePage() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  const [discoveredLocations, setDiscoveredLocations] = useState<LocationPoint[]>([]);
  const [learnedTribes, setLearnedTribes] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Modal controls
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Active scene mode in Phaser
  const [currentScene, setCurrentScene] = useState<'ArabiaMapScene' | 'ZamzamScene'>('ArabiaMapScene');
  const [audioMuted, setAudioMuted] = useState(false);

  const isBn = lang === 'bn';

  // Listen to Phaser Events
  useEffect(() => {
    const handleLocationSelect = (loc: LocationPoint) => {
      setSelectedLocation(loc);
    };

    const handleCelebrate = () => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    };

    EventBus.on(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
    EventBus.on(GAME_EVENTS.CELEBRATE, handleCelebrate);

    return () => {
      EventBus.removeListener(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
      EventBus.removeListener(GAME_EVENTS.CELEBRATE, handleCelebrate);
    };
  }, []);

  const handleToggleLanguage = () => {
    const nextLang = lang === 'bn' ? 'en' : 'bn';
    setLang(nextLang);
    setAppLanguage(nextLang);
  };

  const handleSaveToJournal = (loc: LocationPoint) => {
    if (!discoveredLocations.some((item) => item.id === loc.id)) {
      setDiscoveredLocations((prev) => [...prev, loc]);
    }
  };

  const handleTribeLearned = (tribeId: string) => {
    if (!learnedTribes.includes(tribeId)) {
      setLearnedTribes((prev) => [...prev, tribeId]);
    }
  };

  const handleSwitchScene = (sceneName: 'ArabiaMapScene' | 'ZamzamScene') => {
    setCurrentScene(sceneName);
    EventBus.emit(GAME_EVENTS.SWITCH_SCENE, sceneName);
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:px-6 rounded-3xl border-2 border-amber-300 shadow-lg mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md font-bold text-xl">
            {isBn ? '১' : '1'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {isBn ? 'অধ্যায় ১' : 'Chapter 1'}
              </span>
              <span className="text-xs text-slate-500">
                {isBn ? CHAPTER_1_DATA.meta.sourceBookBn : CHAPTER_1_DATA.meta.sourceBookEn}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-950 font-bengali">
              {isBn ? CHAPTER_1_DATA.meta.titleBn : CHAPTER_1_DATA.meta.titleEn}
            </h1>
          </div>
        </div>

        {/* Action Buttons & Language Switcher */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-400 transition shadow-sm"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Languages className="w-4 h-4 text-amber-800" />
            <span>{isBn ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className="p-2.5 bg-amber-100/80 hover:bg-amber-200 text-amber-900 rounded-xl transition shadow-sm"
            title={audioMuted ? (isBn ? "শব্দ চালু করুন" : "Unmute") : (isBn ? "শব্দ বন্ধ করুন" : "Mute")}
          >
            {audioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Tribe Tree Button */}
          <button
            onClick={() => setIsTreeOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm"
          >
            <GitFork className="w-4 h-4 text-amber-700" />
            <span>{isBn ? 'বংশধারা' : 'Lineage Tree'}</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 rounded-xl font-bold text-xs sm:text-sm border border-emerald-300 transition shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{isBn ? 'কুইজ চ্যালেঞ্জ' : 'Quiz Challenge'}</span>
          </button>

          {/* Journal Button */}
          <button
            onClick={() => setIsJournalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
          >
            <BookMarked className="w-4 h-4" />
            <span>
              {isBn ? 'সীরাহ জার্নাল' : 'Journal'} ({discoveredLocations.length}/{CHAPTER_1_DATA.locations.length})
            </span>
          </button>
        </div>
      </header>

      {/* 2. Scene Selector Sub-Bar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900">
          <Layers className="w-4 h-4 text-amber-600" />
          <span>{isBn ? 'ইন্টারঅ্যাক্টিভ দৃশ্যপট নির্বাচন:' : 'Choose Interactive Scene:'}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSwitchScene('ArabiaMapScene')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currentScene === 'ArabiaMapScene'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-white/80 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isBn ? '১. আরবের মানচিত্র ও বাণিজ্য পথ' : '1. Arabia Map & Trade Route'}</span>
          </button>
          <button
            onClick={() => handleSwitchScene('ZamzamScene')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currentScene === 'ZamzamScene'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-white/80 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? '২. মরুভূমিতে যমযম ও কাবা' : '2. Zamzam & Ka\'bah Construction'}</span>
          </button>
        </div>
      </div>

      {/* 3. Phaser 3 Game World Viewport */}
      <div className="mb-6">
        <GameContainer />
      </div>

      {/* 4. Child Instruction Prompt */}
      <div className="bg-white/80 backdrop-blur border border-amber-200 rounded-2xl p-4 shadow-sm flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            💡 <strong className="text-amber-950">{isBn ? 'কীভাবে খেলবে:' : 'How to Play:'}</strong>{' '}
            {isBn
              ? 'মানচিত্রে জ্বলজ্বলে পিনগুলোতে ট্যাপ করে আরবের বিভিন্ন ঐতিহাসিক স্থান, সাগর এবং বাণিজ্য পথ আবিষ্কার করো এবং তোমার সীরাহ জার্নালে ব্যাজ সংগ্রহ করো!'
              : 'Tap the glowing pins across the map to discover historical cities, surrounding seas, and ancient trade routes to collect discovery badges in your Seerah Journal!'}
          </div>
        </div>
        <button
          onClick={() => setIsJournalOpen(true)}
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 transition whitespace-nowrap"
        >
          <span>{isBn ? 'অগ্রগতি দেখো' : 'View Progress'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Modals */}
      <LocationCardModal
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
        onSaveToJournal={handleSaveToJournal}
        isSaved={
          selectedLocation
            ? discoveredLocations.some((item) => item.id === selectedLocation.id)
            : false
        }
        lang={lang}
      />

      <SeerahJournal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        discoveredLocations={discoveredLocations}
        tribesLearned={learnedTribes}
        quizPassed={quizPassed}
        score={quizScore}
        lang={lang}
      />

      <LineageTreeModal
        isOpen={isTreeOpen}
        onClose={() => setIsTreeOpen(false)}
        onTribeLearned={handleTribeLearned}
        learnedTribes={learnedTribes}
        lang={lang}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onQuizCompleted={(score) => {
          setQuizScore(score);
          setQuizPassed(true);
        }}
        lang={lang}
      />

      {/* 6. Footer */}
      <footer className="text-center text-xs text-slate-500 py-3 border-t border-amber-200">
        {isBn
          ? 'সীরাত ফর কিডস (Seerat For Kids) • আর-রাহীকুল মাখতূম কিতাবের প্রামাণ্য তথ্যের আলোকে শিশুদের জন্য নির্মিত'
          : 'Seerat For Kids • An interactive educational experience faithfully derived from Ar-Raheeq Al-Makhtum'}
      </footer>
    </main>
  );
}
