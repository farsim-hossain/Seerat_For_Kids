'use client';

import { X, MapPin, Award, BookMarked, Sparkles, CheckCircle2, Scroll, Heart } from 'lucide-react';
import { LocationPoint, CHAPTER_1_DATA, CHAPTER_1_SECTION_2_DATA } from '../data/chapter1Data';
import { CHAPTER_2_DATA } from '../data/chapter2Data';
import { CHAPTER_2_SECTION_2_DATA } from '../data/chapter2Section2Data';

export interface JournalItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: string;
}

interface SeerahJournalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredLocations: LocationPoint[];
  chapter2DiscoveredStations?: JournalItem[];
  tribesLearned: string[];
  quizPassed: boolean;
  score: number;
  lang: 'bn' | 'en';
}

export default function SeerahJournal({
  isOpen,
  onClose,
  discoveredLocations,
  chapter2DiscoveredStations = [],
  tribesLearned,
  quizPassed,
  score,
  lang,
}: SeerahJournalProps) {
  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const totalLocations = CHAPTER_1_DATA.locations.length + CHAPTER_1_SECTION_2_DATA.locations.length;
  const totalTribes = CHAPTER_1_DATA.tribes.length;
  const totalChapter2Stations = CHAPTER_2_DATA.stations.length + CHAPTER_2_SECTION_2_DATA.stations.length;

  const totalPossible = totalLocations + totalTribes + totalChapter2Stations + 2;
  const totalEarned = discoveredLocations.length + tribesLearned.length + chapter2DiscoveredStations.length + (quizPassed ? 2 : 0);
  const progressPercent = Math.min(100, Math.round((totalEarned / totalPossible) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 border-l-4 border-amber-500 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between text-slate-800 font-bengali">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow">
                <BookMarked className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-950">
                  {isBn ? 'আমার সীরাহ জার্নাল' : 'My Seerah Journal'}
                </h2>
                <p className="text-xs font-semibold text-amber-700 tracking-wide uppercase">
                  {isBn ? 'সীরাহ অভিযাত্রা • ১ম ও ২য় অধ্যায়' : 'Seerah Journey • Chapters 1 & 2'}
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
              <span>{isBn ? 'সামগ্রিক অগ্রগতি (Total Progress)' : 'Overall Progress'}</span>
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
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-amber-100/80 border border-amber-300 p-2.5 rounded-xl flex flex-col items-center text-center">
              <MapPin className="w-5 h-5 text-amber-600 mb-1" />
              <div className="text-base font-extrabold text-amber-950">
                {discoveredLocations.length} / {totalLocations}
              </div>
              <div className="text-[10px] text-amber-800 font-medium">
                {isBn ? '১ম অধ্যায় স্থান' : 'Ch. 1 Places'}
              </div>
            </div>

            <div className="bg-emerald-100/80 border border-emerald-300 p-2.5 rounded-xl flex flex-col items-center text-center">
              <Sparkles className="w-5 h-5 text-emerald-600 mb-1" />
              <div className="text-base font-extrabold text-emerald-950">
                {tribesLearned.length} / {totalTribes}
              </div>
              <div className="text-[10px] text-emerald-800 font-medium">
                {isBn ? 'গোত্রধারা' : 'Tribes'}
              </div>
            </div>

            <div className="bg-orange-100/80 border border-orange-300 p-2.5 rounded-xl flex flex-col items-center text-center">
              <Scroll className="w-5 h-5 text-orange-600 mb-1" />
              <div className="text-base font-extrabold text-orange-950">
                {chapter2DiscoveredStations.length} / {totalChapter2Stations}
              </div>
              <div className="text-[10px] text-orange-800 font-medium">
                {isBn ? '২য় অধ্যায় পর্ব' : 'Ch. 2 Stations'}
              </div>
            </div>
          </div>

          {/* Chapter 2 Badges */}
          {chapter2DiscoveredStations.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-orange-600" />
                <span>{isBn ? '২য় অধ্যায়ের অর্জিত জ্ঞান কার্ডসমূহ:' : 'Chapter 2 Knowledge Cards:'}</span>
              </h3>
              <div className="space-y-1.5">
                {chapter2DiscoveredStations.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 bg-white border border-orange-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isBn ? item.titleBn : item.titleEn}</span>
                    </div>
                    <span className="bg-orange-100 text-orange-900 text-[10px] px-2 py-0.5 rounded-full shrink-0">
                      {isBn ? 'অধ্যায় ২' : 'Ch 2'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? 'পর্ব ২.২ এর শিক্ষা: আল-আমীন ও মাজলুমের পাশে দাঁড়ানো' : 'Part 2.2: Al-Amin & Championing Justice'}</span>
              </div>
              <div className="text-sm font-extrabold text-emerald-950 mb-1">
                {isBn ? 'সততা, আমানতদারি ও হিলফুল ফুযূলের ন্যায়পরায়ণতা' : 'Trustworthiness, Integrity & Peacemaking'}
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {isBn
                  ? 'হিলফুল ফুযূলের শপথ ও কাবার বিবাদ মীমাংসায় রাসূলুল্লাহ ﷺ-এর প্রজ্ঞা আমাদের শেখায় কীভাবে সব দলমত নির্বিশেষে মাজলুমের অধিকার প্রতিষ্ঠা ও রক্তপাত বন্ধে ভূমিকা রাখতে হয়।'
                  : 'The oath of Hilf al-Fudul and the Ka’bah stone reconciliation teach us how to defend the oppressed and resolve conflicts peacefully with wisdom.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-orange-300 p-3.5 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold text-orange-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-600" />
                <span>{isBn ? 'পর্ব ২.১ এর শিক্ষা: আনুগত্য, প্রতিশ্রুতি ও তাকদির' : 'Part 2.1: Obedience & Destiny'}</span>
              </div>
              <div className="text-sm font-extrabold text-orange-950 mb-1">
                {isBn ? 'পিতামাতার আনুগত্য, প্রতিশ্রুতি রক্ষা ও আল্লাহর কুদরতে বিশ্বাস' : 'Filial Piety, Keeping Covenants & Trust in God'}
              </div>
              <p className="text-xs text-orange-900 leading-relaxed">
                {isBn
                  ? 'আবদুল্লাহর পিতার প্রতি পরম আনুগত্য এবং আল্লাহর কুদরতে কাবার অলৌকিক সুরক্ষা আমাদের শেখায় সংকটের মুহূর্তে সৎ চরিত্র ও আল্লাহর ওপর অবিচল ভরসা রাখা।'
                  : 'Abdullah’s unquestioning filial devotion and the miraculous preservation of the Ka’bah teach us steadfast moral character and absolute reliance on Allah.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 p-3.5 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                🌟 {isBn ? 'পর্ব ১.১ এর শিক্ষা: তাওয়াক্কুল (আল্লাহর ওপর ভরসা)' : 'Part 1.1: Tawakkul (Trust in Allah)'}
              </div>
              <div className="text-sm font-extrabold text-emerald-950 mb-1">
                {isBn ? CHAPTER_1_DATA.moralLesson.traitBn : CHAPTER_1_DATA.moralLesson.traitEn}
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {isBn
                  ? CHAPTER_1_DATA.moralLesson.storyContextBn
                  : CHAPTER_1_DATA.moralLesson.storyContextEn}
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
