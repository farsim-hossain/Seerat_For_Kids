'use client';

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  BookmarkCheck,
  CheckCircle2,
  Scroll,
  Heart,
  Quote,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Chapter2Station, CHAPTER_2_DATA } from '../data/chapter2Data';

interface Chapter2DetailModalProps {
  stationId: string | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  onSaveToJournal: (item: { id: string; titleBn: string; titleEn: string; category: string }) => void;
}

export default function Chapter2DetailModal({
  stationId,
  isOpen,
  onClose,
  lang,
  onSaveToJournal,
}: Chapter2DetailModalProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'poetry' | 'lesson'>('narrative');
  const [saved, setSaved] = useState(false);

  if (!isOpen || !stationId) return null;

  const station = CHAPTER_2_DATA.stations.find((s) => s.id === stationId) || CHAPTER_2_DATA.stations[0];
  const isBn = lang === 'bn';

  const handleSave = () => {
    onSaveToJournal({
      id: station.id,
      titleBn: station.titleBn,
      titleEn: station.titleEn,
      category: 'Chapter 2: Family Background',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const getArtworkSrc = (key: string) => {
    switch (key) {
      case 'hashim_caravan_mecca':
        return '/assets/images/hashim_caravan_mecca.jpg';
      case 'zamzam_rediscovery_ancient':
        return '/assets/images/zamzam_rediscovery_ancient.jpg';
      case 'wadi_muhassir_elephant_storm':
        return '/assets/images/wadi_muhassir_elephant_storm.jpg';
      case 'yathrib_oasis_groves':
        return '/assets/images/yathrib_oasis_groves.jpg';
      case 'azlam_divination_arrows':
        return '/assets/images/azlam_divination_arrows.jpg';
      default:
        return '/assets/images/hashim_caravan_mecca.jpg';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-amber-50 rounded-3xl border-3 border-amber-400 shadow-2xl overflow-hidden font-bengali">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-900 via-amber-800 to-orange-950 text-white border-b-2 border-amber-400/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-300/40 flex items-center justify-center text-amber-200 shrink-0">
              <Scroll className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  {isBn ? '২য় অধ্যায়: পরিবার ও নসব' : 'Chapter 2: Family Background'}
                </span>
                {station.titleAr && (
                  <span className="text-xs text-amber-300 font-serif hidden sm:inline">
                    {station.titleAr}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-xl font-black text-amber-100 truncate">
                {isBn ? station.titleBn : station.titleEn}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Artwork Banner */}
        <div className="relative w-full h-44 sm:h-56 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={getArtworkSrc(station.imageKey)}
            alt={station.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/85 via-amber-950/30 to-transparent flex items-end p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-2xl bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
              {isBn ? station.taglineBn : station.taglineEn}
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-100/80 border-b border-amber-300 shrink-0">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === 'narrative'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isBn ? 'ঐতিহাসিক বিবরণ' : 'Historical Narrative'}</span>
          </button>

          {station.arabicPoetry && (
            <button
              onClick={() => setActiveTab('poetry')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                activeTab === 'poetry'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-amber-950 hover:bg-amber-200'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>{isBn ? 'আরবি কবিতা ও মর্সিয়া' : 'Arabic Poetry & Elegy'}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === 'lesson'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{isBn ? 'নৈতিক শিক্ষা ও প্রতিফলন' : 'Moral Lessons'}</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-800">
          {activeTab === 'narrative' && (
            <>
              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isBn ? 'সার-সংক্ষেপ' : 'Overview'}</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                  {isBn ? station.summaryBn : station.summaryEn}
                </p>
              </div>

              {/* Historical Context Detail */}
              <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>{isBn ? 'সবিস্তার ইতিহাস ও প্রেক্ষাপট' : 'Historical Detail & Context'}</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  {isBn ? station.historicalContextBn : station.historicalContextEn}
                </p>
              </div>

              {/* Key Milestones */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wider">
                  {isBn ? 'মূল ঐতিহাসিক ঘটনাবলি:' : 'Key Historic Milestones:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isBn ? station.keyEventsBn : station.keyEventsEn).map((event, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/90 rounded-xl border border-amber-200/80 flex items-start gap-2.5 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                        {event}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hadith / Sacred Quote */}
              {station.hadithOrQuoteBn && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 flex items-start gap-3">
                  <Quote className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                      {isBn ? 'হাদীস শরীফ' : 'Prophetic Hadith'}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-emerald-950 leading-relaxed">
                      {isBn ? station.hadithOrQuoteBn : station.hadithOrQuoteEn}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'poetry' && station.arabicPoetry && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-amber-900 text-amber-100 border-2 border-amber-400 shadow-md text-center">
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold block mb-3">
                  {isBn ? 'মূল আরবি পংক্তি' : 'Original Arabic Verses'}
                </span>
                <div className="space-y-2 font-serif text-base sm:text-xl leading-loose text-amber-50">
                  {station.arabicPoetry.arabic.map((line, idx) => (
                    <p key={idx} dir="rtl" className="tracking-wide">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {isBn ? 'কাব্যিক বঙ্গানুবাদ' : 'Bengali Poetic Translation'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium italic border-l-3 border-amber-600 pl-3">
                  "{station.arabicPoetry.bengali}"
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 pt-2 border-t border-amber-200">
                  {isBn ? 'ইংরেজি অনুবাদ' : 'English Translation'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium italic border-l-3 border-amber-500 pl-3">
                  "{station.arabicPoetry.english}"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'lesson' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-300">
                <div className="flex items-center gap-2 mb-2 text-amber-950 font-bold text-sm">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>{isBn ? 'সীরাতের চরিত্র ও জীবনের শিক্ষা' : 'Moral & Character Lesson'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {isBn ? station.moralLessonBn : station.moralLessonEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200">
                <h4 className="text-xs font-bold uppercase text-amber-900 mb-1">
                  {isBn ? 'প্রতিফলন প্রশ্ন:' : 'Reflection Question:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {isBn
                    ? 'হাশিম ও আবদুল মুত্তালিব যেভাবে কঠিন পরিস্থিতিতে সমাজ ও সত্যের পক্ষে অবিচল ছিলেন, তা থেকে আমরা আমাদের দৈনন্দিন জীবনে কী শিখতে পারি?'
                    : 'How can we apply the steadfastness, generosity, and trust in God shown by Hashim and Abdul Muttalib to our daily challenges?'}
                </p>
              </div>
            </div>
          )}

          {/* Footnotes Source Box */}
          <div className="pt-3 border-t border-amber-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700">
                {isBn ? 'প্রামাণ্য সূত্রাবলী: ' : 'Authentic Sources: '}
              </span>
              <span>{station.footnotes.join(' • ')}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-amber-100/90 border-t border-amber-300 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold rounded-xl border border-amber-300 transition shadow-xs"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>

          <button
            onClick={handleSave}
            disabled={saved}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>{isBn ? 'জার্নালে সংরক্ষিত!' : 'Saved to Journal!'}</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>{isBn ? 'সীরাত জার্নালে যোগ করো' : 'Add to Seerah Journal'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
