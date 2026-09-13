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
  CheckCircle2,
} from 'lucide-react';
import {
  CHAPTER_1_DATA,
  CHAPTER_1_SECTION_2_DATA,
  SECTIONS_META,
  LocationPoint,
} from '../data/chapter1Data';
import { EventBus, GAME_EVENTS, setAppLanguage, setAppSection } from '../game/EventBus';
import IntroScreen from '../components/IntroScreen';
import LocationCardModal from '../components/LocationCardModal';
import SeerahJournal from '../components/SeerahJournal';
import LineageTreeModal from '../components/LineageTreeModal';
import DarAlNadwahModal from '../components/DarAlNadwahModal';
import QuizModal from '../components/QuizModal';
import confetti from 'canvas-confetti';

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

  // Active Section: '1.1' | '1.2'
  const [activeSection, setActiveSection] = useState<'1.1' | '1.2'>('1.1');

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
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Active scene mode in Phaser
  const [currentScene, setCurrentScene] = useState<'ArabiaMapScene' | 'ZamzamScene' | 'DarAlNadwahScene'>('ArabiaMapScene');
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

    const handleCelebrate = () => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    };

    const handleSceneChanged = (sceneName: 'ArabiaMapScene' | 'ZamzamScene' | 'DarAlNadwahScene') => {
      setCurrentScene(sceneName);
    };

    EventBus.on(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
    EventBus.on(GAME_EVENTS.PORTFOLIO_SELECTED, handlePortfolioSelect);
    EventBus.on(GAME_EVENTS.CELEBRATE, handleCelebrate);
    EventBus.on(GAME_EVENTS.SCENE_CHANGED, handleSceneChanged);

    return () => {
      EventBus.removeListener(GAME_EVENTS.LOCATION_SELECTED, handleLocationSelect);
      EventBus.removeListener(GAME_EVENTS.PORTFOLIO_SELECTED, handlePortfolioSelect);
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

  const handleSwitchScene = (sceneName: 'ArabiaMapScene' | 'ZamzamScene' | 'DarAlNadwahScene') => {
    setCurrentScene(sceneName);
    EventBus.emit(GAME_EVENTS.SWITCH_SCENE, sceneName);
  };

  const handleSelectSection = (sectionId: '1.1' | '1.2') => {
    setActiveSection(sectionId);
    setAppSection(sectionId);

    // Switch to ArabiaMapScene so the map refreshes with the section's markers
    if (sectionId === '1.1' && currentScene === 'DarAlNadwahScene') {
      setCurrentScene('ArabiaMapScene');
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    } else if (sectionId === '1.2' && currentScene === 'ZamzamScene') {
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

  const activeSectionMeta = activeSection === '1.1' ? SECTIONS_META[0] : SECTIONS_META[1];
  const activeQuizQuestions =
    activeSection === '1.2' ? CHAPTER_1_SECTION_2_DATA.quizzes : CHAPTER_1_DATA.quizzes;

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between min-h-screen">
      {/* 1. Header Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md p-4 sm:px-6 rounded-3xl border-2 border-amber-300 shadow-lg mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Home / Intro Button */}
            <button
              onClick={() => setAppView('intro')}
              className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition shadow-xs"
              title={isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Intro'}
            >
              <Home className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md font-bold text-lg">
              {isBn ? '১' : '1'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {isBn ? 'অধ্যায় ১' : 'Chapter 1'}
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {isBn ? CHAPTER_1_DATA.meta.sourceBookBn : CHAPTER_1_DATA.meta.sourceBookEn}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-amber-950 font-bengali">
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

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              className="p-2.5 bg-amber-100/80 hover:bg-amber-200 text-amber-900 rounded-xl transition shadow-sm"
              title={audioMuted ? (isBn ? 'শব্দ চালু করুন' : 'Unmute') : (isBn ? 'শব্দ বন্ধ করুন' : 'Mute')}
            >
              {audioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Section 1.1 Action: Lineage Tree Modal */}
            {activeSection === '1.1' && (
              <button
                onClick={() => setIsTreeOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm"
              >
                <GitFork className="w-4 h-4 text-amber-700" />
                <span>{isBn ? 'বংশধারা' : 'Lineage Tree'}</span>
              </button>
            )}

            {/* Section 1.2 Action: Dar al-Nadwah Council Modal */}
            {activeSection === '1.2' && (
              <button
                onClick={() => setIsDarAlNadwahOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm"
              >
                <Landmark className="w-4 h-4 text-amber-700" />
                <span>{isBn ? 'দারুন নদওয়া ও সংসদ' : 'Dar al-Nadwah Council'}</span>
              </button>
            )}

            {/* Quiz Button */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 rounded-xl font-bold text-xs sm:text-sm border border-emerald-300 transition shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>
                {isBn
                  ? `কুইজ (${activeSection === '1.1' ? '১.১' : '১.২'})`
                  : `Quiz (${activeSection})`}
              </span>
            </button>

            {/* Journal Button */}
            <button
              onClick={() => setIsJournalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
            >
              <BookMarked className="w-4 h-4" />
              <span>
                {isBn ? 'সীরাহ জার্নাল' : 'Journal'} ({discoveredLocations.length})
              </span>
            </button>
          </div>
        </div>

        {/* 2. Section Selector Tabs Sub-Bar */}
        <div className="mt-4 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider font-bengali">
              {isBn ? 'অধ্যায়ের পর্ব নির্বাচন:' : 'Select Section:'}
            </span>
            <div className="flex items-center gap-2 bg-amber-100/80 p-1 rounded-xl border border-amber-300">
              <button
                onClick={() => handleSelectSection('1.1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeSection === '1.1'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-950 hover:bg-amber-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>
                  {isBn ? 'পর্ব ১.১: ভৌগোলিক পরিচয় ও কাবা' : 'Part 1.1: Geography & Ka\'bah'}
                </span>
              </button>

              <button
                onClick={() => handleSelectSection('1.2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeSection === '1.2'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-950 hover:bg-amber-200'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>
                  {isBn ? 'পর্ব ১.২: রাজবংশ ও মক্কার প্রশাসন' : 'Part 1.2: Kingdoms & Governance'}
                </span>
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-500 italic hidden md:inline">
            {isBn ? activeSectionMeta.taglineBn : activeSectionMeta.taglineEn}
          </span>
        </div>
      </header>

      {/* 3. Scene Selector Sub-Bar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900">
          <Layers className="w-4 h-4 text-amber-600" />
          <span>{isBn ? 'ইন্টারঅ্যাক্টিভ দৃশ্যপট নির্বাচন:' : 'Choose Interactive Scene:'}</span>
        </div>

        {/* Section 1.1 Scenes */}
        {activeSection === '1.1' && (
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
        )}

        {/* Section 1.2 Scenes */}
        {activeSection === '1.2' && (
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
              <span>{isBn ? '১. প্রাচীন আরব রাজ্য ও সীমানা' : '1. Ancient Kingdoms & Borders'}</span>
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
              <span>{isBn ? '২. দারুন নদওয়া ও মক্কার সংসদ' : '2. Dar al-Nadwah Council'}</span>
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
            {activeSection === '1.1'
              ? isBn
                ? 'মানচিত্রে জ্বলজ্বলে পিনগুলোতে ট্যাপ করে আরবের বিভিন্ন ঐতিহাসিক স্থান, সাগর এবং বাণিজ্য পথ আবিষ্কার করো এবং তোমার সীরাহ জার্নালে ব্যাজ সংগ্রহ করো!'
                : 'Tap the glowing pins across the map to discover historical cities, surrounding seas, and ancient trade routes to collect discovery badges in your Seerah Journal!'
              : isBn
                ? 'দারুন নদওয়ার সভাকক্ষে কুরাইশের বিভিন্ন সংসদীয় দায়িত্ব এবং প্রাচীন আরবের সীমান্ত রাজ্যগুলোতে ট্যাপ করে মক্কার শাসন ও যী কারের ইতিহাস শেখো!'
                : 'Step into Dar al-Nadwah or explore regional kingdoms on the map to learn how ancient Makkah governed and the victory of Dhi Qar!'}
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
          activeSection === '1.2'
            ? 'কুইজ চ্যালেঞ্জ: আরবের রাজবংশ ও মক্কার প্রশাসন (পর্ব ১.২)'
            : 'কুইজ চ্যালেঞ্জ: আরবের ভূগোল ও পবিত্র কাবা (পর্ব ১.১)'
        }
        titleEn={
          activeSection === '1.2'
            ? 'Quiz Challenge: Kingdoms & Governance (Part 1.2)'
            : 'Quiz Challenge: Geography & Sacred Ka\'bah (Part 1.1)'
        }
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
