'use client';

import React, { useState, useEffect } from 'react';
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
  Users,
  ShieldCheck,
  Flame,
  Award,
  BookMarked,
} from 'lucide-react';
import { Chapter2Station, CHAPTER_2_DATA, AbdulMuttalibChild } from '../data/chapter2Data';

interface Chapter2DetailModalProps {
  stationId: string | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  onSaveToJournal: (item: { id: string; titleBn: string; titleEn: string; category: string }) => void;
  initialTab?: 'narrative' | 'family_circle' | 'poetry' | 'lesson' | 'sources';
}

export default function Chapter2DetailModal({
  stationId,
  isOpen,
  onClose,
  lang,
  onSaveToJournal,
  initialTab = 'narrative',
}: Chapter2DetailModalProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'family_circle' | 'poetry' | 'lesson' | 'sources'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      if (initialTab === 'poetry' && !station?.arabicPoetry) {
        setActiveTab('narrative');
      } else {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, initialTab, stationId]);
  const [childFilter, setChildFilter] = useState<'all' | 'son' | 'daughter'>('all');
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

  const filteredChildren = CHAPTER_2_DATA.abdulMuttalibChildren.filter((c) => {
    if (childFilter === 'all') return true;
    return c.gender === childFilter;
  });

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
        <div className="relative w-full h-40 sm:h-52 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={getArtworkSrc(station.imageKey)}
            alt={station.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/85 via-amber-950/30 to-transparent flex items-end p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-2xl bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
              {isBn ? station.taglineBn : station.taglineEn}
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 bg-amber-100/90 border-b border-amber-300 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'narrative'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isBn ? 'ঐতিহাসিক বিবরণ' : 'Narrative'}</span>
          </button>

          <button
            onClick={() => setActiveTab('family_circle')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'family_circle'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isBn ? '১০ পুত্র ও ৬ কন্যা (চাচা-ফুফু)' : '10 Sons & 6 Daughters'}</span>
          </button>

          {station.arabicPoetry && (
            <button
              onClick={() => setActiveTab('poetry')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'poetry'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-amber-950 hover:bg-amber-200'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>{isBn ? 'আরবি কবিতা ও মর্সিয়া' : 'Arabic Poetry'}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'lesson'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{isBn ? 'নৈতিক শিক্ষা' : 'Moral Lessons'}</span>
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

              {/* Special Deep-Dive Highlight Box 1: Desert Water Trial */}
              {station.id === 'abdul_muttalib_zamzam' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-amber-50 border-2 border-sky-300 space-y-3">
                  <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
                    <Compass className="w-5 h-5 text-sky-700" />
                    <span>{isBn ? 'মরুভূমির পানির পরীক্ষা ও চরম সংকট' : 'The Desert Water Trial'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {isBn
                      ? 'যমযম বিরোধে সিরিয়ার গণকের কাছে যাওয়ার পথে গভীর মরুভূমিতে কাফেলার পানি শেষ হয়ে যায়। মৃত্যুর মুখে দাঁড়িয়ে সকলে যখন নিজেদের কবর খোঁড়া শুরু করেছিল, তখন আবদুল মুত্তালিব বললেন—"চেষ্টা না করে মৃত্যুর মুখে বসে থাকা দুর্বলতা।" এরপর তিনি নিজের উটের পিঠে চড়তেই তার খুরের নিচ থেকে সুমিষ্ট ঠাণ্ডা পানি উথলে ওঠে! কুরাইশ নেতারা বিস্মিত হয়ে বললেন—"যিনি এই মরুপ্রান্তরে আপনাকে পানি দিয়ে বাঁচালেন, তিনিই আপনাকে যমযম দান করেছেন।" তাঁরা সিরিয়া না গিয়ে মক্কায় ফিরে আসেন এবং যমযমের দাবি ত্যাগ করেন।'
                      : 'During the journey toward Syria regarding Zamzam, water supplies vanished. Facing death, companions were digging their graves in despair. Abdul Muttalib declared: "Surrendering to death without striving is weakness!" As he mounted his camel, freshwater sprang from under its hooves! Quenched and humbled, Quraysh surrendered all claims to Zamzam immediately.'}
                  </p>
                </div>
              )}

              {/* Special Deep-Dive Highlight Box 2: Hateem Sword & Khuza'a Alliance */}
              {station.id === 'abdul_muttalib_zamzam' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                    <Flame className="w-5 h-5 text-emerald-700" />
                    <span>{isBn ? 'হাতীমে নাঙ্গা তলোয়ার ও মক্কা বিজয়ের বীজ' : 'The Hateem Sword & The Seed of Makkah Victory'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {isBn
                      ? 'মুত্তালিবের ইন্তেকালের পর নওফল কিশোর শাইবার সম্পত্তি দখল করলে মদীনার মামা আবু সা\'দ বিন আদী ৮০ জন সওয়ার নিয়ে মক্কায় আসেন। তিনি শপথ করেন নওফলের মুখোমুখি হওয়ার আগে বিশ্রাম নেবেন না। হাতীমে কুরাইশ নেতাদের সামনে নওফলের মাথার ওপর খোলা তলোয়ার তুলে তিনি শাইবার অধিকার ফিরিয়ে নেন। এ ঘটনা দেখে বনু খুযা\'আ হাশিমীদের সাথে চিরন্তন মিত্রচুক্তি করে। ৮ দশক পর এই চুক্তির শর্ত লঙ্ঘনের কারণেই সংঘটিত হয়েছিল ঐতিহাসিক "মক্কা বিজয়" (ফাতহু মক্কা)!'
                      : 'When Nawfal seized young Shaiba’s estate, uncle Abu Sa\'d rode from Yathrib with 80 horsemen, holding his bare sword over Nawfal at Hateem to restore his rights. Witnessing this valor, Banu Khuza\'a formed a sacred alliance with Banu Hashim. Eight decades later, the breach of this very treaty prompted the glorious Conquest of Makkah!'}
                  </p>
                </div>
              )}

              {/* Special Deep-Dive Highlight Box 3: Ka'bah vs. Jerusalem */}
              {station.id === 'elephant_army_571' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border-2 border-rose-300 space-y-3">
                  <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                    <Award className="w-5 h-5 text-rose-700" />
                    <span>{isBn ? 'ঐতিহাসিক রহস্য: কাবা শরীফ বনাম বায়তুল মুকাদ্দাস' : 'The Mystery: Ka\'bah vs. Jerusalem'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {isBn
                      ? 'কিতাবে সীরাতের এক অনুপম রহস্য তুলে ধরা হয়েছে: বায়তুল মুকাদ্দাস অতীতে দুইবার ধ্বংস হয়েছিল (৫৭৮ খ্রি.পূ. বুখতেনাসার কর্তৃক এবং ৭০ খ্রি. রোমানদের দ্বারা), যখন তার অধিবাসীরা ছিল ঈমানদার মুসলমান। অথচ খ্রিস্টান হাবশীরা কাবার ওপর কর্তৃত্ব করতে পারল না, যদিও কাবার বাসিন্দারা তখন ছিল মূর্তিপূজক! কারণ আল্লাহ সমগ্র পৃথিবীকে (তৎকালীন দুই পরাশক্তি রোম ও পারস্যকে) জানিয়ে দিলেন যে, এই সেই ঘর যাকে আল্লাহ পবিত্রতা ও তাঁর সর্বশেষ নবীর আবির্ভাবের কেন্দ্রবিন্দু হিসেবে মনোনীত করেছেন।'
                      : 'A profound theological insight from the book highlights: Jerusalem was overrun twice (586 BC by Babylonians, 70 CE by Romans) when its residents were believers. Yet Christian Habashah was pulverized at the gates of Makkah despite its residents being idolaters! Allah did this to showcase the supreme sanctuary to global empires, preparing the stage for the final Prophet ﷺ.'}
                  </p>
                </div>
              )}

              {/* Special Deep-Dive Highlight Box 4: 100 Camels & 3-Fold Verification */}
              {station.id === 'abdullah_ransom_100_camels' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 space-y-3">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-amber-700" />
                    <span>{isBn ? '১০ বারে ১০০ উট ও ৩ বার অতিরিক্ত নিশ্চিতকরণ' : '100 Camels & 3 Extra Verification Draws'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {isBn
                      ? '১০ম বারে যখন ১০০ উটের নাম উঠল, তখন কুরাইশরা আনন্দে মেতে উঠল। কিন্তু আবদুল মুত্তালিব বললেন—"না, যতক্ষণ না আমি ৩ বার নিশ্চিত হব ততক্ষণ আমি থামব না।" তিনি আরও ৩ বার লটারি দিলেন এবং প্রতিবারই তীরের নাম উটের ওপর উঠল! এরপর তিনি ১০০ উট কুরবানী করে সমস্ত মানুষ ও জীবজন্তুর জন্য গোশত উন্মুক্ত করে দেন। এর মাধ্যমে আরবে প্রচলিত রক্তপণ ১০ থেকে ১০০ উটে স্থায়ীভাবে উন্নীত হয়।'
                      : 'When 100 camels were drawn on the 10th round, Quraysh rejoiced. But Abdul Muttalib insisted on absolute certainty, repeating the draw three more times. Every draw selected the camels! He slaughtered the 100 camels freely for all inhabitants and wildlife, permanently fixing blood money at 100 camels.'}
                  </p>
                </div>
              )}

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

          {/* Tab 2: The 10 Sons & 6 Daughters of Abdul Muttalib (Uncles & Aunts) */}
          {activeTab === 'family_circle' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    {isBn ? 'আবদুল মুত্তালিবের সন্তানবর্গ: ১০ পুত্র ও ৬ কন্যা' : 'The Children of Abdul Muttalib (10 Sons & 6 Daughters)'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isBn
                      ? 'রাসূলে কারীম ﷺ-এর আপন চাচা ও ফুফুদের বিস্তারিত ঐতিহাসিক পরিচয়।'
                      : 'The direct paternal uncles and aunts of Prophet Muhammad ﷺ.'}
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-300 shrink-0">
                  <button
                    onClick={() => setChildFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      childFilter === 'all' ? 'bg-amber-700 text-white' : 'text-slate-600 hover:bg-amber-100'
                    }`}
                  >
                    {isBn ? 'সকল (১৬)' : 'All (16)'}
                  </button>
                  <button
                    onClick={() => setChildFilter('son')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      childFilter === 'son' ? 'bg-amber-700 text-white' : 'text-slate-600 hover:bg-amber-100'
                    }`}
                  >
                    {isBn ? '১০ পুত্র (চাচা)' : '10 Sons'}
                  </button>
                  <button
                    onClick={() => setChildFilter('daughter')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      childFilter === 'daughter' ? 'bg-amber-700 text-white' : 'text-slate-600 hover:bg-amber-100'
                    }`}
                  >
                    {isBn ? '৬ কন্যা (ফুফু)' : '6 Daughters'}
                  </button>
                </div>
              </div>

              {/* Grid of Children Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredChildren.map((child) => (
                  <div
                    key={child.id}
                    className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          child.gender === 'son'
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'bg-rose-100 text-rose-900 border border-rose-200'
                        }`}>
                          {child.gender === 'son' ? (isBn ? 'পুত্র (চাচা)' : 'Son (Uncle)') : (isBn ? 'কন্যা (ফুফু)' : 'Daughter (Aunt)')}
                        </span>
                        <span className="text-xs font-serif text-amber-900 font-bold" dir="rtl">
                          {child.nameAr}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-amber-950 font-bengali">
                        {isBn ? child.nameBn : child.nameEn}
                      </h4>

                      <p className="text-[11px] text-amber-800 font-semibold mb-1">
                        {isBn ? child.relationBn : child.relationEn}
                      </p>

                      {child.titleBn && (
                        <p className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1.5 border border-emerald-200">
                          {isBn ? child.titleBn : child.titleEn}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-snug pt-2 border-t border-amber-100 mt-1">
                      {isBn ? child.fameBn : child.fameEn}
                    </p>

                    {child.islamicEraNoteBn && (
                      <p className="text-[10px] text-emerald-700 italic mt-1 font-medium">
                        ✨ {isBn ? child.islamicEraNoteBn : child.islamicEraNoteEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
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

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-300">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-amber-800" />
                  <h4 className="font-bold text-sm text-amber-950">
                    {isBn
                      ? 'আর-রাহীকুল মাখতূম (পৃষ্ঠা ৮৯–৯৮)-এর মূল সনদ ও পাদটীকাসমূহ'
                      : 'Authentic Footnotes & Classical Citations (Ar-Raheeq Al-Makhtum Pages 89-98)'}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isBn
                    ? "এ অধ্যায়ের প্রতিটি ঘটনা, বংশের নাম এবং ঐতিহাসিক বিবরণ মূল কিতাবের পাদটীকা [৮৩] থেকে [৯৭] অনুসারে প্রামাণ্য সীরাত গ্রন্থ (ইবনে হিশাম, তারীখে তাবারী, তাবাকাতে ইবনে সা'দ ও সহীহ মুসলিম) থেকে উদ্ধৃত।"
                    : "Every historical event, pedigree node, and narration in this chapter is strictly sourced from Footnotes [83] to [97] of Ar-Raheeq Al-Makhtum, referencing Ibn Hisham, Tarikh al-Tabari, Tabaqat Ibn Sa'd, and Sahih Muslim."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHAPTER_2_DATA.allFootnotes.map((fn) => (
                  <div
                    key={fn.id}
                    className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow-xs">
                          {isBn ? `পাদটীকা [${fn.id}]` : `Footnote [${fn.id}]`}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {isBn ? fn.pageBn : fn.pageEn}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-snug mb-2 font-bengali">
                        {isBn ? fn.topicBn : fn.topicEn}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-100 flex items-start gap-1.5 text-[11px] text-amber-900 font-medium">
                      <Scroll className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{isBn ? fn.citationBn : fn.citationEn}</span>
                    </div>
                  </div>
                ))}
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
