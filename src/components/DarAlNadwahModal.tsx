'use client';

import React, { useState } from 'react';
import {
  X,
  Landmark,
  Droplet,
  Utensils,
  Key,
  Flag,
  MessageSquare,
  Scale,
  Compass,
  Coins,
  Shield,
  Award,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CHAPTER_1_SECTION_2_DATA, GovernancePortfolio, ChieftainPrivilege } from '../data/chapter1Data';

interface DarAlNadwahModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  initialPortfolioId?: string | null;
}

export default function DarAlNadwahModal({
  isOpen,
  onClose,
  lang,
  initialPortfolioId,
}: DarAlNadwahModalProps) {
  const [activeTab, setActiveTab] = useState<'portfolios' | 'chieftain' | 'dhiqar'>('portfolios');
  const [selectedPortfolio, setSelectedPortfolio] = useState<GovernancePortfolio>(
    CHAPTER_1_SECTION_2_DATA.portfolios.find((p) => p.id === initialPortfolioId) ||
      CHAPTER_1_SECTION_2_DATA.portfolios[0]
  );
  const [selectedPrivilege, setSelectedPrivilege] = useState<ChieftainPrivilege>(
    CHAPTER_1_SECTION_2_DATA.chieftainPrivileges[0]
  );

  React.useEffect(() => {
    if (initialPortfolioId) {
      const found = CHAPTER_1_SECTION_2_DATA.portfolios.find((p) => p.id === initialPortfolioId);
      if (found) {
        setSelectedPortfolio(found);
        setActiveTab('portfolios');
      }
    }
  }, [initialPortfolioId, isOpen]);

  if (!isOpen) return null;

  const isBn = lang === 'bn';

  const getPortfolioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-sky-600" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'Key':
        return <Key className="w-5 h-5 text-yellow-600" />;
      case 'Flag':
        return <Flag className="w-5 h-5 text-rose-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-purple-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-600" />;
      default:
        return <Landmark className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-4 sm:p-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/30 border border-amber-300 flex items-center justify-center text-amber-200">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                {isBn ? 'দারুন নদওয়া ও প্রাচীন প্রশাসন' : 'Dar al-Nadwah & Governance'}
              </span>
              <h2 className="text-lg sm:text-2xl font-black font-bengali">
                {isBn ? 'মক্কার সংসদ ও কুরাইশের প্রশাসনিক দায়িত্ব' : 'The Council of Makkah & Quraysh Portfolios'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            title="Close / বন্ধ করুন"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-amber-200 bg-amber-50/70 px-4 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('portfolios')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm font-bengali transition flex items-center gap-2 border-t-2 border-x-2 ${
              activeTab === 'portfolios'
                ? 'bg-white border-amber-300 text-amber-950 shadow-sm'
                : 'border-transparent text-amber-800 hover:text-amber-950'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{isBn ? 'কুরাইশের ৭টি প্রশাসনিক বিভাগ' : '7 Portfolios of Quraysh'}</span>
          </button>

          <button
            onClick={() => setActiveTab('chieftain')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm font-bengali transition flex items-center gap-2 border-t-2 border-x-2 ${
              activeTab === 'chieftain'
                ? 'bg-white border-amber-300 text-amber-950 shadow-sm'
                : 'border-transparent text-amber-800 hover:text-amber-950'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>{isBn ? 'সর্দারের ৪টি গনীমতের হিস্যা' : '4 Chieftain Privileges'}</span>
          </button>

          <button
            onClick={() => setActiveTab('dhiqar')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm font-bengali transition flex items-center gap-2 border-t-2 border-x-2 ${
              activeTab === 'dhiqar'
                ? 'bg-white border-amber-300 text-amber-950 shadow-sm'
                : 'border-transparent text-amber-800 hover:text-amber-950'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{isBn ? 'যী কারের যুদ্ধ (ঐতিহাসিক বিজয়)' : 'Battle of Dhi Qar'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-bengali">
          {/* TAB 1: 7 Portfolios of Quraysh */}
          {activeTab === 'portfolios' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Column: Portfolio Selector */}
              <div className="md:col-span-5 space-y-2 max-h-[55vh] overflow-y-auto pr-1">
                {CHAPTER_1_SECTION_2_DATA.portfolios.map((portfolio) => {
                  const isSelected = selectedPortfolio.id === portfolio.id;
                  return (
                    <div
                      key={portfolio.id}
                      onClick={() => setSelectedPortfolio(portfolio)}
                      className={`p-3 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 shadow-md'
                          : 'border-slate-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center shadow-xs">
                        {getPortfolioIcon(portfolio.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-950 truncate">
                            {isBn ? portfolio.nameBn : portfolio.nameEn}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {isBn ? portfolio.clanBn : portfolio.clanEn}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Active Portfolio Details */}
              <div className="md:col-span-7 bg-amber-50/50 rounded-2xl border-2 border-amber-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center">
                        {getPortfolioIcon(selectedPortfolio.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-700 block">
                          {selectedPortfolio.nameAr}
                        </span>
                        <h3 className="text-lg font-black text-amber-950">
                          {isBn ? selectedPortfolio.nameBn : selectedPortfolio.nameEn}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Clan Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-xl text-xs font-bold text-amber-900 mb-4 border border-amber-300">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>
                      {isBn ? 'যিম্মাদার গোত্র:' : 'Custodial Clan:'}{' '}
                      <strong>{isBn ? selectedPortfolio.clanBn : selectedPortfolio.clanEn}</strong>
                    </span>
                  </div>

                  {/* Description */}
                  <div className="space-y-3 text-slate-700 text-sm leading-relaxed mb-4">
                    <p className="font-semibold text-amber-900">
                      {isBn ? selectedPortfolio.summaryBn : selectedPortfolio.summaryEn}
                    </p>
                    <p>{isBn ? selectedPortfolio.detailsBn : selectedPortfolio.detailsEn}</p>
                  </div>
                </div>

                {/* Educational Note */}
                <div className="mt-4 p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? 'কুসাই বিন কিলাব এই বিভাগগুলো বণ্টন করে মক্কায় রক্তপাত রোধ করেছিলেন এবং একটি শৃঙ্খলাবদ্ধ নাগরিক প্রশাসনিক ব্যবস্থা গড়ে তুলেছিলেন।'
                      : 'By establishing these civic portfolios, Qusayy bin Kilab unified competing clans and maintained peace during holy pilgrimage seasons.'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 4 Chieftain Privileges (Spoils) */}
          {activeTab === 'chieftain' && (
            <div className="space-y-6">
              <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-4 text-sm text-slate-800">
                <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-700" />
                  <span>
                    {isBn
                      ? 'জাহেলী যুগে আরবের গোত্রপ্রধানদের ৪টি একচেটিয়া অধিকার'
                      : 'The 4 Monopoly Shares of Pre-Islamic Chieftains'}
                  </span>
                </h4>
                <p className="text-xs text-slate-700">
                  {isBn
                    ? 'যুদ্ধশেষে সাধারণ যোদ্ধাদের মাঝে সম্পদ বণ্টনের পূর্বে গোত্রপ্রধানরা এই ৪টি সুবিধা বাধ্যতামূলকভাবে গ্রহণ করত। ইসলাম পরবর্তীতে এই শোষণমূলক ব্যবস্থা বাতিল করে ইনসাফ প্রতিষ্ঠা করে।'
                    : 'Before distributing spoils among soldiers, tribal chieftains claimed these four preferential shares. Islam later abolished this unjust hierarchy.'}
                </p>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHAPTER_1_SECTION_2_DATA.chieftainPrivileges.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border-2 border-amber-200 bg-white hover:border-amber-400 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {item.nameAr}
                      </span>
                      <span className="text-xs font-bold text-amber-700 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                        {isBn ? item.shareBn : item.shareEn}
                      </span>
                    </div>
                    <h4 className="font-bold text-amber-950 text-base mb-1">
                      {isBn ? item.nameBn : item.nameEn}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isBn ? item.descriptionBn : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Poem Citation from 1b. Arab.md */}
              <div className="p-4 bg-slate-900 text-amber-100 rounded-2xl text-xs space-y-2 font-mono">
                <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                  {isBn ? 'আরবি কবিতার ঐতিহাসিক প্রমাণ:' : 'Historical Poetry Evidence:'}
                </span>
                <p className="text-sm text-center text-amber-200 font-serif">
                  لَكَ الْمِرْبَاعُ فِيهَا وَالصَّفَايَا ... وَحُكْمُكَ وَالنَّشِيطَةُ وَالْفُضُولُ
                </p>
                <p className="text-slate-300 text-center italic text-xs">
                  {isBn
                    ? '“আমাদের মধ্য থেকে তোমার জন্য গনীমতের মালের এক চতুর্থাংশ (মিরবা‘) ও নির্বাচিত সম্পদ (সফী)... আর রাস্তায় পাওয়া হিস্যা (নাশীতাহ) এবং উদ্বৃত্ত অংশ (ফুযূল)।”'
                    : '"For you is the quarter (Mirba‘) and the choice pick (Safi)... the transit portion (Nashitah) and the surplus remainder (Fudul).'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Battle of Dhi Qar */}
          {activeTab === 'dhiqar' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {isBn ? 'ইতিহাসের প্রথম বিজয়' : 'Historic First Victory'}
                    </span>
                    <h3 className="text-lg font-bold text-amber-950">
                      {isBn ? 'যী কারের যুদ্ধ (Battle of Dhi Qar)' : 'The Battle of Dhi Qar'}
                    </h3>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                  <p>
                    {isBn
                      ? 'হীরার শেষ লখমী রাজা নুমান বিন মুনযির যখন পারস্যের সম্রাট কিসরার ক্ষোভের শিকার হন, তখন তিনি গোপনে বনু শায়বানের প্রধান হানী বিন মাসউদের কাছে নিজের পরিবার ও অস্ত্র-সম্পদ আমানত রেখে যান। কিসরা নুমানকে কারারুদ্ধ করে হত্যা করে এবং হানী বিন মাসউদের কাছে আমানত দাবি করে।'
                      : 'When the Lakhmid king Nu\'man bin Munzir was summoned by the Persian Emperor Khosrow, he entrusted his family, weapons, and wealth to Hani bin Mas\'ud, chieftain of Banu Shayban. Khosrow executed Nu\'man and demanded the surrender of the entrusted goods.'}
                  </p>
                  <p>
                    {isBn
                      ? 'হানী বিন মাসউদ আমানত ফেরত দিতে দৃঢ়ভাবে অস্বীকার করেন এবং সম্মান রক্ষার স্বার্থে যুদ্ধ বেছে নেন। এর ফলে পারস্যের পরাক্রমশালী নিয়মিত সেনাদলের সাথে আরব গোত্রগুলোর ‘যী কার’ প্রান্তরে তুমুল যুদ্ধ হয়।'
                      : 'Hani bin Mas\'ud refused to betray his trust. The Persian Emperor dispatched an imperial army to crush the Arabs. At Dhi Qar, Arab tribes united under Banu Shayban and routed the imperial Persian forces.'}
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-amber-300 text-amber-950 font-bold text-xs">
                    🌟{' '}
                    {isBn
                      ? 'তাৎপর্য: এটিই ছিল পৃথিবীর ইতিহাসে প্রথম দিন যেদিন আরবরা সম্মিলিতভাবে পারস্য সাম্রাজ্যের বিশাল নিয়মিত সেনাবাহিনীকে শোচনীয়ভাবে পরাজিত করে।'
                      : 'Significance: This was the first day in recorded history where Arab tribes united and defeated an imperial Sassanid Persian army.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-amber-200 p-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isBn
              ? 'আর-রাহীকুল মাখতূম • প্রাক-ইসলামিক আরবের সরকার ও প্রশাসন'
              : 'Ar-Raheeq Al-Makhtum • Pre-Islamic Government & Administration'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-sm font-bengali"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
