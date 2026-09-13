'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Puzzle,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Trophy,
  Landmark,
  Clock,
  Check,
} from 'lucide-react';
import { EventBus, GAME_EVENTS } from '../game/EventBus';

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

interface TimelineEvent {
  id: number;
  order: number;
  icon: string;
  year: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  hintBn: string;
  hintEn: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    order: 1,
    icon: '🏜️',
    year: 'প্রাচীন যুগ',
    titleBn: 'মরুভূমিতে আগমন ও তাওয়াক্কুল',
    titleEn: 'Arrival in the Barren Valley & Tawakkul',
    descBn: 'হযরত ইবরাহীম (আ.) আল্লাহর আদেশে বিবি হাজেরা ও শিশু ইসমাঈলকে মক্কার জনমানবহীন প্রান্তরে রেখে যান।',
    descEn: 'Prophet Ibrahim (AS) settles Lady Hajar and infant Ismail in the barren, uninhabited valley of Makkah.',
    hintBn: 'এটি মক্কার ইতিহাসের প্রথম ঘটনা, যখন উপত্যকায় কোনো মানুষ বা পানির চিহ্ন ছিল না।',
    hintEn: 'This was the first event, when Makkah was completely barren with no water or inhabitants.',
  },
  {
    id: 2,
    order: 2,
    icon: '💧',
    year: 'প্রাচীন যুগ',
    titleBn: 'যমযমের অলৌকিক প্রবাহ ও জুরহুমের বসতি',
    titleEn: 'The Miracle of Zamzam & Jurhum Settlement',
    descBn: 'সাফা-মারওয়ায় খোঁজাখুঁজির পর আল্লাহর নির্দেশে যমযম কূপের প্রকাশ ঘটে এবং জুরহুম গোত্র সেখানে বসতি গড়ে।',
    descEn: 'After searching between Safa and Marwah, the miraculous Zamzam spring gushes forth and Banu Jurhum settles.',
    hintBn: 'পানি পাওয়ার পরই সেখানে জনবসতি গড়ে ওঠে এবং মরুভূমিতে জীবনের সূচনা হয়।',
    hintEn: 'Only after the miraculous spring gushed did humans arrive and settle around Makkah.',
  },
  {
    id: 3,
    order: 3,
    icon: '🕋',
    year: 'প্রাচীন যুগ',
    titleBn: 'পবিত্র কাবার ভিত্তি স্থাপন ও নির্মাণ',
    titleEn: 'Raising the Foundations of the Ka\'bah',
    descBn: 'হযরত ইবরাহীম ও ইসমাঈল (আ.) এক আল্লাহর ইবাদতের জন্য পৃথিবীর প্রথম গৃহ পবিত্র কাবার দেয়াল নির্মাণ করেন।',
    descEn: 'Ibrahim (AS) and Ismail (AS) raise the sacred foundations of the Ka\'bah for the worship of the One God.',
    hintBn: 'শিশু ইসমাঈল বড় হয়ে যৌবনে পদার্পণ করার পর পিতা-পুত্র মিলে কাবার ভিত্তি স্থাপন করেন।',
    hintEn: 'When Ismail (AS) grew into a young man, father and son constructed the sacred sanctuary.',
  },
  {
    id: 4,
    order: 4,
    icon: '🏛️',
    year: '~৪৪০ খ্রিস্টাব্দ',
    titleBn: 'কুসাই বিন কিলাব ও দারুন নদওয়া প্রতিষ্ঠা',
    titleEn: 'Qusayy Unifies Quraysh & Founds Dar al-Nadwah',
    descBn: 'কুসাই কুরাইশকে একত্রিত করেন এবং কাবার উত্তর পাশে প্রথম ঐতিহাসিক সংসদ ভবন "দারুন নদওয়া" প্রতিষ্ঠা করেন।',
    descEn: 'Qusayy unifies Quraysh under established leadership and builds the historic council hall north of Ka\'bah.',
    hintBn: 'এটি কাবার কয়েক শতাব্দী পরে মক্কার কুরাইশদের প্রথম সাংগঠনিক সংসদ ও প্রশাসন ব্যবস্থা।',
    hintEn: 'Centuries later, Qusayy established the civic administration and council parliament for Quraysh.',
  },
  {
    id: 5,
    order: 5,
    icon: '⚔️',
    year: '~৬০৯ খ্রিস্টাব্দ',
    titleBn: 'যী কারের ঐতিহাসিক প্রান্তরে বিজয়',
    titleEn: 'Historic Arab Victory at the Battle of Dhi Qar',
    descBn: 'বনু শায়বানের নেতৃত্বে ঐক্যবদ্ধ আরব বাহিনী পারস্যের পরাক্রমশালী শাহী সেনাবহরকে শোচনীয়ভাবে পরাস্ত করে।',
    descEn: 'United Arab forces under Banu Shayban achieve a historic landmark victory against the Persian imperial army.',
    hintBn: 'এটি প্রাচীন যুগের শেষ দিকের একটি যুগান্তকারী ঘটনা যেখানে আরবরা প্রথমবার পারস্য বাহিনীকে পরাজিত করে।',
    hintEn: 'This was a milestone turning point where Arabs for the first time routed a major imperial army.',
  },
];

interface MatchingItem {
  id: string;
  clanBn: string;
  clanEn: string;
  roleBn: string;
  roleEn: string;
  dutyBn: string;
  dutyEn: string;
  icon: string;
}

const MATCHING_PAIRS: MatchingItem[] = [
  {
    id: 'hashim',
    clanBn: 'বনু হাশিম',
    clanEn: 'Banu Hashim',
    roleBn: 'আস-সিক্বায়াহ ও আর-রিফাদাহ',
    roleEn: 'Siqayah & Rifadah',
    dutyBn: 'হাজীদের জন্য সুমিষ্ট শরবত বণ্টন ও মেহমানদারির রাজকীয় খাবার তহবিল।',
    dutyEn: 'Sweetened water distribution and banquet feast for visiting pilgrims.',
    icon: '💧',
  },
  {
    id: 'abduddar',
    clanBn: 'বনু আব্দুদ্দার',
    clanEn: 'Banu Abdud-Dar',
    roleBn: 'আল-হিজাবাহ ও আল-লিওয়া',
    roleEn: 'Hijabah & Liwa',
    dutyBn: 'পবিত্র কাবার পবিত্র চাবি সংরক্ষণ, দরজা খোলা এবং যুদ্ধের জাতীয় পতাকা বহন।',
    dutyEn: 'Sacred custody of the Ka\'bah keys and carrying the national war banner.',
    icon: '🔑',
  },
  {
    id: 'adi',
    clanBn: 'বনু আদী',
    clanEn: 'Banu Adi',
    roleBn: 'আস-সিফারাহ (কূটনীতি)',
    roleEn: 'Sifarah (Diplomacy)',
    dutyBn: 'বহিঃরাষ্ট্র ও ভিনদেশী গোত্রে মক্কার রাষ্ট্রদূত হয়ে শান্তি ও মধ্যস্থতার মিশন।',
    dutyEn: 'Foreign embassy diplomacy and tribal peace ambassador missions (Clan of Umar RA).',
    icon: '📜',
  },
  {
    id: 'taym',
    clanBn: 'বনু তায়ম',
    clanEn: 'Banu Taym',
    roleBn: 'আল-আশনাক (রক্তপণ ও জরিমানা)',
    roleEn: 'Ashnaq (Civil Compensation)',
    dutyBn: 'গোত্রীয় সংঘাতের ক্ষতিপূরণ, রক্তপণ ও দেওয়ানি বিচার নিষ্পত্তি।',
    dutyEn: 'Tribal blood-money arbitration and conflict indemnities (Clan of Abu Bakr RA).',
    icon: '⚖️',
  },
  {
    id: 'asad',
    clanBn: 'বনু আসাদ',
    clanEn: 'Banu Asad',
    roleBn: 'আল-মাশওয়ারা (পরামর্শ সভা)',
    roleEn: 'Al-Mashwarah (Advisory Council)',
    dutyBn: 'সংকটের মুহূর্তে দারুন নদওয়ায় কুরাইশ নেতৃবৃন্দকে নীতি নির্ধারণী পরামর্শ দান।',
    dutyEn: 'Consultative council steering policy decisions inside Dar al-Nadwah.',
    icon: '🏛️',
  },
];

export default function PuzzleModal({ isOpen, onClose, lang }: PuzzleModalProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'matcher'>('timeline');

  // Timeline Puzzle State
  const [timelineItems, setTimelineItems] = useState<TimelineEvent[]>([]);
  const [timelineChecked, setTimelineChecked] = useState<boolean>(false);
  const [timelineSuccess, setTimelineSuccess] = useState<boolean>(false);

  // Matching Puzzle State
  const [selectedClan, setSelectedClan] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matcherSuccess, setMatcherSuccess] = useState<boolean>(false);

  const isBn = lang === 'bn';

  // Initialize Timeline in shuffled order
  const initTimeline = () => {
    const shuffled = [...TIMELINE_EVENTS].sort(() => Math.random() - 0.5);
    setTimelineItems(shuffled);
    setTimelineChecked(false);
    setTimelineSuccess(false);
  };

  // Initialize Matching Puzzle
  const initMatcher = () => {
    setSelectedClan(null);
    setMatchedPairs([]);
    setMatcherSuccess(false);
  };

  useEffect(() => {
    if (isOpen) {
      initTimeline();
      initMatcher();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Move timeline item up
  const moveItemUp = (idx: number) => {
    if (idx === 0) return;
    const newItems = [...timelineItems];
    const temp = newItems[idx];
    newItems[idx] = newItems[idx - 1];
    newItems[idx - 1] = temp;
    setTimelineItems(newItems);
    setTimelineChecked(false);
  };

  // Move timeline item down
  const moveItemDown = (idx: number) => {
    if (idx === timelineItems.length - 1) return;
    const newItems = [...timelineItems];
    const temp = newItems[idx];
    newItems[idx] = newItems[idx + 1];
    newItems[idx + 1] = temp;
    setTimelineItems(newItems);
    setTimelineChecked(false);
  };

  // Validate Timeline Order
  const handleCheckTimeline = () => {
    setTimelineChecked(true);
    const isCorrect = timelineItems.every((item, idx) => item.order === idx + 1);

    if (isCorrect) {
      setTimelineSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
      });
      EventBus.emit(GAME_EVENTS.CELEBRATE);
    } else {
      setTimelineSuccess(false);
    }
  };

  // Handle Matcher Click
  const handleClanClick = (clanId: string) => {
    if (matchedPairs.includes(clanId)) return;
    setSelectedClan(clanId);
  };

  const handleRoleClick = (roleId: string) => {
    if (!selectedClan || matchedPairs.includes(roleId)) return;

    if (selectedClan === roleId) {
      // Correct match!
      const updated = [...matchedPairs, roleId];
      setMatchedPairs(updated);
      setSelectedClan(null);

      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
      });

      if (updated.length === MATCHING_PAIRS.length) {
        setMatcherSuccess(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#059669', '#d97706', '#2563eb', '#7c3aed'],
        });
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      }
    } else {
      // Incorrect match hint
      setSelectedClan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 p-4 sm:px-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              <Puzzle className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isBn ? 'ইন্টারঅ্যাক্টিভ খেলা' : 'Interactive Games'}
                </span>
                <span className="text-xs text-white/80 hidden sm:inline">
                  {isBn ? 'ঐতিহাসিক পাজল ও চ্যালেঞ্জ' : 'Seerah History Puzzles'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-bengali">
                {isBn ? 'সীরাহ পাজল ও আবিষ্কার হাব' : 'Seerah Puzzle & Discovery Hub'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isBn ? '১. ঐতিহাসিক কালানুক্রমিক পাজল' : '1. Historical Timeline'}</span>
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'matcher'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{isBn ? '২. সংসদীয় গোত্র ম্যাচিং' : '2. Council Clan Matcher'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: TIMELINE PUZZLE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {/* Instructions */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-950">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {isBn
                      ? 'তীরচিহ্ন (▲ / ▼) চেপে ঘটনাগুলোকে অতীতের ক্রম অনুযায়ী (১ম থেকে ৫ম) সাজাও!'
                      : 'Use the arrows (▲ / ▼) to arrange these 5 landmark events in correct historical sequence!'}
                  </span>
                </div>
                <button
                  onClick={initTimeline}
                  className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1 transition shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পুনরায় সাজাও' : 'Shuffle'}</span>
                </button>
              </div>

              {/* Cards List */}
              <div className="space-y-2.5">
                {timelineItems.map((item, idx) => {
                  const isCorrectPosition = item.order === idx + 1;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                        timelineChecked
                          ? isCorrectPosition
                            ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                            : 'bg-rose-50 border-rose-300'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Step Number */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                          timelineChecked && isCorrectPosition
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 text-amber-950'
                        }`}
                      >
                        {idx + 1}
                      </div>

                      {/* Icon */}
                      <div className="text-2xl shrink-0">{item.icon}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900">
                            {isBn ? item.titleBn : item.titleEn}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold shrink-0">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {isBn ? item.descBn : item.descEn}
                        </p>

                        {/* Hint if wrong after checking */}
                        {timelineChecked && !isCorrectPosition && (
                          <div className="text-[11px] text-amber-800 bg-amber-100/60 p-1.5 rounded-lg mt-1.5">
                            💡 {isBn ? item.hintBn : item.hintEn}
                          </div>
                        )}
                      </div>

                      {/* Up / Down Controls */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveItemUp(idx)}
                          className={`p-1.5 rounded-lg transition ${
                            idx === 0
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'bg-slate-100 hover:bg-amber-200 text-slate-700'
                          }`}
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={idx === timelineItems.length - 1}
                          onClick={() => moveItemDown(idx)}
                          className={`p-1.5 rounded-lg transition ${
                            idx === timelineItems.length - 1
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'bg-slate-100 hover:bg-amber-200 text-slate-700'
                          }`}
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Success Banner or Check Button */}
              {timelineSuccess ? (
                <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-7 h-7 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                        🎉 {isBn ? 'চমৎকার! নিখুঁত কালানুক্রম!' : 'Brilliant! Perfect Chronology!'}
                      </h4>
                      <p className="text-xs text-emerald-800">
                        {isBn
                          ? 'তুমি মক্কার আদি নির্জন প্রান্তর থেকে দারুন নদওয়া ও যী কারের ইতিহাস সফলভাবে সাজিয়েছো।'
                          : 'You correctly mapped the historical journey from ancient Makkah to Dar al-Nadwah & Dhi Qar.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={initTimeline}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    {isBn ? 'আবার খেলো' : 'Play Again'}
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCheckTimeline}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>{isBn ? 'ক্রম মিলিয়ে দেখো' : 'Check Timeline'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COUNCIL CLAN MATCHER */}
          {activeTab === 'matcher' && (
            <div className="space-y-4">
              {/* Instructions */}
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-950">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    {isBn
                      ? 'বাম পাশের কুরাইশ গোত্র বেছে নাও, তারপর ডান পাশের সঠিক সংসদীয় দায়িত্বের সাথে মেলাও!'
                      : 'Select a Quraysh clan on the left, then click its corresponding civic responsibility on the right!'}
                  </span>
                </div>
                <button
                  onClick={initMatcher}
                  className="px-2.5 py-1 bg-indigo-200/80 hover:bg-indigo-300 text-indigo-900 rounded-lg text-xs font-bold flex items-center gap-1 transition shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নতুন খেলা' : 'Reset'}</span>
                </button>
              </div>

              {/* Two Column Matching Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column: Clans */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                    {isBn ? 'কুরাইশ গোত্রসমূহ (Clans)' : 'Quraysh Clans'}
                  </h4>
                  {MATCHING_PAIRS.map((pair) => {
                    const isMatched = matchedPairs.includes(pair.id);
                    const isSelected = selectedClan === pair.id;

                    return (
                      <button
                        key={pair.id}
                        disabled={isMatched}
                        onClick={() => handleClanClick(pair.id)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left transition flex items-center justify-between ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-400 opacity-80 cursor-default'
                            : isSelected
                            ? 'bg-indigo-100 border-indigo-600 shadow-md ring-2 ring-indigo-300'
                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{pair.icon}</span>
                          <div>
                            <div className="font-bold text-sm sm:text-base text-slate-900">
                              {isBn ? pair.clanBn : pair.clanEn}
                            </div>
                            <div className="text-xs text-slate-500">
                              {isMatched ? (
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  {isBn ? pair.roleBn : pair.roleEn}
                                </span>
                              ) : (
                                isBn ? 'দায়িত্ব মেলাতে ট্যাপ করো' : 'Tap to match duty'
                              )}
                            </div>
                          </div>
                        </div>
                        {isMatched && (
                          <span className="text-emerald-600 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ {isBn ? 'সংযুক্ত' : 'Paired'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Roles */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                    {isBn ? 'দারুন নদওয়ার দায়িত্ব (Civic Duties)' : 'Civic Responsibilities'}
                  </h4>
                  {MATCHING_PAIRS.map((pair) => {
                    const isMatched = matchedPairs.includes(pair.id);

                    return (
                      <button
                        key={pair.id}
                        disabled={isMatched || !selectedClan}
                        onClick={() => handleRoleClick(pair.id)}
                        className={`w-full p-3 rounded-2xl border-2 text-left transition ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-400 opacity-80 cursor-default'
                            : selectedClan
                            ? 'bg-amber-50/60 border-amber-300 hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer'
                            : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-indigo-950">
                            {isBn ? pair.roleBn : pair.roleEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                          {isBn ? pair.dutyBn : pair.dutyEn}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Completion Banner */}
              {matcherSuccess && (
                <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-7 h-7 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                        🎉 {isBn ? 'অসাধারণ! সংসদীয় পরিষদ সম্পূর্ণ!' : 'Outstanding! Council Complete!'}
                      </h4>
                      <p className="text-xs text-emerald-800">
                        {isBn
                          ? 'তুমি কুরাইশের সকল ঐতিহ্যবাহী গোত্র ও তাদের প্রশাসনিক দায়িত্ব নিখুঁতভাবে চিহ্নিত করেছো।'
                          : 'You accurately paired all historic clans with their civic portfolios in Makkah.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={initMatcher}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    {isBn ? 'পুনরায় খেলো' : 'Play Again'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            {isBn ? 'আর-রাহীকুল মাখতূম (সিরাত গ্রন্থ ভিত্তিক)' : 'Based on Ar-Raheeq Al-Makhtum'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
