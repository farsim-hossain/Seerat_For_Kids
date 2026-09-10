'use client';

import { useState } from 'react';
import { X, GitFork, Users, Sparkles, ChevronRight, Check } from 'lucide-react';
import { CHAPTER_1_DATA, TribeNode } from '../data/chapter1Data';

interface LineageTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTribeLearned: (tribeId: string) => void;
  learnedTribes: string[];
  lang: 'bn' | 'en';
}

export default function LineageTreeModal({
  isOpen,
  onClose,
  onTribeLearned,
  learnedTribes,
  lang,
}: LineageTreeModalProps) {
  const [activeTab, setActiveTab] = useState<'groups' | 'prophet_lineage'>('groups');
  const [selectedTribe, setSelectedTribe] = useState<TribeNode>(CHAPTER_1_DATA.tribes[0]);

  if (!isOpen) return null;

  const isBn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-500 rounded-3xl p-6 shadow-2xl flex flex-col text-slate-800 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-amber-200 pb-3">
          <div className="p-3 bg-amber-600 text-white rounded-2xl shadow">
            <GitFork className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-950 font-bengali">
              {isBn ? 'আরব জাতিগোষ্ঠী ও রাসুলুল্লাহ ﷺ-এর বংশধারা' : 'Arab Tribes & The Blessed Lineage'}
            </h2>
            <p className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
              {isBn ? 'ঐতিহাসিক বংশলতিকা অন্বেষণ' : 'Historical Genealogical Explorer'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-amber-200/60 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
              activeTab === 'groups'
                ? 'bg-amber-600 text-white shadow'
                : 'text-amber-900 hover:bg-amber-300/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isBn ? 'আরবের ৩টি প্রধান ধারা' : '3 Major Arab Branches'}</span>
          </button>
          <button
            onClick={() => setActiveTab('prophet_lineage')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
              activeTab === 'prophet_lineage'
                ? 'bg-amber-600 text-white shadow'
                : 'text-amber-900 hover:bg-amber-300/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBn ? 'রাসূলুল্লাহ ﷺ-এর পবিত্র পূর্বপুরুষগণ' : 'Forefathers of Prophet Muhammad ﷺ'}</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'groups' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHAPTER_1_DATA.tribes.map((tribe) => {
                const isLearned = learnedTribes.includes(tribe.id);
                const isCurrent = selectedTribe.id === tribe.id;

                return (
                  <div
                    key={tribe.id}
                    onClick={() => {
                      setSelectedTribe(tribe);
                      onTribeLearned(tribe.id);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-white border-amber-600 shadow-lg scale-[1.02]'
                        : 'bg-amber-100/60 border-amber-300/70 hover:bg-amber-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-arabic text-emerald-800 font-bold">
                          {tribe.nameAr}
                        </span>
                        {isLearned && (
                          <span className="p-1 bg-emerald-500 text-white rounded-full">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-amber-950 mb-1 font-bengali">
                        {isBn ? tribe.nameBn : tribe.nameEn}
                      </h3>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
