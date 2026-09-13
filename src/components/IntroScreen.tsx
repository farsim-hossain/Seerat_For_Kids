'use client';

import React from 'react';
import { Compass, Sparkles, Landmark, Scroll, ChevronRight, Languages, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntroScreenProps {
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onStartJourney: (sectionId?: '1.1' | '1.2') => void;
}

export default function IntroScreen({ lang, onToggleLang, onStartJourney }: IntroScreenProps) {
  const isBn = lang === 'bn';

  const handleStart = (sectionId: '1.1' | '1.2' = '1.1') => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    onStartJourney(sectionId);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Top Navbar */}
      <header className="flex items-center justify-between bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border-2 border-amber-300 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-bold shadow">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              {isBn ? 'শিশুদের জন্য সীরাত' : 'Seerah for Young Explorers'}
            </span>
            <h2 className="text-base sm:text-lg font-black text-amber-950 font-bengali leading-none">
              {isBn ? 'সীরাত ফর কিডস' : 'Seerat For Kids'}
            </h2>
          </div>
        </div>

        {/* Language Switcher */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm border border-amber-300 transition shadow-sm"
        >
          <Languages className="w-4 h-4 text-amber-800" />
          <span>{isBn ? 'English' : 'বাংলা'}</span>
        </button>
      </header>

      {/* Hero Body */}
      <div className="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        {/* Sacred Notice Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>
            {isBn
              ? 'আর-রাহীকুল মাখতূম কিতাবের বিশুদ্ধ তথ্যের আলোকে তৈরি'
              : 'Faithfully derived from the authentic book Ar-Raheeq Al-Makhtum'}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-amber-950 font-bengali tracking-tight leading-tight mb-4 max-w-3xl">
          {isBn ? (
            <>
              রাসূলুল্লাহ <span className="text-amber-600">ﷺ</span>-এর সোনালী ইতিহাসে স্বাগতম
            </>
          ) : (
            <>
              Discover the Blessed Journey of Prophet Muhammad <span className="text-amber-600">ﷺ</span>
            </>
          )}
        </h1>

        <p className="text-slate-700 text-sm sm:text-lg max-w-2xl font-medium font-bengali mb-8 leading-relaxed">
          {isBn
            ? 'মরুভূমির প্রাচীন ভূগোল, অলৌকিক যমযম কূপ, কাবার ভিত্তি স্থাপন থেকে শুরু করে মক্কার ঐতিহ্যবাহী দারুন নদওয়া ও রাজবংশের এক রোমাঞ্চকর শিক্ষামূলক সীরাত যাত্রা।'
            : 'An interactive discovery journey exploring the ancient desert fortress of Arabia, the miracle of Zamzam, the foundations of the Ka\'bah, and the historic council of Dar al-Nadwah.'}
        </p>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-10 text-left">
          {/* Section 1.1 Card */}
          <div
            onClick={() => handleStart('1.1')}
            className="group relative bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border-2 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                {isBn ? 'পর্ব ১.১' : 'Part 1.1'}
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-amber-950 mb-1 font-bengali">
              {isBn ? 'আরবের মাটি, জাতি ও কাবার অভ্যুদয়' : 'Land, Peoples & Sacred Ka\'bah'}
            </h3>
            <p className="text-xs text-slate-600 font-bengali mb-4">
              {isBn
                ? 'আরবের মানচিত্র, তিন আরব জাতি, যমযমের অলৌকিক ধারা ও ইবরাহীম (আ.)-এর পদচিহ্ন।'
                : 'Interactive Arabia map, the 3 Arab origins, the Zamzam spring, and building the Ka\'bah.'}
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-amber-900">
              <span>{isBn ? 'এই পর্বে প্রবেশ করো' : 'Enter this section'}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Section 1.2 Card */}
          <div
            onClick={() => handleStart('1.2')}
            className="group relative bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border-2 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {isBn ? 'পর্ব ১.২' : 'Part 1.2'}
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <Landmark className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-amber-950 mb-1 font-bengali">
              {isBn ? 'আরবের রাজবংশ ও মক্কার প্রশাসন' : 'Kingdoms & The Council of Makkah'}
            </h3>
            <p className="text-xs text-slate-600 font-bengali mb-4">
              {isBn
                ? 'দারুন নদওয়ার ঐতিহাসিক সভাকক্ষ, কুরাইশের ৭টি সংসদীয় দায়িত্ব ও যী কারের বিজয়।'
                : 'Dar al-Nadwah assembly, Mecca\'s 7 administrative portfolios, and client kingdoms.'}
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
              <span>{isBn ? 'এই পর্বে প্রবেশ করো' : 'Enter this section'}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Big Glow CTA Button */}
        <button
          onClick={() => handleStart('1.1')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 font-bengali border border-amber-300"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span>{isBn ? 'যাত্রা শুরু করো' : 'Start the Journey'}</span>
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1.5" />
        </button>
      </div>

      {/* Sacred Rule Notice Footer */}
      <footer className="text-center text-xs text-slate-500 font-medium py-3 border-t border-amber-200/80 mt-6">
        {isBn
          ? 'নির্দেশনা: রাসূলুল্লাহ ﷺ-এর কোনো কাল্পনিক চিত্র বা অবয়ব অঙ্কন করা হয় না। এখানে আমরা শিশু ইতিহাসবিদ ও শিক্ষার্থী হিসেবে ইতিহাস ও নৈতিক শিক্ষা অর্জন করি।'
          : 'Notice: Prophet Muhammad ﷺ is never visually depicted. Learners explore as respectful young historians.'}
      </footer>
    </div>
  );
}
