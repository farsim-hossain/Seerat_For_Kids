'use client';

import { useState } from 'react';
import { X, GitFork, Users, Sparkles, ChevronRight, Check, Award } from 'lucide-react';
import { CHAPTER_1_DATA, TribeNode } from '../data/chapter1Data';
import { CHAPTER_2_DATA } from '../data/chapter2Data';

interface LineageTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTribeLearned: (tribeId: string) => void;
  learnedTribes: string[];
  lang: 'bn' | 'en';
  defaultTab?: 'groups' | 'prophet_lineage' | 'ancestors_21';
}

export default function LineageTreeModal({
  isOpen,
  onClose,
  onTribeLearned,
  learnedTribes,
  lang,
  defaultTab = 'groups',
}: LineageTreeModalProps) {
  const [activeTab, setActiveTab] = useState<'groups' | 'prophet_lineage' | 'ancestors_21'>(defaultTab);
  const [selectedTribe, setSelectedTribe] = useState<TribeNode>(CHAPTER_1_DATA.tribes[0]);

  if (!isOpen) return null;

  const isBn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-amber-50 to-orange-50 border-3 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col text-slate-800 overflow-hidden font-bengali">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-amber-200 pb-3">
          <div className="p-2.5 sm:p-3 bg-amber-600 text-white rounded-2xl shadow">
            <GitFork className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-amber-950 font-bengali">
              {isBn ? 'আরব জাতিগোষ্ঠী ও রাসুলুল্লাহ ﷺ-এর পবিত্র বংশধারা' : 'Arab Tribes & The Blessed Lineage'}
            </h2>
            <p className="text-[11px] sm:text-xs font-semibold text-amber-700 tracking-wider uppercase">
              {isBn ? 'আর-রাহীকুল মাখতূম অনুযায়ী প্রামাণ্য নসবনামা' : 'Authentic Genealogies from Ar-Raheeq Al-Makhtum'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 sm:gap-2 mb-4 bg-amber-200/70 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
              activeTab === 'groups'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isBn ? 'আরবের ৩ জাতিগোষ্ঠী' : '3 Arab Groups'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prophet_lineage')}
            className={`flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
              activeTab === 'prophet_lineage'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBn ? 'নির্বাচিত নসবধারা' : 'Chosen Lineage'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ancestors_21')}
            className={`flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
              activeTab === 'ancestors_21'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isBn ? '২১ পুরুষ (আদনান পর্যন্ত)' : '21 Ancestors (to Adnan)'}</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'groups' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHAPTER_1_DATA.tribes.map((tribe) => {
                const isSelected = selectedTribe.id === tribe.id;
                const isLearned = learnedTribes.includes(tribe.id);

                return (
                  <div
                    key={tribe.id}
                    onClick={() => {
                      setSelectedTribe(tribe);
                      onTribeLearned(tribe.id);
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-amber-500 shadow-md scale-[1.01]'
                        : 'bg-white/70 border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {tribe.nameAr}
                        </span>
                        {isLearned && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                            <Check className="w-3 h-3" />
                            {isBn ? 'শেখা হয়েছে' : 'Learned'}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-amber-950 mb-1">
                        {isBn ? tribe.nameBn : tribe.nameEn}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {isBn ? tribe.descriptionBn : tribe.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-amber-200">
                      <div className="text-[11px] font-bold text-amber-800 mb-1">
                        {isBn ? 'উল্লেখযোগ্য শাখা গোত্রসমূহ:' : 'Key Clans & Branches:'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(isBn ? tribe.keySubClansBn : tribe.keySubClansEn).map((clan, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-200/80 text-amber-900 text-[10px] px-2 py-0.5 rounded-md font-medium"
                          >
                            {clan}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeTab === 'prophet_lineage' ? (
            <div className="bg-white/90 p-5 rounded-2xl border border-amber-200 shadow-sm">
              <div className="text-center mb-6">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {isBn
                    ? 'ইবরাহীম (আ.) থেকে সাইয়েদুনা মুহাম্মাদ ﷺ পর্যন্ত'
                    : 'From Ibrahim (AS) to Sayyiduna Muhammad ﷺ'}
                </span>
                <h3 className="text-lg font-bold text-amber-950 mt-2 font-bengali">
                  {isBn
                    ? 'নির্বাচিত ও পবিত্র বংশধারা (The Chosen Pure Lineage)'
                    : 'The Chosen & Preserved Noble Lineage'}
                </h3>
                <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1 leading-relaxed">
                  {isBn
                    ? '“আল্লাহ তাআলা ইবরাহীম (আ.)-এর সন্তানদের মধ্য থেকে ইসমাঈলকে, ইসমাঈলের সন্তান থেকে কেনানাকে, কেনানা থেকে কুরাইশকে, কুরাইশ থেকে বনু হাশিমকে এবং বনু হাশিম থেকে আমাকে মনোনীত করেছেন।” (সহীহ মুসলিম)'
                    : '"Verily Allah chose Ismail from the sons of Ibrahim, and He chose Banu Kinana from the sons of Ismail, and He chose Quraysh from Banu Kinana, and He chose Banu Hashim from Quraysh, and He chose me from Banu Hashim." (Sahih Muslim)'}
                </p>
              </div>

              {/* Step Flow List */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {CHAPTER_1_DATA.lineagePath.map((node, index) => {
                  const isProphet = index === CHAPTER_1_DATA.lineagePath.length - 1;
                  const isRoot = index === 0;

                  return (
                    <div key={index} className="flex items-center">
                      <div
                        className={`p-2.5 rounded-xl border text-center transition-transform hover:scale-105 ${
                          isProphet
                            ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg ring-2 ring-emerald-400'
                            : isRoot
                            ? 'bg-amber-600 border-amber-700 text-white shadow-md'
                            : 'bg-amber-50 border-amber-300 text-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold font-bengali">
                          {isBn ? node.nameBn : node.nameEn}
                        </div>
                        <div
                          className={`text-[10px] ${
                            isProphet || isRoot ? 'text-amber-100' : 'text-slate-500'
                          }`}
                        >
                          {isBn ? node.roleBn : node.roleEn}
                        </div>
                      </div>

                      {!isProphet && (
                        <ChevronRight className="w-4 h-4 text-amber-500 mx-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 21 Ancestors Tab (Adnan to Muhammad ﷺ) from Chapter 2 */
            <div className="space-y-4">
              <div className="bg-amber-100/70 p-3.5 rounded-2xl border border-amber-300 text-center">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  {isBn
                    ? 'রাসূলুল্লাহ ﷺ থেকে আদনান পর্যন্ত সর্বসম্মত প্রামাণ্য নসবনামা'
                    : 'The Unanimous Authenticated Lineage from Muhammad ﷺ to Adnan'}
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  {isBn
                    ? 'অধিকাংশ ঐতিহাসিক ও মুহাদ্দিসগণের মতে এ ২১ পুরুষের বিশুদ্ধতার ব্যাপারে কোনো সন্দেহ নেই (ইবনে হিশাম ১/১,২)।'
                    : 'All traditional scholars agree on the pristine authenticity of these 21 generations without dispute.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {CHAPTER_2_DATA.lineagePart1.map((ancestor) => (
                  <div
                    key={ancestor.generation}
                    className="p-3 bg-white/95 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          {isBn ? `পুরুষ ${ancestor.generation}` : `Gen ${ancestor.generation}`}
                        </span>
                        <span className="text-xs font-serif text-amber-900 font-bold" dir="rtl">
                          {ancestor.nameAr}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-amber-950 font-bengali">
                        {isBn ? ancestor.nameBn : ancestor.nameEn}
                      </h4>
                      {ancestor.titleBn && (
                        <p className="text-[11px] text-amber-700 font-medium italic mb-1">
                          {isBn ? ancestor.titleBn : ancestor.titleEn}
                        </p>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug pt-2 border-t border-amber-100 mt-1">
                      {isBn ? ancestor.significanceBn : ancestor.significanceEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
