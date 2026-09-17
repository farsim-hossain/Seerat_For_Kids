'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CHAPTER_1_SECTION_3_DATA } from '@/data/chapter1Data';
import { EventBus, GAME_EVENTS } from '@/game/EventBus';

interface ReligiousHistoryModalProps {
  stationId: string | null;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const ReligiousHistoryModal: React.FC<ReligiousHistoryModalProps> = ({
  stationId,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'station' | 'religions' | 'society'>('station');

  if (!stationId) return null;

  const station = CHAPTER_1_SECTION_3_DATA.stations.find((s) => s.id === stationId);
  const isBn = lang === 'bn';

  // Map station ID to generated image path
  const getImageForStation = (id: string) => {
    switch (id) {
      case 'hubal_idols':
        return '/assets/images/hubal_idol_sanctuary.jpg';
      case 'azlam_arrows':
        return '/assets/images/azlam_divination_arrows.jpg';
      case 'animal_superstition':
        return '/assets/images/ukaz_marketplace_trade.jpg';
      case 'noble_character':
      default:
        return '/assets/images/pre_islamic_reformation.jpg';
    }
  };

  const handleUnlockJournal = () => {
    EventBus.emit(GAME_EVENTS.JOURNAL_UPDATED, {
      type: 'religious_station',
      id: stationId,
      titleBn: station?.nameBn,
      titleEn: station?.nameEn,
    });
    EventBus.emit(GAME_EVENTS.CELEBRATE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header Hero Image */}
        <div className="relative h-36 sm:h-48 w-full shrink-0 overflow-hidden">
          <Image
            src={getImageForStation(stationId)}
            alt={station ? (isBn ? station.nameBn : station.nameEn) : 'Pre-Islamic Heritage'}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-slate-900/80 text-white hover:bg-rose-600 rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold border border-white/20 transition-all z-10"
          >
            ✕
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6">
            <span className="inline-block px-2.5 py-0.5 bg-amber-500/90 text-slate-950 font-bold text-[10px] sm:text-xs rounded-full mb-1 sm:mb-2 uppercase tracking-wide">
              {isBn ? 'পর্ব ১.৩ • ধর্ম, সমাজ ও চারিত্রিক সংস্কার' : 'Section 1.3 • Religion, Society & Moral Reform'}
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-amber-200 flex items-center gap-2">
              <span>{station?.icon}</span>
              <span className="truncate">{station ? (isBn ? station.nameBn : station.nameEn) : ''}</span>
            </h2>
          </div>
        </div>

        {/* Navigation Tabs inside Modal (Scrollable on Mobile) */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-3 sm:px-6 gap-1 sm:gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab('station')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'station'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? '📌 মূল ঘটনা' : '📌 Core History'}
          </button>
          <button
            onClick={() => setActiveTab('religions')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'religions'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? '📜 অন্যান্য ধর্মাবলম্বী' : '📜 Religions in Arabia'}
          </button>
          <button
            onClick={() => setActiveTab('society')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'society'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? '🌟 সমাজ ও চারিত্রিক স্তম্ভ' : '🌟 Society & Character'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'station' && station && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 text-amber-100">
                <h3 className="font-bold text-amber-400 text-base mb-1">
                  {isBn ? 'সারসংক্ষেপ:' : 'Summary:'}
                </h3>
                <p className="text-slate-200">{isBn ? station.summaryBn : station.summaryEn}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-100 text-base">
                  {isBn ? 'বিস্তারিত ঐতিহাসিক ঘটনা ও শিক্ষণীয় সত্য:' : 'Historical Narrative & Core Facts:'}
                </h3>
                <p className="whitespace-pre-line text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                  {isBn ? station.descBn : station.descEn}
                </p>
              </div>

              {stationId === 'hubal_idols' && (
                <div className="bg-slate-800/70 rounded-xl p-4 border border-amber-500/20 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">
                    {isBn ? 'কাবার প্রাক-ইসলামী ৩টি প্রধান মূর্তি:' : 'The 3 Major Idol Shrines of Arabia:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    <li>
                      <strong className="text-amber-200">আল-লাত (Al-Lat):</strong> {isBn ? 'তায়েফে ছকীফ গোত্রের প্রতিষ্ঠিত শ্বেত পাথরের মূর্তি।' : 'White stone shrine in Ta\'if worshipped by Banu Thaqif.'}
                    </li>
                    <li>
                      <strong className="text-amber-200">আল-উয্যা (Al-Uzza):</strong> {isBn ? 'মক্কার নিকটবর্তী নাখলা উপত্যকার বিশাল খেজুর গাছের মূর্তি।' : 'Sacred trees shrine in Nakhla valley worshipped by Quraish.'}
                    </li>
                    <li>
                      <strong className="text-amber-200">মানাত (Manat):</strong> {isBn ? 'লোহিত সাগরের তীরে কুদাইদ এলাকায় আউস ও খাযরাজ গোত্রের মূর্তি।' : 'Coastal shrine near Kudayd worshipped by Aws and Khazraj.'}
                    </li>
                  </ul>
                </div>
              )}

              {stationId === 'azlam_arrows' && (
                <div className="bg-slate-800/70 rounded-xl p-4 border border-amber-500/20 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">
                    {isBn ? 'আজলামের কুসংস্কার নিরসন ও ইসলামী বিকল্প:' : 'Abolition of Azlam & Islamic Alternative:'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isBn
                      ? 'জাহেলী আরবরা ভাগ্য জানার জন্য হুবালের তীরের আশ্রয় নিত। ইসলাম এ জাতীয় সকল কুসংস্কার নিষিদ্ধ করে আল্লাহর দরবারে সরাসরি সালাতুল ইস্তিখারা আদায় ও তাওয়াক্কুলের হুকুম দিয়েছে।'
                      : 'Islam replaced the pagan gambling arrow ritual with Istikharah prayer—seeking Allah\'s direct guidance and putting full trust in Divine wisdom.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'religions' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-800/70 p-4 rounded-xl border border-sky-500/30 space-y-2">
                <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                  <span>✡️</span>
                  <span>{isBn ? 'ইহুদি ধর্ম ও আসহাবুল উখদুদ (নাজরান)' : 'Judaism & Martyrs of the Ditch'}</span>
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'ব্যাবিলনীয় ও রোমান তাড়নার পর ইহুদিরা হিজায ও ইয়াসরিবে (খাইবার, বনু কুরাইযা, বনু নাযীর) বসতি স্থাপন করে। ইয়েমেনের ইহুদি রাজা ইউসুফ জুনুওয়াস নাজরানের খ্রিষ্টানদের অগ্নিকুণ্ডে পুড়িয়ে হত্যা করেছিল, যার উল্লেখ সূরা বুরুজে (আসহাবুল উখদুদ) রয়েছে।'
                    : 'Following Babylonian and Roman persecutions, Jews settled in Yathrib and Khaybar. In Yemen, Jewish King Dhu Nuwas burned Christians of Najran in fiery trenches, recorded in Surah Al-Buruj (Ashab al-Ukhdud).'}
                </p>
              </div>

              <div className="bg-slate-800/70 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                  <span>✝️</span>
                  <span>{isBn ? 'খ্রিষ্টধর্ম ও আবরাহার ক্বুল্লাইস গির্জা' : 'Christianity & Abrahah\'s Cathedral'}</span>
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'হাবশার (আবিসিনিয়া) হস্তী শাসক আবরাহা ইয়েমেনের সানআ-তে ‘আল-ক্বুল্লাইস’ নামে স্বর্ণখচিত বিশাল গির্জা নির্মাণ করে আরবদের কাবার বদলে সেখানে হজ্জ করতে বাধ্য করতে চেয়েছিল। এতে ব্যর্থ হয়ে সে কাবা ধ্বংসের উদ্দেশ্যে হস্তীবাহিনী নিয়ে যাত্রা করে এবং সূরা ফিলে বর্ণিত আবাবীল পাখির কঙ্কর নিক্ষেপে ধ্বংস হয়।'
                    : 'Abrahah, Abyssinian viceroy of Yemen, built the magnificent Al-Qullays cathedral in Sanaa to divert Arab pilgrimage from the Ka\'bah. His subsequent elephant campaign to demolish the Ka\'bah ended in divine destruction described in Surah Al-Fil.'}
                </p>
              </div>

              <div className="bg-slate-800/70 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                  <span>🔥</span>
                  <span>{isBn ? 'মাজূসী (অগ্নিপূজা) ও সাবিয়ীন' : 'Zoroastrianism & Sabians'}</span>
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'পারস্যের সীমান্ত লাগোয়া বাহরাইন, হজর ও আরব উপসাগরীয় অঞ্চলে পারসিক অগ্নিপূজা (মাজূসী) প্রচলিত ছিল। এছাড়া ইরাক সীমান্তে তারক পূজারি সাবিয়ীন সম্প্রদায়ের উপস্থিতি ছিল।'
                    : 'Zoroastrian fire worship prevailed near Persian border regions (Bahrain, Hajar). Astrological star-worshipping Sabians inhabited Iraqi border areas.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'society' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-800/70 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <h3 className="font-bold text-rose-300 text-base flex items-center gap-2">
                  <span>💍</span>
                  <span>{isBn ? 'জাহেলী বিবাহ বনাম পবিত্র ইসলামী নিকাহ' : 'Jahiliyyah Marriages vs Pure Islamic Nikah'}</span>
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'হযরত আয়েশা (রা.) থেকে বর্ণিত, প্রাক-ইসলামী আরবে ৪ প্রকার বিবাহ প্রচলিত ছিল, যার মধ্যে ৩টিই ছিল নীতিভ্রষ্ট প্রথা। ইসলাম এসে সকল প্রকার ব্যভিচার ও পঙ্কিলতা বিলুপ্ত করে কেবল সম্মানিত অভিভাবক ও মহরানার মাধ্যমে পবিত্র ইসলামী বিবাহের বিধান জারি করে।'
                    : 'As narrated by Lady Aisha (RA), pre-Islamic Arabia practiced 4 types of marital unions, 3 of which were corrupt. Islam outlawed all immoral practices, establishing pure Nikah based on guardian consent and rightful mahr.'}
                </p>
              </div>

              <div className="bg-slate-800/70 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                  <span>🌟</span>
                  <span>{isBn ? 'আরবদের ৪টি প্রশংসনীয় মহৎ স্বভাব' : 'The 4 Noble Arab Character Pillars'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-300 block mb-1">
                      {isBn ? '১. অসীম মেহমানদারী (Hospitality)' : '1. Legendary Hospitality'}
                    </strong>
                    {isBn ? 'শীতের রাতে নিজের একমাত্র উট জবাই করে মেহমানকে খাওয়ানো ছিল তাদের গর্ব।' : 'Sacrificing their sole camel on a freezing night to feed a traveling guest was their pride.'}
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-300 block mb-1">
                      {isBn ? '২. ওয়াদা রক্ষা (Keeping Covenants)' : '2. Keeping Covenants'}
                    </strong>
                    {isBn ? 'জীবনের বিনিময়ে হলেও অঙ্গীকার রক্ষা করা এবং আশ্রিতকে রক্ষা করা।' : 'Fulfilling promises and protecting refugees even at the cost of their own lives.'}
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-300 block mb-1">
                      {isBn ? '৩. অসীম বীরত্ব (Bravery)' : '3. Unyielding Bravery'}
                    </strong>
                    {isBn ? 'অন্যায়ের সামনে মাথা নত না করা এবং সাহসিকতা প্রদর্শন।' : 'Unflinching courage, self-respect, and defense of tribe and honor.'}
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-300 block mb-1">
                      {isBn ? '৪. আমানতদারী ও সততা (Trustworthiness)' : '4. Absolute Trustworthiness'}
                    </strong>
                    {isBn ? 'কথা ও কাজে সত্যবাদী থাকা—যে আমানতদারীর চূড়ান্ত রূপ ছিলেন আমাদের রসূল ﷺ।' : 'Truthfulness in speech and custody of trusts, perfectly embodied by Prophet Muhammad ﷺ.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={handleUnlockJournal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-950 flex items-center gap-2"
          >
            <span>📜</span>
            <span>{isBn ? 'জার্নালে শিক্ষা যুক্ত করুন' : 'Save to Seerah Journal'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-950"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
