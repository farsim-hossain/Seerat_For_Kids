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
  ShieldCheck,
  Award,
  BookMarked,
  Layers,
  Baby,
} from 'lucide-react';
import {
  CHAPTER_2_SECTION_2_DATA,
  Chapter2Section2Station,
} from '../data/chapter2Section2Data';

interface Chapter2Section2DetailModalProps {
  stationId: string | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  onSaveToJournal: (item: { id: string; titleBn: string; titleEn: string; category: string }) => void;
  initialTab?: 'narrative' | 'children' | 'treaties' | 'lesson' | 'sources';
}

export default function Chapter2Section2DetailModal({
  stationId,
  isOpen,
  onClose,
  lang,
  onSaveToJournal,
  initialTab = 'narrative',
}: Chapter2Section2DetailModalProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'children' | 'treaties' | 'lesson' | 'sources'>(initialTab);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab, stationId]);

  if (!isOpen || !stationId) return null;

  const station: Chapter2Section2Station =
    CHAPTER_2_SECTION_2_DATA.stations.find((s) => s.id === stationId) ||
    CHAPTER_2_SECTION_2_DATA.stations[0];

  const isBn = lang === 'bn';

  const handleSave = () => {
    onSaveToJournal({
      id: station.id,
      titleBn: station.titleBn,
      titleEn: station.titleEn,
      category: 'Chapter 2.2: Birth & Life Before Nabuwwat',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const getArtworkSrc = (key: string) => {
    switch (key) {
      case 'banu_sad_desert_pasture':
        return '/assets/images/banu_sad_desert_pasture.jpg';
      case 'busra_syria_monastery':
        return '/assets/images/busra_syria_monastery.jpg';
      case 'hilf_al_fudul_gathering_hall':
        return '/assets/images/hilf_al_fudul_gathering_hall.jpg';
      case 'kabah_reconstruction_ancient':
        return '/assets/images/kabah_reconstruction_ancient.jpg';
      case 'makkah_night_sanctuary':
        return '/assets/images/makkah_night_sanctuary.jpg';
      default:
        return '/assets/images/makkah_valley_day.jpg';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Header Banner with Artwork Preview */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden flex-shrink-0">
          <img
            src={getArtworkSrc(station.imageKey)}
            alt={station.titleEn}
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-amber-300 hover:text-white hover:bg-amber-600/80 border border-amber-500/30 transition-all z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Station Badge & Titles */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {isBn ? station.agePeriodBn : station.agePeriodEn}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-200 tracking-wide drop-shadow-md">
                {isBn ? station.titleBn : station.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 italic">
                {isBn ? station.taglineBn : station.taglineEn}
              </p>
            </div>

            {/* Save to Journal Action */}
            <button
              onClick={handleSave}
              disabled={saved}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border shadow-lg ${
                saved
                  ? 'bg-emerald-600/90 text-white border-emerald-400'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 hover:scale-105'
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  {isBn ? 'জার্নালে সংরক্ষিত!' : 'Saved to Journal!'}
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  {isBn ? 'জার্নালে সেভ করুন' : 'Save to Journal'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-500/20 bg-slate-950/60 px-4 gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'narrative'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            {isBn ? 'ঐতিহাসিক বিবরণ' : 'Detailed Narrative'}
          </button>

          <button
            onClick={() => setActiveTab('children')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'children'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Baby className="w-4 h-4 text-emerald-400" />
            {isBn ? 'সন্তান-সন্ততি (৬ জন)' : 'Children (6)'}
          </button>

          <button
            onClick={() => setActiveTab('treaties')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'treaties'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scroll className="w-4 h-4 text-sky-400" />
            {isBn ? 'চুক্তি ও স্থাপত্য' : 'Treaties & Architecture'}
          </button>

          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'lesson'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            {isBn ? 'চারিত্রিক শিক্ষা' : 'Character Lesson'}
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-400" />
            {isBn ? 'প্রামাণ্য রেফারেন্স' : 'Authentic Sources'}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto flex-grow space-y-5 text-sm leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-amber-600/40">
          
          {/* TAB 1: NARRATIVE */}
          {activeTab === 'narrative' && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  {isBn ? 'ঐতিহাসিক পটভূমি' : 'Historical Context'}
                </h4>
                <p className="whitespace-pre-line text-slate-200 text-sm sm:text-base leading-relaxed">
                  {isBn ? station.historicalContextBn : station.historicalContextEn}
                </p>
                
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-4 mb-2">
                  {isBn ? 'ঘটনার বিস্তারিত বিবরণ' : 'Detailed Narrative'}
                </h4>
                <p className="whitespace-pre-line text-slate-200 text-sm sm:text-base leading-relaxed">
                  {isBn ? station.narrativeSummaryBn : station.narrativeSummaryEn}
                </p>
              </div>

              {/* Arabic Poetry Box if available */}
              {station.arabicPoetry && (
                <div className="bg-amber-950/30 p-4 rounded-xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs uppercase tracking-wider">
                    <Quote className="w-4 h-4 text-amber-400" />
                    {isBn ? 'আরবি কাব্যগাঁথা' : 'Original Arabic Poetry'}
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-amber-500/20 space-y-1">
                    {station.arabicPoetry.arabic.map((line, idx) => (
                      <p key={idx} className="text-right font-serif text-base sm:text-lg text-amber-200 leading-loose" dir="rtl">
                        {line}
                      </p>
                    ))}
                    <p className="text-xs text-amber-100/90 font-medium mt-2 pt-2 border-t border-amber-500/20">
                      {isBn ? station.arabicPoetry.bengali : station.arabicPoetry.english}
                    </p>
                  </div>
                </div>
              )}

              {/* Hadith / Quote Box if available */}
              {station.hadithOrQuoteBn && (
                <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider">
                    <Quote className="w-4 h-4 text-emerald-400" />
                    {isBn ? 'হাদিস ও প্রামাণ্য বাণী' : 'Hadith & Sourced Statement'}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed italic">
                    "{isBn ? station.hadithOrQuoteBn : station.hadithOrQuoteEn}"
                  </p>
                </div>
              )}

              {/* Key Bullet Highlights */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {isBn ? 'ঐতিহাসিক গুরুত্বপূর্ণ পয়েন্ট' : 'Historical Highlights'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(isBn ? station.keyEventsBn : station.keyEventsEn).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHILDREN OF PROPHET MUHAMMAD (PBUH) */}
          {activeTab === 'children' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/30 p-4 rounded-xl border border-emerald-500/30">
                <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                  <Baby className="w-5 h-5 text-emerald-400" />
                  {isBn
                    ? 'উম্মুল মুমিনীন খাদীজার (রা.) গর্ভে জন্ম নেওয়া সন্তানগণ'
                    : 'Children Born to Lady Khadijah (R.A.)'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isBn
                    ? 'রাসূলুল্লাহ ﷺ-এর সকল সন্তান উম্মুল মুমিনীন খাদীজার (রা.) গর্ভেই জন্মগ্রহণ করেন, কেবল ইবরাহীম ব্যতীত (যাঁর মাতা ছিলেন মারিয়া আল-কিবতিয়া রা.)। সকল পুত্র শৈশবেই ইনতিকাল করেন। চার কন্যা ইসলাম গ্রহণ করেন, হিজরত করেন এবং ফাতিমা (রা.) ব্যতীত সকলেই রাসূলুল্লাহ ﷺ-এর জীবদ্দশায় ইনতিকাল করেন।'
                    : 'All children of the Prophet ﷺ were born to Lady Khadijah (R.A.), except Ibrahim (whose mother was Maria al-Qibtiyyah). All sons passed away in early childhood. All four daughters embraced Islam and migrated; only Fatimah (R.A.) survived him, passing away six months later.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHAPTER_2_SECTION_2_DATA.prophetChildren.map((c) => (
                  <div
                    key={c.id}
                    className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 font-bold">
                        {c.birthOrder}. {isBn ? c.nameBn : c.nameEn}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          c.gender === 'son'
                            ? 'bg-sky-950/80 text-sky-300 border border-sky-500/30'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {c.gender === 'son' ? (isBn ? 'পুত্র' : 'Son') : isBn ? 'কন্যা' : 'Daughter'}
                      </span>
                    </div>
                    <p className="font-serif text-sm text-amber-200/90 text-right" dir="rtl">
                      {c.nameAr}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isBn ? c.biographyBn : c.biographyEn}
                    </p>
                    <p className="text-[11px] text-amber-400/90 italic">
                      {isBn ? c.passingNoteBn : c.passingNoteEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Note on Ibrahim (R.A.) */}
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <span className="text-amber-400 font-bold">জ্ঞাতব্য:</span>
                <span>
                  {isBn
                    ? 'সপ্তম সন্তান ইবরাহীম (রা.) মদিনার জীবনে মারিয়া আল-কিবতিয়া (রা.)-এর গর্ভে জন্মগ্রহণ করেন এবং শৈশবেই ইনতিকাল করেন।'
                    : 'The seventh child, Ibrahim (R.A.), was born during the Madinah era to Maria al-Qibtiyyah (R.A.) and passed away in infancy.'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: TREATIES & KA'BAH ARCHITECTURE */}
          {activeTab === 'treaties' && (
            <div className="space-y-4">
              {/* Hilf al-Fudul Justice Pact */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-sky-500/30 space-y-3">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                  <Scroll className="w-5 h-5 text-sky-400" />
                  {isBn ? 'হিলফুল ফুযূল (Hilf al-Fudul) শান্তিচুক্তি' : 'The League of the Virtuous (Hilf al-Fudul)'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn
                    ? 'জিলকদ মাসে আবদুল্লাহ ইবনু জাদ\'আনের গৃহে বনু হাশিম, বনু মুত্তালিব, বনু আসাদ, বনু জুহরাহ ও বনু তাইম গোত্র একত্র হয়। তারা শপথ করে: মক্কায় কোনো স্বদেশী বা বিদেশী নাগরিক জুলুমের শিকার হলে সকলে মিলে জালিমের বিরুদ্ধে দাঁড়াবে এবং মাজলুমের হক উদ্ধার করবে।'
                    : 'In Dhul-Qi\'dah at the house of Abdullah ibn Jud\'an, Banu Hashim, Banu Muttalib, Banu Asad, Banu Zuhrah, and Banu Taym united in an alliance: they swore that no person in Makkah, whether native or foreigner, would suffer oppression without everyone standing together to restore justice.'}
                </p>
                <div className="bg-slate-950/70 p-3 rounded-lg border border-sky-500/20 text-xs">
                  <p className="font-serif text-sm text-sky-200 text-right mb-1" dir="rtl">
                    «لَقَدْ شَهِدْتُ فِي دَارِ عَبْدِ اللهِ بْنِ جُدْعَانَ حِلْفًا مَا أُحِبُّ أَنَّ لِي بِهِ حُمْرَ النَّعَمِ، وَلَوْ أُدْعَى بِهِ فِي الإِسْلاَمِ لأَجَبْتُ»
                  </p>
                  <p className="text-amber-300 font-medium">
                    {isBn
                      ? 'রাসূলুল্লাহ ﷺ বলেন: "আমি আবদুল্লাহ ইবনু জাদ\'আনের গৃহে এমন এক চুক্তিতে উপস্থিত ছিলাম, যার বিনিময়ে আমাকে লাল উট দেওয়া হলেও পছন্দ করব না; আর ইসলামের যুগেও যদি এরূপে আহ্বান জানানো হয়, তবে আমি তাতে সাড়া দেব।"'
                      : 'The Prophet ﷺ said: "I witnessed a pact at the house of Abdullah ibn Jud\'an that I would not exchange for red camels; and if I were invited to it in Islam, I would readily respond."'}
                  </p>
                </div>
              </div>

              {/* Ka'bah Reconstruction Dimensions */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Layers className="w-5 h-5 text-amber-400" />
                  {isBn ? '৩৫ খ্রিষ্টাব্দে কাবার স্থাপত্য ও পরিমাপ' : 'Ka\'bah Dimensions in 35 CE Reconstruction'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CHAPTER_2_SECTION_2_DATA.kabahDimensions.map((dim, idx) => (
                    <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-amber-400 font-bold">{isBn ? dim.labelBn : dim.labelEn}: </span>
                      <span className="text-slate-200">{isBn ? dim.valueBn : dim.valueEn}</span>
                      {dim.noteBn && (
                        <p className="text-[11px] text-slate-400 mt-1">{isBn ? dim.noteBn : dim.noteEn}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHARACTER LESSON */}
          {activeTab === 'lesson' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-rose-950/30 via-slate-900 to-amber-950/20 p-4 rounded-xl border border-rose-500/30">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-base mb-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  {isBn ? 'চারিত্রিক শিক্ষা ও আত্মিক প্রতিফলন' : 'Character Lesson & Reflection'}
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                  {isBn ? station.moralLessonBn : station.moralLessonEn}
                </p>
                <div className="bg-slate-950/70 p-3 rounded-lg border border-rose-500/20">
                  <span className="text-rose-400 font-bold text-xs uppercase tracking-wider block mb-1">
                    {isBn ? 'সীরাহ জার্নাল আনলক পদক:' : 'Seerah Journal Badge Reward:'}
                  </span>
                  <p className="text-xs text-rose-100 font-medium">
                    {isBn ? station.journalUnlockBn : station.journalUnlockEn}
                  </p>
                </div>
              </div>

              {/* Moral Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <div className="text-xl">🤝</div>
                  <div className="font-bold text-amber-300">{isBn ? 'ইনসাফ ও আমানত' : 'Integrity & Trust'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'ব্যবসা ও কর্মক্ষেত্রে শতভাগ বিশ্বস্ততা' : '100% honesty in business'}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <div className="text-xl">🕊️</div>
                  <div className="font-bold text-emerald-300">{isBn ? 'শান্তিপূর্ণ সমাধান' : 'Peacemaking'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'সংঘাত পরিহার করে সবার সম্মান রক্ষা' : 'Resolving conflict honorably'}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <div className="text-xl">🛡️</div>
                  <div className="font-bold text-sky-300">{isBn ? 'নৈতিক আত্মমর্যাদা' : 'Moral Guard'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'অসৎ প্রথা ও পাপাচার থেকে পবিত্রতা' : 'Staying clean from vices'}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AUTHENTIC SOURCES & FOOTNOTES */}
          {activeTab === 'sources' && (
            <div className="space-y-3">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {isBn ? 'আর-রাহীকুল মাখতূম প্রামাণ্য গ্রন্থ ও পৃষ্ঠা' : 'Ar-Raheeq Al-Makhtum References'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isBn ? CHAPTER_2_SECTION_2_DATA.meta.sourceBookBn : CHAPTER_2_SECTION_2_DATA.meta.sourceBookEn}
                  </p>
                </div>
                <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {isBn ? 'অধ্যায়ের প্রাসঙ্গিক টীকা ও হাদিসসূত্র' : 'Relevant Footnotes & Hadith Citations'}
                </h5>
                <div className="space-y-1.5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 pr-1">
                  {station.footnotes.map((fnStr, idx) => {
                    const fnNum = parseInt(fnStr, 10);
                    const fn = CHAPTER_2_SECTION_2_DATA.allFootnotes.find((f) => f.id === fnNum);
                    if (!fn) {
                      return (
                        <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs">
                          <span className="text-amber-400 font-bold">[{fnStr}]</span>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={fn.id}
                        className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs flex items-start gap-2"
                      >
                        <span className="text-amber-400 font-bold flex-shrink-0">[{fn.id}]</span>
                        <div className="space-y-0.5">
                          <p className="text-slate-300">{isBn ? fn.citationBn : fn.citationEn}</p>
                          <p className="text-[11px] text-slate-500 italic">
                            বিষয়: {isBn ? fn.topicBn : fn.topicEn} • পৃষ্ঠা: {isBn ? fn.pageBn : fn.pageEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="px-5 py-3 bg-slate-950 border-t border-amber-500/20 flex items-center justify-between flex-shrink-0 text-xs">
          <div className="text-slate-400">
            {isBn ? 'পর্ব ২.২: শুভ জন্ম ও নবুওয়ত-পূর্ব ৪০ বছর' : 'Section 2.2: Birth & 40 Years'}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
