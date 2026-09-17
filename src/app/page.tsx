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
  Landmark,
  Home,
  Puzzle,
  Scroll,
  ChevronDown,
} from 'lucide-react';
import {
  CHAPTER_1_DATA,
  CHAPTER_1_SECTION_2_DATA,
  CHAPTER_1_SECTION_3_DATA,
  SECTIONS_META,
  LocationPoint,
} from '../data/chapter1Data';
import { EventBus, GAME_EVENTS, setAppLanguage, setAppSection } from '../game/EventBus';
import IntroScreen from '../components/IntroScreen';
import LocationCardModal from '../components/LocationCardModal';
import SeerahJournal from '../components/SeerahJournal';
import LineageTreeModal from '../components/LineageTreeModal';
import DarAlNadwahModal from '../components/DarAlNadwahModal';
import { ReligiousHistoryModal } from '../components/ReligiousHistoryModal';
import QuizModal from '../components/QuizModal';
import PuzzleModal from '../components/PuzzleModal';

// Dynamic import with SSR disabled for Phaser canvas
const GameContainer = dynamic(() => import('../components/GameContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/9] max-w-5xl mx-auto rounded-2xl bg-slate-900 border-4 border-amber-300 flex flex-col items-center justify-center text-amber-300 gap-3 shadow-2xl">
      <Compass className="w-12 h-12 animate-spin" />
      <span className="text-base font-semibold font-bengali">
        আরবের মানচিত্র ও দৃশ্যপট লোড হচ্ছে... (Loading Game World)
      </span>
    </div>
  ),
});

export default function HomePage() {
  // Navigation View: 'intro' | 'chapter'
  const [appView, setAppView] = useState<'intro' | 'chapter'>('intro');

  // Active Section: '1.1' | '1.2' | '1.3'
  const [activeSection, setActiveSection] = useState<'1.1' | '1.2' | '1.3'>('1.1');

  // Global Language
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Interactive Game Data State
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  const [discoveredLocations, setDiscoveredLocations] = useState<LocationPoint[]>([]);
  const [learnedTribes, setLearnedTribes] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Modal Controls
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [isDarAlNadwahOpen, setIsDarAlNadwahOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  
  // Section 1.3 Modal state
  const [selectedReligiousStationId, setSelectedReligiousStationId] = useState<string | null>(null);
  const [isReligiousModalOpen, setIsReligiousModalOpen] = useState(false);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);

  // Active scene mode in Phaser
  const [currentScene, setCurrentScene] = useState<
    'ArabiaMapScene' | 'ZamzamScene' | 'DarAlNadwahScene' | 'MakkahJourneyScene' | 'IdolHistoryScene'
  >('ArabiaMapScene');
  const [audioMuted, setAudioMuted] = useState(false);

  const isBn = lang === 'bn';

  // Listen to Phaser Events
  useEffect(() => {
    const handleLocationSelect = (loc: LocationPoint) => {
      setSelectedLocation(loc);
    };

    const handlePortfolioSelect = (portfolioId: string) => {
      setSelectedPortfolioId(portfolioId);
      setIsDarAlNadwahOpen(true);
    };

    const handleReligiousStationSelect = (stationId: string) => {
      setSelectedReligiousStationId(stationId);
      setIsReligiousModalOpen(true);
    };

    const handleCelebrate = () => {
      // Particle/confetti celebrations disabled per app design guidelines
    };

    const handleSceneChanged = (
      sceneName:
        | 'ArabiaMapScene'
        | 'ZamzamScene'
        | 'DarAlNadwahScene'
        | 'MakkahJourneyScene'
        | 'IdolHistoryScene'
    ) => {
      setCurrentScene(sceneName);
    };

    EventBus.on(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
    EventBus.on(GAME_EVENTS.PORTFOLIO_SELECTED, handlePortfolioSelect);
    EventBus.on(GAME_EVENTS.RELIGIOUS_STATION_SELECTED, handleReligiousStationSelect);
    EventBus.on(GAME_EVENTS.CELEBRATE, handleCelebrate);
    EventBus.on(GAME_EVENTS.SCENE_CHANGED, handleSceneChanged);

    return () => {
      EventBus.removeListener(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
      EventBus.removeListener(GAME_EVENTS.PORTFOLIO_SELECTED, handlePortfolioSelect);
      EventBus.removeListener(GAME_EVENTS.RELIGIOUS_STATION_SELECTED, handleReligiousStationSelect);
      EventBus.removeListener(GAME_EVENTS.CELEBRATE, handleCelebrate);
      EventBus.removeListener(GAME_EVENTS.SCENE_CHANGED, handleSceneChanged);
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

  const handleSwitchScene = (
    sceneName:
      | 'ArabiaMapScene'
      | 'ZamzamScene'
      | 'DarAlNadwahScene'
      | 'MakkahJourneyScene'
      | 'IdolHistoryScene'
  ) => {
    setCurrentScene(sceneName);
    EventBus.emit(GAME_EVENTS.SWITCH_SCENE, sceneName);
  };

  const handleSelectSection = (sectionId: '1.1' | '1.2' | '1.3') => {
    setActiveSection(sectionId);
    setAppSection(sectionId);

    // Switch scene if switching between sections to avoid scene mismatch
    if (sectionId === '1.1' && (currentScene === 'DarAlNadwahScene' || currentScene === 'IdolHistoryScene')) {
      setCurrentScene('ArabiaMapScene');
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    } else if (
      sectionId === '1.2' &&
      (currentScene === 'ZamzamScene' || currentScene === 'MakkahJourneyScene' || currentScene === 'IdolHistoryScene')
    ) {
      setCurrentScene('ArabiaMapScene');
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    } else if (
      sectionId === '1.3' &&
      (currentScene === 'ZamzamScene' || currentScene === 'MakkahJourneyScene' || currentScene === 'DarAlNadwahScene')
    ) {
      setCurrentScene('ArabiaMapScene');
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    }
  };

  // 1. If currently in Intro Screen mode, render welcoming entry
  if (appView === 'intro') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <IntroScreen
          lang={lang}
          onToggleLang={handleToggleLanguage}
          onStartJourney={(secId) => {
            const targetSec = secId || '1.1';
            setActiveSection(targetSec);
            setAppSection(targetSec);
            setCurrentScene('ArabiaMapScene');
            setAppView('chapter');
          }}
        />
      </main>
    );
  }

  const activeSectionMeta =
    activeSection === '1.3'
      ? CHAPTER_1_SECTION_3_DATA.meta
      : activeSection === '1.2'
      ? SECTIONS_META[1]
      : SECTIONS_META[0];

  const activeQuizQuestions =
    activeSection === '1.3'
      ? CHAPTER_1_SECTION_3_DATA.quizzes
      : activeSection === '1.2'
      ? CHAPTER_1_SECTION_2_DATA.quizzes
      : CHAPTER_1_DATA.quizzes;

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-6 flex flex-col justify-between min-h-screen">
      {/* 1. Header Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md p-3 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-amber-300 shadow-lg mb-3 sm:mb-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Home / Intro Button */}
            <button
              onClick={() => setAppView('intro')}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition shadow-xs shrink-0"
              title={isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Intro'}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md font-bold text-sm sm:text-lg shrink-0">
              {isBn ? '১' : '1'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="bg-amber-100 text-amber-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  {isBn ? 'অধ্যায় ১' : 'Chapter 1'}
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline truncate">
                  {isBn ? CHAPTER_1_DATA.meta.sourceBookBn : CHAPTER_1_DATA.meta.sourceBookEn}
                </span>
              </div>
              <h1 className="text-sm sm:text-xl font-black text-amber-950 font-bengali leading-tight truncate">
                {isBn ? CHAPTER_1_DATA.meta.titleBn : CHAPTER_1_DATA.meta.titleEn}
              </h1>
            </div>
          </div>

          {/* Quick Header Toggles: Language & Audio (Visible on all screens) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-400 transition shadow-xs shrink-0"
              title="Switch Language / ভাষা পরিবর্তন"
            >
              <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800" />
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              className="p-1.5 sm:p-2.5 bg-amber-100/80 hover:bg-amber-200 text-amber-900 rounded-xl transition shadow-xs shrink-0"
              title={audioMuted ? (isBn ? 'শব্দ চালু করুন' : 'Unmute') : (isBn ? 'শব্দ বন্ধ করুন' : 'Mute')}
            >
              {audioMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Desktop Action Buttons Bar (>= sm) */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Section 1.1 Action: Lineage Tree Modal */}
              {activeSection === '1.1' && (
                <button
                  onClick={() => setIsTreeOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm shrink-0"
                >
                  <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                  <span>{isBn ? 'বংশধারা' : 'Lineage Tree'}</span>
                </button>
              )}

              {/* Section 1.2 Action: Dar al-Nadwah Council Modal */}
              {activeSection === '1.2' && (
                <button
                  onClick={() => setIsDarAlNadwahOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm shrink-0"
                >
                  <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                  <span>{isBn ? 'দারুন নদওয়া' : 'Dar al-Nadwah'}</span>
                </button>
              )}

              {/* Section 1.3 Action: Religious History Modal */}
              {activeSection === '1.3' && (
                <button
                  onClick={() => {
                    setSelectedReligiousStationId('hubal_idols');
                    setIsReligiousModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm shrink-0"
                >
                  <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                  <span>{isBn ? 'ধর্ম ও সমাজ' : 'Religion & Society'}</span>
                </button>
              )}

              {/* Interactive Puzzle Hub Button */}
              <button
                onClick={() => setIsPuzzleOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition shrink-0"
                title={isBn ? 'ঐতিহাসিক পাজল ও চ্যালেঞ্জ খেলুন' : 'Play History Puzzles & Challenges'}
              >
                <Puzzle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
                <span>{isBn ? 'পাজল গেম' : 'Puzzles'}</span>
              </button>

              {/* Quiz Button */}
              <button
                onClick={() => setIsQuizOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 rounded-xl font-bold text-xs sm:text-sm border border-emerald-300 transition shadow-sm shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                <span>
                  {isBn
                    ? `কুইজ (${activeSection === '1.3' ? '১.৩' : activeSection === '1.2' ? '১.২' : '১.১'})`
                    : `Quiz (${activeSection})`}
                </span>
              </button>

              {/* Journal Button */}
              <button
                onClick={() => setIsJournalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition shrink-0"
              >
                <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>
                  {isBn ? 'জার্নাল' : 'Journal'} ({discoveredLocations.length})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile 2x2 Quick Tools Grid (< sm) */}
        <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-amber-200/80 sm:hidden">
          {/* Section Action */}
          {activeSection === '1.1' && (
            <button
              onClick={() => setIsTreeOpen(true)}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs border border-amber-300 transition shadow-xs w-full min-w-0"
            >
              <GitFork className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{isBn ? 'বংশধারা' : 'Lineage Tree'}</span>
            </button>
          )}
          {activeSection === '1.2' && (
            <button
              onClick={() => setIsDarAlNadwahOpen(true)}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs border border-amber-300 transition shadow-xs w-full min-w-0"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{isBn ? 'দারুন নদওয়া' : 'Dar al-Nadwah'}</span>
            </button>
          )}
          {activeSection === '1.3' && (
            <button
              onClick={() => {
                setSelectedReligiousStationId('hubal_idols');
                setIsReligiousModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs border border-amber-300 transition shadow-xs w-full min-w-0"
            >
              <Scroll className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{isBn ? 'ধর্ম ও সমাজ' : 'Religion & Society'}</span>
            </button>
          )}

          {/* Puzzle Button */}
          <button
            onClick={() => setIsPuzzleOpen(true)}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold text-xs shadow-xs transition w-full min-w-0"
          >
            <Puzzle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span className="truncate">{isBn ? 'পাজল গেম' : 'Puzzles'}</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl font-bold text-xs border border-emerald-300 transition shadow-xs w-full min-w-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              {isBn ? `কুইজ (${activeSection === '1.3' ? '১.৩' : activeSection === '1.2' ? '১.২' : '১.১'})` : `Quiz (${activeSection})`}
            </span>
          </button>

          {/* Journal Button */}
          <button
            onClick={() => setIsJournalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-xs shadow-xs transition w-full min-w-0"
          >
            <BookMarked className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{isBn ? 'জার্নাল' : 'Journal'} ({discoveredLocations.length})</span>
          </button>
        </div>

        {/* 2. Section Selector Sub-Bar (Dropdown on Mobile, Tabs on Desktop) */}
        <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 uppercase tracking-wider font-bengali shrink-0">
              {isBn ? 'পর্ব:' : 'Section:'}
            </span>

            {/* Mobile Dropdown Select (< sm) */}
            <div className="relative flex-1 min-w-0 sm:hidden">
              <select
                value={activeSection}
                onChange={(e) => handleSelectSection(e.target.value as '1.1' | '1.2' | '1.3')}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-black text-xs py-2 pl-3 pr-8 rounded-xl border border-amber-400 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-amber-300 truncate font-bengali"
              >
                <option value="1.1" className="bg-slate-900 text-white font-semibold">
                  {isBn ? '📌 পর্ব ১.১: ভূগোল, জাতি ও কাবা' : '📌 1.1: Geography & Ka\'bah'}
                </option>
                <option value="1.2" className="bg-slate-900 text-white font-semibold">
                  {isBn ? '🏛️ পর্ব ১.২: রাজবংশ ও প্রশাসন' : '🏛️ 1.2: Governance'}
                </option>
                <option value="1.3" className="bg-slate-900 text-white font-semibold">
                  {isBn ? '📜 পর্ব ১.৩: ধর্ম ও সমাজ মানচিত্র' : '📜 1.3: Religion & Morals'}
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-white absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Desktop Tabs (>= sm) */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-amber-100/80 p-1 rounded-xl border border-amber-300">
              <button
                onClick={() => handleSelectSection('1.1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                  activeSection === '1.1'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-950 hover:bg-amber-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>
                  {isBn ? '১.১: ভূগোল ও কাবা' : '1.1: Geography & Ka\'bah'}
                </span>
              </button>

              <button
                onClick={() => handleSelectSection('1.2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                  activeSection === '1.2'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-950 hover:bg-amber-200'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>
                  {isBn ? '১.২: রাজবংশ ও প্রশাসন' : '1.2: Governance'}
                </span>
              </button>

              <button
                onClick={() => handleSelectSection('1.3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                  activeSection === '1.3'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-950 hover:bg-amber-200'
                }`}
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>
                  {isBn ? '১.৩: ধর্ম ও চারিত্রিক মানচিত্র' : '1.3: Religion & Morals'}
                </span>
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-500 italic hidden md:inline">
            {isBn ? activeSectionMeta.taglineBn : activeSectionMeta.taglineEn}
          </span>
        </div>
      </header>

      {/* 3. Scene Selector Sub-Bar (Dropdown on Mobile, Buttons on Desktop) */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 px-1 sm:px-2 gap-2 w-full">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 shrink-0">
          <Layers className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{isBn ? 'দৃশ্যপট:' : 'Scene:'}</span>
        </div>

        {/* Mobile Scene Selector Dropdown (< sm) */}
        <div className="relative flex-1 min-w-0 sm:hidden">
          <select
            value={currentScene}
            onChange={(e) => handleSwitchScene(e.target.value as any)}
            className="w-full bg-white text-amber-950 font-bold text-xs py-2 pl-3 pr-8 rounded-xl border border-amber-300 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 truncate font-bengali"
          >
            {activeSection === '1.1' && (
              <>
                <option value="ArabiaMapScene" className="bg-slate-900 text-white">
                  {isBn ? '🧭 ১. আরবের মানচিত্র ও বাণিজ্য' : '🧭 1. Arabia Map & Trade'}
                </option>
                <option value="MakkahJourneyScene" className="bg-slate-900 text-white">
                  {isBn ? '✨ ২. মক্কার উপাখ্যান (৫টি ধাপ)' : '✨ 2. Makkah Story (5 Phases)'}
                </option>
              </>
            )}
            {activeSection === '1.2' && (
              <>
                <option value="ArabiaMapScene" className="bg-slate-900 text-white">
                  {isBn ? '🧭 ১. আরবের সীমানা' : '🧭 1. Arabia Borders'}
                </option>
                <option value="DarAlNadwahScene" className="bg-slate-900 text-white">
                  {isBn ? '🏛️ ২. দারুন নদওয়া সংসদ' : '🏛️ 2. Dar al-Nadwah Council'}
                </option>
              </>
            )}
            {activeSection === '1.3' && (
              <>
                <option value="ArabiaMapScene" className="bg-slate-900 text-white">
                  {isBn ? '🧭 ১. আরবের মানচিত্র' : '🧭 1. Arabia Map'}
                </option>
                <option value="IdolHistoryScene" className="bg-slate-900 text-white">
                  {isBn ? '📜 ২. ধর্ম ও নৈতিক দৃশ্যপট' : '📜 2. Religion & Moral Scene'}
                </option>
              </>
            )}
          </select>
          <ChevronDown className="w-4 h-4 text-amber-800 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Desktop Scene Selector Buttons (>= sm) */}
        {activeSection === '1.1' && (
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleSwitchScene('ArabiaMapScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'ArabiaMapScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isBn ? '১. আরবের মানচিত্র' : '1. Arabia Map'}</span>
            </button>
            <button
              onClick={() => handleSwitchScene('MakkahJourneyScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'MakkahJourneyScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? '২. মক্কার উপাখ্যান (৫ ধাপ)' : '2. Makkah Story (5 Phases)'}</span>
            </button>
          </div>
        )}

        {/* Desktop Section 1.2 Scenes */}
        {activeSection === '1.2' && (
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleSwitchScene('ArabiaMapScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'ArabiaMapScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isBn ? '১. আরবের সীমানা' : '1. Arabia Borders'}</span>
            </button>
            <button
              onClick={() => handleSwitchScene('DarAlNadwahScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'DarAlNadwahScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{isBn ? '২. দারুন নদওয়া সংসদ' : '2. Dar al-Nadwah'}</span>
            </button>
          </div>
        )}

        {/* Desktop Section 1.3 Scenes */}
        {activeSection === '1.3' && (
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleSwitchScene('ArabiaMapScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'ArabiaMapScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isBn ? '১. আরবের মানচিত্র' : '1. Arabia Map'}</span>
            </button>
            <button
              onClick={() => handleSwitchScene('IdolHistoryScene')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentScene === 'IdolHistoryScene'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>{isBn ? '২. ধর্ম ও নৈতিক মানচিত্র' : '2. Religion & Moral Scene'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Phaser 3 Game World Viewport */}
      <div className="mb-4">
        <GameContainer />
      </div>

      {/* 5. Child Instruction Prompt */}
      <div className="bg-white/80 backdrop-blur border border-amber-200 rounded-2xl p-4 shadow-sm flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            💡 <strong className="text-amber-950">{isBn ? 'কীভাবে খেলবে:' : 'How to Play:'}</strong>{' '}
            {currentScene === 'IdolHistoryScene'
              ? isBn
                ? 'আম্র বিন লুহাইয়ের হুবাল মূর্তি, ভাগ্যের তীর আজলাম, পশুর কুসংস্কার ও আরবদের ৪টি মহৎ স্বভাবের স্থানগুলোতে ট্যাপ করে সত্য আবিষ্কার করো!'
                : 'Tap on Amr bin Luhayy\'s Hubal, Azlam arrows, livestock taboos, and the 4 noble Arab virtues to discover authentic history!'
              : currentScene === 'MakkahJourneyScene'
              ? isBn
                ? 'সাফা-মারওয়া, যমযমের অলৌকিক ধারা, জুরহুম গোত্রের কাফেলা ও কাবার প্রাচীর নির্মাণ—ধাপে ধাপে ইন্টারঅ্যাক্ট করে মক্কার ইতিহাস প্রত্যক্ষ করো!'
                : 'Explore the 5 living phases of Makkah: Safa & Marwah, the Zamzam miracle, Jurhum encampment, Ka\'bah construction, and night sanctuary!'
              : activeSection === '1.1'
              ? isBn
                ? 'মানচিত্রে জ্বলজ্বলে পিনগুলোতে ট্যাপ করে আরবের বিভিন্ন ঐতিহাসিক স্থান, সাগর এবং বাণিজ্য পথ আবিষ্কার করো এবং তোমার সীরাহ জার্নালে ব্যাজ সংগ্রহ করো!'
                : 'Tap the glowing pins across the map to discover historical cities, surrounding seas, and ancient trade routes to collect discovery badges in your Seerah Journal!'
              : activeSection === '1.2'
              ? isBn
                ? 'দারুন নদওয়ার সভাকক্ষে কুরাইশের বিভিন্ন সংসদীয় দায়িত্ব এবং প্রাচীন আরবের সীমান্ত রাজ্যগুলোতে ট্যাপ করে মক্কার শাসন ও যী কারের ইতিহাস শেখো!'
                : 'Step into Dar al-Nadwah or explore regional kingdoms on the map to learn how ancient Makkah governed and the victory of Dhi Qar!'
              : isBn
                ? 'মানচিত্রে অথবা ধর্ম ও কুসংস্কার দৃশ্যপটে ট্যাপ করে প্রাক-ইসলামী আরবের পূর্ণচিত্র প্রত্যক্ষ করো!'
                : 'Explore ancient Arabia on the map or tap the Religion & Moral Reform scene to see the complete pre-Islamic landscape!'}
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

      {/* 6. Modals */}
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

      <DarAlNadwahModal
        isOpen={isDarAlNadwahOpen}
        onClose={() => setIsDarAlNadwahOpen(false)}
        lang={lang}
        initialPortfolioId={selectedPortfolioId}
      />

      <ReligiousHistoryModal
        stationId={selectedReligiousStationId}
        onClose={() => {
          setIsReligiousModalOpen(false);
          setSelectedReligiousStationId(null);
        }}
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
        quizzes={activeQuizQuestions}
        titleBn={
          activeSection === '1.3'
            ? 'কুইজ চ্যালেঞ্জ: প্রাক-ইসলামী ধর্ম, সমাজ ও নৈতিকতা (পর্ব ১.৩)'
            : activeSection === '1.2'
            ? 'কুইজ চ্যালেঞ্জ: আরবের রাজবংশ ও মক্কার প্রশাসন (পর্ব ১.২)'
            : 'কুইজ চ্যালেঞ্জ: আরবের ভূগোল ও পবিত্র কাবা (পর্ব ১.১)'
        }
        titleEn={
          activeSection === '1.3'
            ? 'Quiz Challenge: Religion, Society & Morals (Part 1.3)'
            : activeSection === '1.2'
            ? 'Quiz Challenge: Kingdoms & Governance (Part 1.2)'
            : 'Quiz Challenge: Geography & Sacred Ka\'bah (Part 1.1)'
        }
      />

      <PuzzleModal
        isOpen={isPuzzleOpen}
        onClose={() => setIsPuzzleOpen(false)}
        lang={lang}
      />

      {/* 7. Footer */}
      <footer className="text-center text-xs text-slate-500 py-3 border-t border-amber-200">
        {isBn
          ? 'সীরাত ফর কিডস (Seerat For Kids) • আর-রাহীকুল মাখতূম কিতাবের প্রামাণ্য তথ্যের আলোকে শিশুদের জন্য নির্মিত'
          : 'Seerat For Kids • An interactive educational experience faithfully derived from Ar-Raheeq Al-Makhtum'}
      </footer>
    </main>
  );
}
