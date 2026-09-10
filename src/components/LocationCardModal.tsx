'use client';

import { LocationPoint } from '../data/chapter1Data';
import { X, BookOpen, Compass, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LocationCardModalProps {
  location: LocationPoint | null;
  onClose: () => void;
  onSaveToJournal: (loc: LocationPoint) => void;
  isSaved: boolean;
  lang: 'bn' | 'en';
}

export default function LocationCardModal({
  location,
  onClose,
  onSaveToJournal,
  isSaved,
  lang,
}: LocationCardModalProps) {
  if (!location) return null;

  const isBn = lang === 'bn';

  const handleSave = () => {
    onSaveToJournal(location);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-400 rounded-3xl p-6 shadow-2xl text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Arabic & Main Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
              {isBn ? location.nameEn : location.nameBn}
            </span>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-bold text-amber-950 font-bengali">
                {isBn ? location.nameBn : location.nameEn}
              </h2>
              <span className="text-xl font-arabic text-emerald-800 font-semibold">
                {location.nameAr}
              </span>
            </div>
          </div>
        </div>

        {/* Short Summary */}
        <div className="bg-amber-100/70 border border-amber-300/80 rounded-xl p-3 mb-4 text-amber-900 font-medium text-sm">
          {isBn ? location.summaryBn : location.summaryEn}
        </div>

        {/* Story Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-base">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>{isBn ? 'ঐতিহাসিক কাহিনী ও ঘটনা:' : 'Historical Narration & Context:'}</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm bg-white/80 p-3 rounded-xl border border-amber-200">
            {isBn ? location.storyBn : location.storyEn}
          </p>
        </div>

        {/* Moral Lesson */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-900 font-bold text-base">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'আমাদের জন্য নৈতিক শিক্ষা:' : 'Moral & Character Lesson:'}</span>
          </div>
          <div className="bg-emerald-50/80 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-sm font-medium">
            {isBn ? location.lessonBn : location.lessonEn}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow transition ${
              isSaved
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-white'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>
              {isSaved
                ? isBn
                  ? 'জার্নালে সংরক্ষিত ✓'
                  : 'Saved to Journal ✓'
                : isBn
                ? 'সীরাহ জার্নালে যোগ করো'
                : 'Add to Seerah Journal'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
