'use client';

import React from 'react';
import { Sparkles, ChevronRight, Languages, BookOpen, ShieldCheck, Lock, Map, UserCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntroScreenProps {
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onStartJourney: (sectionId?: '1.1' | '1.2' | '1.3') => void;
}

export default function IntroScreen({ lang, onToggleLang, onStartJourney }: IntroScreenProps) {
  const isBn = lang === 'bn';

  const handleStartChapter = (sectionId: '1.1' | '1.2' | '1.3' = '1.1') => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    onStartJourney(sectionId);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between p-4 sm:p-8 max-w-5xl mx-auto">
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
      <div className="my-auto py-8 sm:py-10 flex flex-col items-center text-center">
        {/* Sacred Notice Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>
            {isBn
              ? 'আর-রাহীকুল মাখতূম কিতাবের প্রামাণ্য তথ্যের আলোকে নির্মিত'
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

        {/* Hero Artwork Banner */}
        <div className="w-full max-w-3xl aspect-[21/8] rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl mb-10 relative group">
          <img
            src="/assets/images/intro_hero_banner.jpg"
            alt="Ancient Arabia Landscape Banner"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-amber-950/20 to-transparent flex items-end p-4 sm:p-6">
            <span className="text-white font-bold text-xs sm:text-sm font-bengali bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {isBn ? '✨ আরবের ঐতিহাসিক ভূখণ্ডের সচিত্র অভিজ্ঞতা' : '✨ Illustrated Historic Arabia Realm'}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN CHAPTERS LIST (MAIN SECTIONS ONLY) */}
        {/* ============================================================== */}
        <div className="w-full max-w-3xl space-y-4 mb-8 text-left">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-base sm:text-lg font-black text-amber-950 font-bengali flex items-center gap-2">
              <Map className="w-5 h-5 text-amber-600" />
              <span>{isBn ? 'সীরাতের প্রধান অধ্যায়সমূহ (Main Chapters):' : 'Main Seerah Chapters:'}</span>
            </h2>
            <span className="text-xs text-amber-800 font-medium">
              {isBn ? 'অধ্যায় চয়ন করে যাত্রা শুরু করো' : 'Select a Chapter to Enter'}
            </span>
          </div>

          {/* Chapter 1 Card: Arab (প্রাক-ইসলামী আরব) */}
          <div
            onClick={() => handleStartChapter('1.1')}
            className="group relative bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border-3 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
                {isBn ? '১' : '1'}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {isBn ? 'অধ্যায় ১' : 'Chapter 1'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {isBn ? '৩টি পর্ব উপলব্ধ' : '3 Sub-sections Available'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-amber-950 font-bengali group-hover:text-amber-600 transition-colors">
                  {isBn ? '১. প্রাক-ইসলামী আরব (Arabia)' : '1. Pre-Islamic Arabia (Arab)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bengali mt-1 max-w-lg leading-relaxed">
                  {isBn
                    ? 'আরবের ভূগোল, তিন গোত্রধারা, যমযমের অলৌকিক প্রবাহ, কাবার নির্মাণ, দারুন নদওয়া ও সমাজ সংস্কারের ইন্টারঅ্যাক্টিভ মানচিত্র।'
                    : 'Interactive exploration of Arabian geography, tribal lineages, Zamzam, Ka\'bah foundations, Dar al-Nadwah council & moral reform.'}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all group-hover:shadow-lg shrink-0">
              <span>{isBn ? 'অধ্যায় শুরু করো' : 'Explore Chapter 1'}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Chapter 2 Card: Prophet Muhammad PBUH - Birth & Youth (Locked / Coming Soon) */}
          <div className="bg-slate-900/60 border-2 border-dashed border-amber-400/30 rounded-3xl p-5 sm:p-6 opacity-85 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center font-black text-2xl border border-amber-500/30 shrink-0">
                {isBn ? '২' : '2'}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                    {isBn ? 'অধ্যায় ২' : 'Chapter 2'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    <Lock className="w-3 h-3" />
                    <span>{isBn ? 'শীঘ্রই আসছে' : 'Coming Soon'}</span>
                  </span>
                </div>

                <h3 className="text-lg font-black text-amber-200 font-bengali">
                  {isBn ? '২. রাসূলুল্লাহ ﷺ-এর পবিত্র জন্ম ও শৈশব' : '2. Prophet Muhammad (PBUH) - Blessed Birth & Youth'}
                </h3>
                <p className="text-xs text-slate-300 font-bengali mt-1 max-w-lg leading-relaxed">
                  {isBn
                    ? 'আমুল ফীল (হস্তী বছর), হালিমা সাদিয়াহ (রা.)-এর স্নেহচ্ছায়া, বক্ষ বিদারণ ও শৈশবের পবিত্র ইতিহাস।'
                    : 'The Year of the Elephant, fosterage with Halimah (RA), and early life of the Prophet ﷺ.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Big Glow CTA Button */}
        <button
          onClick={() => handleStartChapter('1.1')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 font-bengali border border-amber-300"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span>{isBn ? '১ম অধ্যায়ে প্রবেশ করো' : 'Enter Chapter 1'}</span>
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
