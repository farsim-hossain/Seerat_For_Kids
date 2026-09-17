'use client';

import { X, MapPin, Award, BookMarked, Sparkles, CheckCircle2 } from 'lucide-react';
import { LocationPoint, CHAPTER_1_DATA, CHAPTER_1_SECTION_2_DATA } from '../data/chapter1Data';

interface SeerahJournalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredLocations: LocationPoint[];
  tribesLearned: string[];
  quizPassed: boolean;
  score: number;
  lang: 'bn' | 'en';
}

export default function SeerahJournal({
  isOpen,
  onClose,
  discoveredLocations,
  tribesLearned,
  quizPassed,
  score,
  lang,
}: SeerahJournalProps) {
  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const totalLocations = CHAPTER_1_DATA.locations.length + CHAPTER_1_SECTION_2_DATA.locations.length;
  const totalTribes = CHAPTER_1_DATA.tribes.length;
  const progressPercent = Math.min(
    100,
    Math.round(
      ((discoveredLocations.length + tribesLearned.length + (quizPassed ? 2 : 0)) /
        (totalLocations + totalTribes + 2)) *
        100
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 border-l-4 border-amber-500 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between text-slate-800">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow">
                <BookMarked className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-950 font-bengali">
                  {isBn ? 'আমার সীরাহ জার্নাল' : 'My Seerah Journal'}
                </h2>
                <p className="text-xs font-semibold text-amber-700 tracking-wide uppercase">
                  {isBn ? 'সীরাহ অভিযাত্রা • ১ম অধ্যায়' : 'Seerah Journey • Chapter 1'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Overview Bar */}
          <div className="my-5 bg-white/90 border border-amber-200 p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2 text-sm font-bold text-amber-950">
              <span>{isBn ? 'অধ্যায় অগ্রগতি (Journey Progress)' : 'Chapter Progress'}</span>
              <span className="text-amber-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-amber-100/80 border border-amber-300 p-3 rounded-xl flex items-center gap-3">
              <MapPin className="w-6 h-6 text-amber-600" />
              <div>
                <div className="text-xl font-extrabold text-amber-950">
                  {discoveredLocations.length} / {totalLocations}
                </div>
                <div className="text-xs text-amber-800 font-medium">
                  {isBn ? 'আবিষ্কৃত স্থান' : 'Places Discovered'}
                </div>
              </div>
            </div>
            <div className="bg-emerald-100/80 border border-emerald-300 p-3 rounded-xl flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="text-xl font-extrabold text-emerald-950">
                  {tribesLearned.length} / {totalTribes}
                </div>
                <div className="text-xs text-emerald-800 font-medium">
                  {isBn ? 'গোত্রধারা অন্বেষণ' : 'Tribal Branches'}
                </div>
              </div>
            </div>
          </div>

          {/* Discovered Locations Badges */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{isBn ? 'সংগৃহীত স্থানের ব্যাজসমূহ:' : 'Collected Landmark Badges:'}</span>
            </h3>
            {discoveredLocations.length === 0 ? (
              <p className="text-xs text-slate-500 italic bg-white/60 p-3 rounded-xl border border-dashed border-amber-300 text-center">
                {isBn
                  ? 'মানচিত্রের বিভিন্ন পিনে ট্যাপ করে স্থানের ব্যাজ সংগ্রহ করো!'
                  : 'Tap pins on the map to collect historical discovery badges!'}
              </p>
            ) : (
              <div className="space-y-2">
                {discoveredLocations.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center justify-between p-2.5 bg-white/80 border border-amber-200 rounded-xl text-xs font-semibold text-amber-950"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? loc.nameBn : loc.nameEn}</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px]">
                      {isBn ? loc.unlockedJournalItemBn : loc.unlockedJournalItemEn}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Moral Lesson Cards */}
          <div className="space-y-3 mb-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 p-3.5 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                🌟 {isBn ? 'পর্ব ১.১ এর শিক্ষা: তাওয়াক্কুল (আল্লাহর ওপর ভরসা)' : 'Part 1.1: Tawakkul (Trust in Allah)'}
              </div>
              <div className="text-sm font-extrabold text-emerald-950 mb-1 font-bengali">
                {isBn ? CHAPTER_1_DATA.moralLesson.traitBn : CHAPTER_1_DATA.moralLesson.traitEn}
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {isBn
                  ? CHAPTER_1_DATA.moralLesson.storyContextBn
                  : CHAPTER_1_DATA.moralLesson.storyContextEn}
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-3.5 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                👑 {isBn ? 'পর্ব ১.২ এর শিক্ষা: আমানতদারী ও সেবামূলক নেতৃত্ব' : 'Part 1.2: Servant Leadership & Trust'}
              </div>
              <div className="text-sm font-extrabold text-amber-950 mb-1 font-bengali">
                {isBn ? CHAPTER_1_SECTION_2_DATA.moralLesson.traitBn : CHAPTER_1_SECTION_2_DATA.moralLesson.traitEn}
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {isBn
                  ? CHAPTER_1_SECTION_2_DATA.moralLesson.storyContextBn
                  : CHAPTER_1_SECTION_2_DATA.moralLesson.storyContextEn}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 p-3.5 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider mb-1">
                🏺 {isBn ? 'পর্ব ১.৩ এর শিক্ষা: তাওহীদের সুরক্ষা ও ৪ মহৎ স্বভাব' : 'Part 1.3: Monotheism & Noble Character'}
              </div>
              <div className="text-sm font-extrabold text-purple-950 mb-1 font-bengali">
                {isBn ? 'তাওহীদ, সত্যবাদিতা, ওয়াদা রক্ষা ও অসীম দানশীলতা' : 'Pure Monotheism, Truthfulness & Generosity'}
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                {isBn
                  ? 'মূর্তিপূজা ও কুসংস্কারের পঙ্কিলতা পরিহার করে বিশুদ্ধ একত্ববাদ প্রতিষ্ঠা করা এবং মানবীয় মহৎ গুণাবলী দিয়ে সমাজ পুনর্গঠন।'
                  : 'Rejecting idolatry and superstitions while upholding pure monotheism, honesty, covenant-keeping, and noble character.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-amber-200 text-center text-xs text-slate-500 font-medium">
          {isBn
            ? 'সীরাতুন নবী ﷺ • শিশুদের ইন্টারঅ্যাক্টিভ শিক্ষামূলক সফর'
            : 'Seerat for Kids • An Interactive Journey into Sacred History'}
        </div>
      </div>
    </div>
  );
}
