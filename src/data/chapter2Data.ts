export interface LineageAncestor {
  generation: number;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  titleBn?: string;
  titleEn?: string;
  significanceBn: string;
  significanceEn: string;
}

export interface Chapter2Station {
  id: string;
  titleBn: string;
  titleEn: string;
  titleAr?: string;
  taglineBn: string;
  taglineEn: string;
  imageKey: string;
  summaryBn: string;
  summaryEn: string;
  historicalContextBn: string;
  historicalContextEn: string;
  keyEventsBn: string[];
  keyEventsEn: string[];
  arabicPoetry?: {
    arabic: string[];
    bengali: string;
    english: string;
  };
  hadithOrQuoteBn?: string;
  hadithOrQuoteEn?: string;
  footnotes: string[];
  moralLessonBn: string;
  moralLessonEn: string;
  journalUnlockBn: string;
  journalUnlockEn: string;
}

export interface Chapter2QuizQuestion {
  id: number;
  questionBn: string;
  questionEn: string;
  optionsBn: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationBn: string;
  explanationEn: string;
  sourceFootnote: string;
}

export const CHAPTER_2_DATA = {
  meta: {
    number: '2.1',
    chapterNum: 2,
    titleBn: 'নবী কারীম ﷺ-এর পরিবার ও বংশ',
    titleEn: "Prophet Muhammad ﷺ's Family Background & Lineage",
    taglineBn: 'হাশিম থেকে আবদুল মুত্তালিব, যমযমের পুনঃখনন, হস্তীবাহিনীর অলৌকিক ঘটনা ও আবদুল্লাহর আত্মত্যাগ',
    taglineEn: 'From Hashim to Abdul Muttalib, the rediscovery of Zamzam, the Year of the Elephant, and the ransom of Abdullah',
    sourceBookBn: 'আর-রাহীকুল মাখতূম (পৃষ্ঠা ৮৯–৯৮)',
    sourceBookEn: 'Ar-Raheeq Al-Makhtum (Pages 89-98)',
  },

  lineagePart1: [
    {
      generation: 1,
      nameBn: 'মুহাম্মদ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম',
      nameEn: 'Muhammad ﷺ',
      nameAr: 'مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
      titleBn: 'সাইয়েদুল মুরসালীন, খাতামুন নাবিয়্যীন',
      titleEn: 'Leader of the Prophets, Seal of the Messengers',
      significanceBn: 'আল্লাহর প্রেরিত সর্বশেষ ও সর্বশ্রেষ্ঠ রাসূল।',
      significanceEn: 'The final and greatest Messenger sent by Allah to humanity.',
    },
    {
      generation: 2,
      nameBn: 'আব্দুল্লাহ',
      nameEn: 'Abdullah',
      nameAr: 'عَبْدُ اللَّهِ',
      titleBn: 'আয-যবীহ (কুরবানীর জন্য মনোনীত)',
      titleEn: 'The Intended Sacrifice (Adh-Dhabeeh)',
      significanceBn: 'আবদুল মুত্তালিবের সবচেয়ে প্রিয় ও নিষ্কলুষ পুত্র। যার মুক্তিপণে ১০০ উট কুরবানী দেওয়া হয়েছিল।',
      significanceEn: 'The most beloved and chaste son of Abdul Muttalib, ransomed with 100 camels.',
    },
    {
      generation: 3,
      nameBn: 'আবদুল মুত্তালিব (আসল নাম: শাইবা)',
      nameEn: 'Abdul Muttalib (Shaiba)',
      nameAr: 'عَبْدُ الْمُطَّلِبِ (شَيْبَةُ)',
      titleBn: 'কুরাইশ সরদার, যমযমের খননকারী',
      titleEn: 'Leader of Quraysh, Discoverer of Zamzam',
      significanceBn: 'স্বপ্নে নির্দেশ পেয়ে যমযম কূপ পুনঃখনন করেন এবং হস্তীবাহিনীর সময় কাবার সুরক্ষায় আল্লাহর ওপর তাওয়াক্কুল করেন।',
      significanceEn: 'Excavated the well of Zamzam following divine dreams and led Makkah with firm faith during the Elephant Army trial.',
    },
    {
      generation: 4,
      nameBn: 'হাশিম (আসল নাম: আমর)',
      nameEn: 'Hashim (Amr)',
      nameAr: 'هَاشِمٌ (عَمْرُو)',
      titleBn: 'হাশিমী গোত্রের প্রতিষ্ঠাতা',
      titleEn: 'Founder of Banu Hashim',
      significanceBn: 'মক্কায় দুর্ভিক্ষের সময় রুটি ভেঙে সারীদ তৈরি করে হাজীদের আপ্যায়ন করেন এবং গ্রীষ্ম ও শীতের ঐতিহাসিক বাণিজ্য সফরের সূচনা করেন।',
      significanceEn: 'Fed pilgrims Thareed during famines and established the famous summer and winter trade caravans.',
    },
    {
      generation: 5,
      nameBn: 'আবদে মানাফ (আসল নাম: মুগীরা)',
      nameEn: 'Abd Manaf (Mughira)',
      nameAr: 'عَبْدُ مَنَافٍ (الْمُغِيرَةُ)',
      titleBn: 'কুরাইশের প্রজ্ঞাবান নেতা',
      titleEn: 'Wise Elder of Quraysh',
      significanceBn: 'তাঁর সময়ে মক্কার সম্মান ও প্রতিপত্তি বহু দূর বিস্তৃত হয়।',
      significanceEn: 'During his era, the honor and diplomatic stature of Makkah expanded widely.',
    },
    {
      generation: 6,
      nameBn: 'কুসাই (আসল নাম: যায়দ)',
      nameEn: 'Qusayy (Zayd)',
      nameAr: 'قُصَيٌّ (زَيْدُ)',
      titleBn: 'দারুন নদওয়ার প্রতিষ্ঠাতা ও কুরাইশ ঐক্যনায়ক',
      titleEn: 'Founder of Dar al-Nadwah & Unifier of Quraysh',
      significanceBn: 'বিক্ষিপ্ত কুরাইশদের একত্রিত করে মক্কার শাসনক্ষমতা প্রতিষ্ঠা করেন এবং ঐতিহাসিক পরামর্শ সভা দারুন নদওয়া তৈরি করেন।',
      significanceEn: 'Unified the scattered Quraysh clans, gained custodianship of Makkah, and founded the Council of Dar al-Nadwah.',
    },
    {
      generation: 7,
      nameBn: 'কিলাব',
      nameEn: 'Kilab',
      nameAr: 'كِلَابٌ',
      significanceBn: 'কুসাই ও যুহরার পিতা। রাসূলুল্লাহ ﷺ ও মাতা আমিনার উভয়ের বংশধারা কিলাবে এসে মিলিত হয়।',
      significanceEn: 'Father of Qusayy and Zuhrah; both the paternal and maternal lineages of the Prophet ﷺ unite at Kilab.',
    },
    {
      generation: 8,
      nameBn: 'মুররাহ',
      nameEn: 'Murrah',
      nameAr: 'مُرَّةُ',
      significanceBn: 'কুরাইশের সম্মানিত পূর্বপুরুষ।',
      significanceEn: 'Revered ancestral patriarch of the central Qurayshite branches.',
    },
    {
      generation: 9,
      nameBn: "কা'ব",
      nameEn: "Ka'b",
      nameAr: 'كَعْبٌ',
      significanceBn: 'তিনি প্রতি জুমুআর দিনে (ইয়াওমুল আরূবা) কুরাইশদের একত্রিত করে উপদেশ দিতেন।',
      significanceEn: 'Gathered Quraysh every Friday (Yawm al-Arubah) to give moral counsel and reminders.',
    },
    {
      generation: 10,
      nameBn: 'লুওয়াই',
      nameEn: 'Luwayy',
      nameAr: 'لُؤَيٌّ',
      significanceBn: 'কুরাইশের অন্যতম শীর্ষ স্তম্ভ।',
      significanceEn: 'A principal ancestral pillar of the Quraysh lineage.',
    },
    {
      generation: 11,
      nameBn: 'গালিব',
      nameEn: 'Ghalib',
      nameAr: 'غَالِبٌ',
      significanceBn: 'কুরাইশের পূর্বপুরুষ।',
      significanceEn: 'Respected Qurayshite ancestor.',
    },
    {
      generation: 12,
      nameBn: 'ফিহর (উপাধি: কুরাইশ)',
      nameEn: 'Fihr (Titled: Quraysh)',
      nameAr: 'فِهْرٌ (قُرَيْشٌ)',
      titleBn: 'কুরাইশ উপাধির মূল ব্যক্তিত্ব',
      titleEn: 'The Origin of the Title Quraysh',
      significanceBn: 'তাঁর দিকে সম্বন্ধ করেই তাঁর পরবর্তী সকল বংশধরকে "কুরাইশ" বলে অভিহিত করা হয়।',
      significanceEn: 'It is in reference to Fihr that all subsequent descendants are named "Quraysh".',
    },
    {
      generation: 13,
      nameBn: 'মালিক',
      nameEn: 'Malik',
      nameAr: 'مَالِكٌ',
      significanceBn: 'কিনানার প্রখ্যাত উত্তরসূরি।',
      significanceEn: 'Renowned descendant of Kinanah.',
    },
    {
      generation: 14,
      nameBn: 'নযর (আসল নাম: কায়স)',
      nameEn: 'Nadhr (Qays)',
      nameAr: 'النَّضْرُ (قَيْسٌ)',
      significanceBn: 'অনেকের মতে তাঁর থেকেই কুরাইশ নামের বিশেষ মর্যাদা শুরু হয়েছিল।',
      significanceEn: 'According to some scholars, the distinctive nobility of Quraysh began with him.',
    },
    {
      generation: 15,
      nameBn: 'কিনানা',
      nameEn: 'Kinanah',
      nameAr: 'كِنَانَةُ',
      significanceBn: 'বৃহৎ কিনানা গোত্রের প্রতিষ্ঠাতা।',
      significanceEn: 'The founder of the great tribal confederation of Kinanah.',
    },
    {
      generation: 16,
      nameBn: 'খুযাইমা',
      nameEn: 'Khuzaymah',
      nameAr: 'خُزَيْمَةُ',
      significanceBn: 'আরবের খ্যাতনামা নেতা।',
      significanceEn: 'Distinguished pre-Islamic Arabian chieftain.',
    },
    {
      generation: 17,
      nameBn: 'মুদরিকাহ (আসল নাম: আমের)',
      nameEn: 'Mudrikah (Amr)',
      nameAr: 'مُدْرِكَةُ (عَمْرُو)',
      significanceBn: 'মুযার বংশের অন্যতম শীর্ষ ব্যক্তিত্ব।',
      significanceEn: 'Prominent ancestral leader of the Mudar lineage.',
    },
    {
      generation: 18,
      nameBn: 'ইলয়াস',
      nameEn: 'Ilyas',
      nameAr: 'إِلْيَاسُ',
      significanceBn: 'আরবে সর্বপ্রথম হারামের সীমানায় পশু কুরবানী করার রীতি প্রবর্তনকারীদের একজন।',
      significanceEn: 'Among the earliest to venerate the sanctuary boundaries with sacrificial livestock.',
    },
    {
      generation: 19,
      nameBn: 'মুযার',
      nameEn: 'Mudar',
      nameAr: 'مُضَرُ',
      significanceBn: 'মুযার গোত্রের প্রতিষ্ঠাতা, যাঁর সুরের মাধুর্য ও বংশমর্যাদা আরবে প্রবাদতুল্য ছিল।',
      significanceEn: 'Patriarch of the renowned Mudar tribal branch, famed for wisdom and nobility.',
    },
    {
      generation: 20,
      nameBn: 'নিযার',
      nameEn: 'Nizar',
      nameAr: 'نِزَارٌ',
      significanceBn: 'মাআদ বিন আদনানের সুযোগ্য সন্তান।',
      significanceEn: 'Eminent son of Ma\'add bin Adnan.',
    },
    {
      generation: 21,
      nameBn: "মা'আদ",
      nameEn: "Ma'add",
      nameAr: 'مَعَدٌّ',
      significanceBn: 'আদনানের বীর সন্তান, যাঁর থেকে উত্তর আরবের অসংখ্য বংশ ছড়িয়ে পড়েছিল।',
      significanceEn: 'Valiant son of Adnan, from whom northern Arab lineages proliferated.',
    },
    {
      generation: 22,
      nameBn: 'আদনান',
      nameEn: 'Adnan',
      nameAr: 'عَدْنَانُ',
      titleBn: 'আদনানী আরবের মূল ভিত্তি',
      titleEn: 'Foundational Patriarch of Adnani Arabs',
      significanceBn: 'হযরত ইসমাঈল (আ.)-এর প্রত্যক্ষ বংশধর। সকল ঐতিহাসিক ঐক্যমত পোষণ করেছেন যে রাসূল ﷺ-এর এ পর্যন্ত নসব সম্পূর্ণ বিশুদ্ধ।',
      significanceEn: 'Direct descendant of Prophet Ismail (a.s.). All historians unanimously agree on the authentic pedigree up to Adnan.',
    },
  ],

  stations: [
    {
      id: 'hashim_generosity',
      titleBn: 'হাশিম বিন আবদে মানাফ ও দ্বি-বার্ষিক বাণিজ্য',
      titleEn: 'Hashim & The Two Seasonal Caravans',
      titleAr: 'هَاشِمُ بْنُ عَبْدِ مَنَافٍ',
      taglineBn: 'মক্কায় সারীদ তৈরি ও গ্রীষ্ম-শীতের আন্তর্জাতিক বাণিজ্য সফরের প্রবর্তক',
      taglineEn: 'The host of Thareed and founder of the Summer & Winter trade routes',
      imageKey: 'hashim_caravan_mecca',
      summaryBn: 'হাশিম ছিলেন একজন সম্ভ্রান্ত ও দানবীর ব্যক্তি। মক্কায় দুর্ভিক্ষের সময় তিনি রুটি টুকরো করে গোশতের ঝোলে ভিজিয়ে হাজীদের আপ্যায়ন করেন, যে কারণে তাঁর নাম হয় "হাশিম"। তিনিই সর্বপ্রথম কুরাইশদের জন্য বছরে দুটি বাণিজ্যিক সফরের সূচনা করেন—গ্রীষ্মে সিরিয়া এবং শীতে ইয়েমেনে।',
      summaryEn: 'Hashim was an exceptionally generous leader. During severe famine, he crushed dried bread into meat broth to feed pilgrims, earning him the honorific title "Hashim" (The Crusher/Feeder). He also instituted the historic two annual trade journeys for Quraysh—to Syria in the summer and Yemen in the winter.',
      historicalContextBn: 'বনু আবদে মানাফ ও বনু আব্দুদ্দারের ঐতিহাসিক চুক্তির পর হাজীদের পানি পান করানো (সিকায়া) এবং খাদ্য পরিবেশনের (রিফাদা) গুরুদায়িত্ব হাশিম লাভ করেন। ব্যবসা উপলক্ষে তিনি সিরিয়া যাওয়ার পথে ইয়াসরিবে বনু আদী বিন নাজ্জারের সালমা বিনতে আমরকে বিবাহ করেন। সেখানে শাইবা (আবদুল মুত্তালিব)-এর জন্ম হয়। হাশিম ফিলিস্তিনের গাযা শহরে ইনতিকাল করেন।',
      historicalContextEn: 'Following the pact between Banu Abd Manaf and Banu Abd ad-Dar, Hashim received the vital portfolios of Siqayah (providing water) and Rifadah (feeding pilgrims). On a trade trip toward Syria, he married Salma bint Amr of Banu Najjar in Yathrib. There, Shaiba (Abdul Muttalib) was born. Hashim passed away in Gaza, Palestine.',
      keyEventsBn: [
        'মক্কায় দুর্ভিক্ষপীড়িত হাজীদের সারীদ (গোশতের ঝোলে ভেজানো রুটি) পরিবেশন।',
        'গ্রীষ্মে সিরিয়া ও শীতে ইয়েমেনে দ্বি-বার্ষিক বাণিজ্য সফরের ঐতিহাসিক প্রবর্তন (সূরা কুরাইশে উল্লিখিত)।',
        'মদীনায় বনু নাজ্জারের সালমা বিনতে আমরের সাথে বিবাহ এবং ৪৯৭ খ্রিস্টাব্দে শাইবা (আবদুল মুত্তালিব)-এর জন্ম।',
        'ফিলিস্তিনের গাযায় হাশিমের ইনতিকাল।',
      ],
      keyEventsEn: [
        'Served Thareed (meat-broth soaked bread) to starving pilgrims during Makkah famines.',
        'Established the two international seasonal trade journeys—summer to Syria and winter to Yemen (mentioned in Surah Quraysh).',
        'Married Salma bint Amr of Banu Najjar in Yathrib; Shaiba (Abdul Muttalib) born in 497 CE.',
        'Passed away in Gaza, Palestine while on an expedition.',
      ],
      arabicPoetry: {
        arabic: [
          'عَمْرُو الَّذِي هَشَمَ الثَّرِيدَ لِقَوْمِهِ ... قَوْمٍ بِمَكَّةَ مُسْنِتِينَ عِجَافِ',
          'سُنَّتْ إِلَيْهِ الرِّحْلَتَانِ كِلَاهُمَا ... سَفَرُ الشِّتَاءِ وَرِحْلَةُ الْأَصْيَافِ',
        ],
        bengali: 'এই সেই আমর যিনি মহামারী আর মন্বন্তরে জীর্ণশীর্ণ নিজ কওমকে মক্কায় রুটি ছিঁড়ে সারীদ বানিয়ে খাইয়েছেন। যিনি তাদের জন্য গ্রীষ্ম ও শীতকালে দুটি সফরের রীতি প্রবর্তন করেছেন।',
        english: 'This is Amr who crumbled the Thareed bread for his people in Makkah when they were emaciated and starved; for whom the two journeys were instituted—the winter journey and the summer journey.',
      },
      footnotes: ['ইবনে হিশাম ১/১৫৭', 'ইবনে হিশাম ১/১৩৭', 'ইবনে হিশাম ১/১০৭'],
      moralLessonBn: 'কঠিন সংকটে মানুষের পাশে দাঁড়ানো এবং সমাজের কল্যাণে দূরদর্শী অর্থনৈতিক নেতৃত্ব গড়ে তোলার শিক্ষা।',
      moralLessonEn: 'Standing by the vulnerable in times of hardship and demonstrating visionary economic leadership.',
      journalUnlockBn: 'হাশিমের দ্বি-বার্ষিক বাণিজ্য ও সারীদের ইতিহাস উন্মোচিত',
      journalUnlockEn: 'Discovered Hashim’s Trade Journeys & Hospitality',
    },
    {
      id: 'abdul_muttalib_zamzam',
      titleBn: 'আবদুল মুত্তালিব ও অলৌকিক যমযম কূপের পুনঃখনন',
      titleEn: 'Abdul Muttalib & The Rediscovery of Zamzam',
      titleAr: 'حَفْرُ بِئْرِ زَمْزَمَ وَنَذْرُ عَبْدِ الْمُطَّلِبِ',
      taglineBn: 'স্বপ্নে নির্দেশপ্রাপ্তি, জুরহুমদের লুকানো স্বর্ণের হরিণ উদ্ধার ও মরুভূমির পানির অলৌকিক পরীক্ষা',
      taglineEn: 'The dream guidance, unearthing Jurhum treasures, and the desert water sign',
      imageKey: 'zamzam_rediscovery_ancient',
      summaryBn: 'শাইবা তাঁর চাচা মুত্তালিবের সাথে মক্কায় আসার পর "আবদুল মুত্তালিব" নামে পরিচিত হন। এক রাতে তিনি স্বপ্নে যমযম কূপ পুনঃখননের নির্দেশ পান। মাটি খনন করে তিনি বনু জুরহুমের লুকানো তরবারি ও দুটি স্বর্ণের হরিণ উদ্ধার করেন। কুরাইশরা অংশীদার হতে চাইলে বিরোধ সৃষ্টি হয় এবং মরুভূমিতে পানির অলৌকিক ঘটনায় কুরাইশরা আবদুল মুত্তালিবের অধিকার মেনে নেয়।',
      summaryEn: 'Shaiba came to Makkah with his uncle Muttalib and became known as "Abdul Muttalib". In a divine dream, he was commanded to excavate the buried well of Zamzam. Digging at the spot, he recovered buried swords and two golden deer left by Banu Jurhum. When Quraysh disputed his sole guardianship, a desert water miracle proved divine favor.',
      historicalContextBn: 'নওফল আবদুল মুত্তালিবের সম্পত্তি দখল করলে মদীনা থেকে মামা আবু সা\'দ বিন আদী ৮০ জন সওয়ার নিয়ে এসে হাতীমে নাঙ্গা তরবারি তুলে তাঁর অধিকার ফিরিয়ে দেন। পরবর্তীতে বনু খুযা\'আও হাশিমীদের সাথে মিত্রচুক্তিতে আবদ্ধ হয়। যমযম বিরোধ নিষ্পত্তির পর আবদুল মুত্তালিব মানত করেন—যদি তাঁকে ১০টি সন্তান দেওয়া হয় তবে একজনকে তিনি কাবার কাছে কুরবানী দিবেন।',
      historicalContextEn: 'When Nawfal usurped his property, his maternal uncle Abu Sa\'d bin Adi arrived from Yathrib with 80 horsemen to restore his rights at sword-point at the Hateem. Later, Banu Khuza\'a formed a sacred alliance with Banu Hashim. After the Zamzam miracle, Abdul Muttalib vowed to sacrifice one son if blessed with ten who grow to protect him.',
      keyEventsBn: [
        'মুত্তালিব কর্তৃক মদীনায় গিয়ে ভ্রাতুষ্পুত্র শাইবাকে মক্কায় আনা এবং "আবদুল মুত্তালিব" নামের প্রসার।',
        'মদীনার মামাদের সহায়তায় হাতীমে নওফলের বিরুদ্ধে আবদুল মুত্তালিবের অধিকার পুনরুদ্ধার ও খুযা\'আ মৈত্রী।',
        'স্বপ্নে যমযম কূপের সুনির্দিষ্ট অবস্থান দর্শন এবং মাটিতে লুকানো তরবারি ও স্বর্ণের হরিণ উদ্ধার।',
        'সিরিয়ার পথে মরুভূমিতে পানির তীব্র তৃষ্ণায় কেবল আবদুল মুত্তালিবের উটের পায়ের তলা থেকে মিষ্টি পানি উপচে ওঠার অলৌকিক ঘটনা।',
        'আবদুল মুত্তালিবের ঐতিহাসিক মানত (১০টি পুত্র পূর্ণ হলে একজনকে কুরবানী করার শপথ)।',
      ],
      keyEventsEn: [
        'Muttalib brought Shaiba from Yathrib to Makkah on his camel; people titled him "Abdul Muttalib".',
        'Maternal uncle Abu Sa\'d of Banu Najjar restored his inherited estate against Nawfal; Khuza\'a treaty formed.',
        'Received divine dream locating the hidden Well of Zamzam; unearthed buried swords and golden deer.',
        'Miraculous freshwater sprang from under his camel’s hooves during a drought-stricken desert dispute in Syria.',
        'Made the historic vow (Nadhr) to sacrifice one son to Allah if blessed with ten protective sons.',
      ],
      footnotes: ['ইবনে হিশাম ১/১৩৭, ১৩৮', 'তারীখে তাবারী ২/২৪৭-২৫১', 'ইবনে হিশাম ১/১৪২-১৪৭'],
      moralLessonBn: 'ন্যায্য অধিকার রক্ষা এবং বিপদের মুহূর্তে অবিচল থেকে একমাত্র আল্লাহর ওপর নির্ভরশীল হওয়ার শিক্ষা।',
      moralLessonEn: 'Upholding justice, defending inherited rights, and placing absolute reliance on Allah in adversity.',
      journalUnlockBn: 'যমযম কূপ পুনঃখনন ও আবদুল মুত্তালিবের মানতের ইতিহাস উন্মোচিত',
      journalUnlockEn: 'Discovered Zamzam Rediscovery & The Historic Vow',
    },
    {
      id: 'elephant_army_571',
      titleBn: 'হস্তীবাহিনীর ঐতিহাসিক ঘটনা (আসহাবুল ফীল - ৫৭১ খ্রি.)',
      titleEn: 'The Year of the Elephant (Ashab al-Fil - 571 CE)',
      titleAr: 'حَادِثَةُ الْفِيلِ وَعَامُ الْفِيلِ',
      taglineBn: 'আবরাহার ৬০ হাজার সৈন্য ও মাহমুদ হাতি, মুহাসসার উপত্যকা এবং ঝাঁকে ঝাঁকে আবাবীল পাখির কঙ্কর নিক্ষেপ',
      taglineEn: 'Abrahah’s 60,000 army, the elephant Mahmoud, and flocks of Ababil birds at Wadi Muhassir',
      imageKey: 'wadi_muhassir_elephant_storm',
      summaryBn: 'ইয়েমেনের গভর্নর আবরাহা সানা\'য় বিশাল গির্জা নির্মাণ করে আরবদের হজ্জ সেখানে ঘোরানোর চক্রান্ত করে। ব্যর্থ হয়ে সে ৬০ হাজার সৈন্য ও প্রকাণ্ড যুদ্ধহাতী নিয়ে কাবা ধ্বংস করতে আসে। মীনা ও মুযদালিফার মাঝামাঝি মুহাসসার উপত্যকায় মাহমুদ হাতী কাবার দিকে এগোতে অস্বীকৃতি জানায়। আল্লাহ আবাবীল পাখির ঝাঁক পাঠিয়ে কঙ্কর নিক্ষেপ করে আবরাহার পুরো বাহিনীকে ভক্ষিত তৃণের ন্যায় ধ্বংস করে দেন।',
      summaryEn: 'Abrahah, governor of Yemen, built a lavish cathedral in Sana\'a to divert the Arabian pilgrimage. Infuriated by Arab resistance, he marched with 60,000 soldiers and giant war elephants to demolish the Ka\'bah. At Wadi Muhassir, his lead elephant Mahmoud knelt and refused to step towards Makkah. Flocks of Ababil birds showered them with baked clay pebbles, crushing them like eaten straw.',
      historicalContextBn: 'ঘটনাটি ঘটেছিল রাসূলুল্লাহ ﷺ-এর জন্মের ৫০ বা ৫৫ দিন পূর্বে, মুহাররম মাসে (৫৭১ খ্রিস্টাব্দের ফেব্রুয়ারি বা মার্চ)। বুখতেনাসার বা রোমানরা বায়তুল মুকাদ্দাস ধ্বংস করতে পারলেও কাবার ওপর খ্রিস্টান হাবশীরা কর্তৃত্ব করতে পারেনি। আল্লাহ কোনো মানুষের তলোয়ার ছাড়াই নিজ কুদরতে কাবা রক্ষা করে বিশ্বকে জানিয়ে দিলেন—এ পবিত্র ভূমিতে শীঘ্রই সর্বশ্রেষ্ঠ রাসূলের আগমন ঘটবে।',
      historicalContextEn: 'This occurred 50 to 55 days before the birth of Prophet Muhammad ﷺ in Muharram 571 CE. Unlike Jerusalem, which had fallen to Nebuchadnezzar (586 BC) and Romans (70 CE), Allah defended the Ka\'bah purely by divine intervention without human armies, signalling that this sanctuary was being prepared for the final Prophet ﷺ.',
      keyEventsBn: [
        'আবরাহা কর্তৃক সানা\'য় বিশাল গির্জা (আল-কুল্লাইস) নির্মাণ ও আরবদের কাবা থেকে সরানোর অপচেষ্টা।',
        '৬০,০০০ সৈন্য ও ৯ থেকে ১৩টি যুদ্ধহাতী নিয়ে আবরাহার মক্কা অভিমুখে আগ্রাসন।',
        'মুহাসসার উপত্যকায় প্রধান হাতী মাহমুদ কাবার দিকে বস পড়লেও অন্য দিকে দৌড়ানোর অলৌকিক ঘটনা।',
        'ঝাঁকে ঝাঁকে আবাবীল পাখির আগমন; প্রতিটি পাখির চঞ্চু ও দুই পায়ে ছোলার ন্যায় ৩টি করে কঙ্করের আঘাত।',
        'আবরাহার শোচনীয় অঙ্গহীনতা ও সানা\'য় ফিরে বুক ফেটে মৃত্যু।',
        'রাসূল ﷺ-এর জন্মের ঠিক ৫০-৫৫ দিন আগে বিশ্বব্যাপী কাবার অলৌকিক মর্যাদা প্রতিষ্ঠা।',
      ],
      keyEventsEn: [
        'Abrahah constructed the opulent Al-Qullays cathedral in Sana\'a to divert pilgrimage away from Makkah.',
        'Marched toward Makkah with 60,000 troops and 9 to 13 giant war elephants.',
        'At Wadi Muhassir, lead elephant Mahmoud knelt toward the Ka\'bah but rushed willingly in other directions.',
        'Swarms of Ababil birds arrived carrying 3 baked clay pebbles each (in beak and claws), pulverizing the invaders.',
        'Abrahah contracted an agonizing disease where his fingers dropped off, dying in Sana\'a with a burst chest.',
        'Occurred 50-55 days before the birth of the Prophet ﷺ, elevating the sanctuary across Persia and Rome.',
      ],
      footnotes: ['ইবনে হিশাম ১/৪৩-৫৬', 'সূরা আল-ফীল ও তাফসীর গ্রন্থসমূহ'],
      moralLessonBn: 'অহংকার ও দাম্ভিকতার অবধারিত পতন এবং মহান আল্লাহর ওপর অটুট বিশ্বাসের শিক্ষা।',
      moralLessonEn: 'The inevitable ruin of arrogance and the invincible might of divine protection over sacred truth.',
      journalUnlockBn: 'আমুল ফীল (হস্তী বছর ৫৭১ খ্রি.) ও আবাবীল পাখির অলৌকিক ইতিহাস উন্মোচিত',
      journalUnlockEn: 'Discovered the Year of the Elephant (571 CE) & Ababil Miracle',
    },
    {
      id: 'abdullah_ransom_100_camels',
      titleBn: 'আবদুল্লাহর মানত ও ১০০ উটের ঐতিহাসিক মুক্তিপণ',
      titleEn: 'The Ransom of Abdullah with 100 Camels',
      titleAr: 'فِدَاءُ عَبْدِ اللَّهِ بِمِائَةٍ مِنَ الإِبِلِ',
      taglineBn: 'লটারিতে প্রিয় পুত্রের নাম, কুরাইশের প্রতিরোধ এবং ১০০ উট দিয়ে আয-যবীহের মুক্তি',
      taglineEn: 'The lottery for Abdullah, Quraysh intervention, and 100 camels establishing blood money',
      imageKey: 'azlam_divination_arrows',
      summaryBn: 'আবদুল মুত্তালিবের ১০ জন পুত্রসন্তান প্রাপ্তির পর তিনি মানত পূরণের উদ্দেশ্যে লটারি করেন। লটারিতে তাঁর সর্বাধিক প্রিয় ও নিষ্পাপ পুত্র আব্দুল্লাহর নাম ওঠে। কুরাইশ ও বনু মাখযূমের বাধার মুখে গণকের পরামর্শে আব্দুল্লাহ ও উটের মধ্যে লটারি চালানো হয়। প্রতিবারে ১০টি করে উট বাড়ানো হতে থাকে। অবশেষে ১০০ উট পূর্ণ হলে লটারিতে উটের নাম ওঠে এবং ১০০ উট কুরবানী করে আব্দুল্লাহ মুক্ত হন।',
      summaryEn: 'Having been blessed with ten protective sons, Abdul Muttalib prepared to fulfill his solemn vow. When the lots were cast at Hubal, the name of his most cherished and noble son, Abdullah, emerged. Quraysh and Banu Makhzum passionately intervened. Consulting a wise arbiter, lots were cast between Abdullah and camels, increasing by ten each time until 100 camels were reached, securing Abdullah\'s life.',
      historicalContextBn: 'আরবে পূর্বে রক্তপণ (দিয়ত) ছিল ১০টি উট। আব্দুল্লাহর এই মুক্তিপণের ঘটনার পর থেকে আরবে ও পরবর্তীকালে ইসলামে দিয়তের পরিমাণ ১০০ উট হিসেবে সুপ্রতিষ্ঠিত হয়। এ কারণেই রাসূলে কারীম ﷺ বলতেন: "আমি দুই যবীহের সন্তান—হযরত ইসমাঈল (আ.) ও আমার পিতা আব্দুল্লাহ।" আবদুল মুত্তালিবের ১০ জন ছেলে ও ৬ জন মেয়ে ছিলেন।',
      historicalContextEn: 'Previously, Arabian blood money (diyah) was set at ten camels. Following Abdullah’s ransom, the standard blood money across Arabia and later confirmed in Islam became 100 camels. Hence the Prophet ﷺ proudly declared: "I am the son of the two sacrificed ones—Ismail (a.s.) and my father Abdullah." Abdul Muttalib had 10 sons and 6 daughters.',
      keyEventsBn: [
        'আবদুল মুত্তালিবের ১০ পুত্রের বিনাবাক্যে পিতার মানত পালনের আনুগত্য প্রকাশ।',
        'লটারিতে সবচেয়ে সুন্দর ও পবিত্র পুত্র আব্দুল্লাহর নাম ওঠা এবং কাবার সামনে ধারালো ছুরি নিয়ে যাওয়ার দৃশ্য।',
        'কুরাইশ নেতা, আবু তালিব ও বনু মাখযূমের তীব্র প্রতিরোধ ও রক্তপণের পরামর্শ।',
        '১০টি করে উট বাড়িয়ে লটারি প্রদান; ১০ম বারে ১০০ উটের নাম ওঠা।',
        '১০০ উট কুরবানী করে মানুষ ও বন্যপ্রাণীর জন্য অবারিত খাদ্য বিলানো।',
        'ইসলামে রক্তপণ ১০০ উট নির্ধারণের মূল ঐতিহাসিক উৎস প্রতিষ্ঠা।',
      ],
      keyEventsEn: [
        'The ten sons demonstrated unquestioning obedience to their father’s sacred oath.',
        'The lot fell upon Abdullah, the most handsome and beloved son, taken toward the Ka\'bah.',
        'Quraysh elders, Abu Talib, and Banu Makhzum intervened to save his precious life.',
        'Lots cast between Abdullah and camels, increasing by 10 each round until 100 camels were drawn.',
        '100 camels sacrificed and distributed freely to all citizens, travelers, and wildlife.',
        'Established the standard 100-camel blood money (diyah) ratified permanently in Islamic law.',
      ],
      hadithOrQuoteBn: 'রাসূলে কারীম ﷺ ইরশাদ করেছেন: "আমি দুই যবীহের সন্তান—হযরত ইসমাঈল (আ.) ও আমার পিতা আব্দুল্লাহ।"',
      hadithOrQuoteEn: 'The Messenger of Allah ﷺ stated: "I am the son of the two sacrificed ones—Ismail (a.s.) and my father Abdullah."',
      footnotes: ['সীরাতে ইবনে হিশাম ১/১০৮, ১০৯', 'তারীখে তাবারী ২/২৩৯', 'ইবনে হিশাম ১/১৫১-১৫৫', 'রওযুল আনফু ১/১৪৪'],
      moralLessonBn: 'পিতামাতার আনুগত্য, প্রতিশ্রুতি রক্ষা এবং মানবজীবনের সম্মান রক্ষার্থে সম্পদের ত্যাগ স্বীকারের শিক্ষা।',
      moralLessonEn: 'Filial devotion, fulfilling solemn covenants, and sacrificing immense wealth to preserve noble human life.',
      journalUnlockBn: 'আব্দুল্লাহর মুক্তিপণ (১০০ উট) ও "দুই যবীহের সন্তান" তত্ত্ব উন্মোচিত',
      journalUnlockEn: 'Discovered The Ransom of Abdullah (100 Camels) & Son of Two Sacrificed Ones',
    },
    {
      id: 'abdullah_marriage_passing',
      titleBn: 'আব্দুল্লাহর বিবাহ ও মদীনায় অন্তিম বিদায়',
      titleEn: "Abdullah's Marriage & Passing in Yathrib",
      titleAr: 'زَوَاجُ عَبْدِ اللَّهِ وَوَفَاتُهُ بِالْمَدِينَةِ',
      taglineBn: 'আমিনার সাথে বিবাহ, মদীনায় আকস্মিক অসুস্থতা ও ২৫ বছর বয়সে ইনতিকাল',
      taglineEn: 'Marriage to Aminah, illness in Madinah, and passing at age 25 before the Prophet’s ﷺ birth',
      imageKey: 'yathrib_oasis_groves',
      summaryBn: 'আবদুল মুত্তালিব তাঁর প্রিয় পুত্র আব্দুল্লাহর জন্য বনু যুহরার সরদার ওহাব বিন আবদে মানাফের মহীয়সী কন্যা আমিনার সাথে বিবাহ সম্পন্ন করান। আমিনা ছিলেন বংশ ও মর্যাদায় কুরাইশ নারীদের শ্রেষ্ঠ। বিবাহের কিছুদিন পর আব্দুল্লাহ বাণিজ্য বা খেজুর সংগ্রহের উদ্দেশ্যে মদীনায় যান। সেখানে তিনি গুরুতর অসুস্থ হয়ে নাবেগা জু\'দীর বাড়িতে ২৫ বছর বয়সে ইনতিকাল করেন।',
      summaryEn: 'Abdul Muttalib arranged the marriage of his beloved son Abdullah to Aminah bint Wahb, the noble daughter of the chief of Banu Zuhrah. Aminah was recognized as the foremost woman of Quraysh in lineage and dignity. Shortly after, Abdullah traveled toward Yathrib/Syria, fell critically ill on the return journey, and passed away at Dar an-Nabighah al-Ju\'di at age 25.',
      historicalContextBn: 'অধিকাংশ ঐতিহাসিকের মতে এই মৃত্যু ছিল রাসূলে কারীম ﷺ-এর শুভ জন্মের পূর্বের ঘটনা। স্বামীর আকস্মিক মৃত্যুতে আমিনা গভীর শোকে নিমজ্জিত হন এবং অশ্রুসজল আরবি মর্সিয়া রচনা করেন। আব্দুল্লাহর রেখে যাওয়া সহায়-সম্পত্তির মধ্যে ছিল ৫টি উট, এক পাল বকরি এবং হাবশী দাসী বারাকা (উম্মে আয়মন রা.), যিনি নবীজি ﷺ-এর আজীবন খাদেমা ছিলেন।',
      historicalContextEn: 'According to the majority of historians, this demise occurred shortly before the blessed birth of Prophet Muhammad ﷺ. Deeply bereaved, Aminah composed a poignant elegy. Abdullah left behind five camels, a flock of goats, and an Abyssinian nursemaid named Barakah (kunya: Umm Ayman r.a.), who lovingly nurtured the infant Prophet ﷺ.',
      keyEventsBn: [
        'বনু যুহরার সরদারকন্যা মহীয়সী আমিনার সাথে আব্দুল্লাহর বিবাহ।',
        'বাণিজ্য কাফেলার সাথে সফর ও মদীনার মাটিতে হঠাৎ অসুস্থ হয়ে পড়া।',
        '২৫ বছর বয়সে মদীনার নাবেগা জু\'দীতে আব্দুল্লাহর ইনতিকাল ও দাফন।',
        'মাতা আমিনার হৃদয়বিদারক আরবি শোকগাথা (মর্সিয়া) রচনা।',
        'রেখে যাওয়া উত্তরাধিকার: ৫টি উট, বকরির পাল এবং স্নেহময়ী উম্মে আয়মন (রা.)।',
      ],
      keyEventsEn: [
        'Marriage to Lady Aminah, daughter of Wahb, chieftain of Banu Zuhrah.',
        'Travel with a caravan toward Syria/Yathrib and sudden illness on the return.',
        'Passed away and laid to rest at Dar an-Nabighah al-Ju\'di in Yathrib at age 25.',
        'Heartfelt Arabic elegy composed by Lady Aminah expressing deep sorrow.',
        'Estate left behind: 5 camels, a flock of goats, and nursemaid Barakah (Umm Ayman r.a.).',
      ],
      arabicPoetry: {
        arabic: [
          'عَفَا جَانِبُ الْبَطْحَاءِ مِنْ ابْنِ هَاشِمٍ ... وَجَاوَرَ لَحْدًا خَارِجًا فِي الْغَمَاغِمِ',
          'دَعَتْهُ الْمَنَايَا فَأَجَابَهَا ... وَمَا تَرَكَتْ فِي النَّاسِ مِثْلَ ابْنِ هَاشِمِ',
          'عَشِيَّةَ رَاحُوا يَحْمِلُونَ سَرِيرَهُ ... تَعَاوَرَهُ أَصْحَابُهُ فِي التَّزَاحُمِ',
          'فَإِنْ يَكُ غَالَتْهُ الْمَنَايَا وَرَيْبُهَا ... فَقَدْ كَانَ مِعْطَاءً كَثِيرَ التَّرَاحُمِ',
        ],
        bengali: 'বাতহার কোল হাশিমের ছেলে থেকে শূন্য হয়ে গেল। তিনি কবরের শান্তির বিছানায় ঘুমিয়ে গেলেন। মৃত্যু তাঁকে ডাক দিলো আর তিনি সাড়া দিলেন; অথচ মানুষের মাঝে ইবনে হাশিমের মতো আর কাউকেই সে রেখে গেল না! কত আফসোসের সন্ধ্যা ছিল সেটি, যখন স্বজনরা তাঁর খাট বহন করছিল। মৃত্যু তাঁর দেহ বিলুপ্ত করলেও তাঁর দানশীলতা ও দয়ার কীর্তি চির অম্লান থাকবে।',
        english: 'The side of Batha has become empty of the son of Hashim; he has departed to rest in a tomb. Death summoned him and he answered; yet death left none among mankind like the son of Hashim! What a mournful dusk when his companions carried his bier in crowded reverence. Though death claimed him, his generous hand and boundless mercy endure forever.',
      },
      footnotes: ['তাবাকাতে ইবনে সা\'দ ১/১০০', 'সহীহ মুসলিম ৩/১৩৯২ (হাদীস ১৭৭১)'],
      moralLessonBn: 'তাকদিরে সন্তুষ্টি এবং দুঃখ-কষ্টের মাঝেও ধৈর্য ও আল্লাহর ইচ্ছার প্রতি আত্মসমর্পণ করার শিক্ষা।',
      moralLessonEn: 'Patience in bereavement, trust in divine destiny, and honoring the memory of righteous predecessors.',
      journalUnlockBn: 'আব্দুল্লাহর ইনতিকাল, আমিনার মর্সিয়া ও উম্মে আয়মনের ইতিহাস উন্মোচিত',
      journalUnlockEn: 'Discovered Abdullah’s Passing, Aminah’s Elegy & Umm Ayman',
    },
  ],

  quizzes: [
    {
      id: 1,
      questionBn: 'রাসূলুল্লাহ ﷺ-এর বংশনামার কোন অংশটির বিশুদ্ধতার ওপর সকল ঐতিহাসিক ঐক্যমত পোষণ করেছেন?',
      questionEn: 'Which part of the Prophet’s ﷺ pedigree do all historians unanimously agree upon as authentic?',
      optionsBn: [
        'মুহাম্মদ ﷺ থেকে আদনান পর্যন্ত',
        'আদনান থেকে হযরত ইবরাহীম (আ.) পর্যন্ত',
        'হযরত ইবরাহীম (আ.) থেকে হযরত আদম (আ.) পর্যন্ত',
        'কেবল কুসাই থেকে আবদে মানাফ পর্যন্ত',
      ],
      optionsEn: [
        'From Muhammad ﷺ up to Adnan',
        'From Adnan to Prophet Ibrahim (a.s.)',
        'From Prophet Ibrahim (a.s.) to Prophet Adam (a.s.)',
        'Only from Qusayy to Abd Manaf',
      ],
      correctIndex: 0,
      explanationBn: 'সীরাতগ্রন্থ অনুসারে মুহাম্মদ ﷺ থেকে আদনান পর্যন্ত বংশধারা সম্পূর্ণ প্রামাণ্য ও সর্বসম্মত। এর পরের অংশ নিয়ে মতভেদ রয়েছে।',
      explanationEn: 'According to authenticated Seerah sources, the lineage from Muhammad ﷺ up to Adnan is unanimously agreed upon.',
      sourceFootnote: 'ইবনে হিশাম ১/১,২; তারীখে তাবারী ২/২৩৯-২৭২',
    },
    {
      id: 2,
      questionBn: 'হাশিম বিন আবদে মানাফের আসল নাম কী ছিল এবং কেন তাঁকে "হাশিম" বলা হতো?',
      questionEn: 'What was the birth name of Hashim bin Abd Manaf and why was he titled "Hashim"?',
      optionsBn: [
        'আসল নাম আমর; দুর্ভিক্ষের সময় হাজীদের রুটি ভেঙে সারীদ তৈরি করায় হাশিম নাম হয়',
        'আসল নাম শাইবা; চুল সাদা থাকার কারণে',
        'আসল নাম মুগীরা; সাহসিকতার কারণে',
        'আসল নাম যায়দ; কুরাইশদের একত্রিত করার কারণে',
      ],
      optionsEn: [
        'Real name Amr; titled Hashim for crumbling bread into broth (Thareed) for hungry pilgrims',
        'Real name Shaiba; due to white hair at birth',
        'Real name Mughira; due to valor',
        'Real name Zayd; for gathering the clans',
      ],
      correctIndex: 0,
      explanationBn: 'হাশিমের প্রকৃত নাম ছিল আমর। মক্কায় দুর্ভিক্ষের সময় তিনি রুটি টুকরো টুকরো (হাশম) করে সারীদ তৈরি করে হাজীদের আপ্যায়ন করায় তিনি হাশিম নামে খ্যাতি পান।',
      explanationEn: 'His birth name was Amr. Because he crumbled (hashama) bread into meat broth to feed starving pilgrims, he was titled Hashim.',
      sourceFootnote: 'ইবনে হিশাম ১/১৫৭',
    },
    {
      id: 3,
      questionBn: 'কুরাইশদের জন্য বছরে দুটি বাণিজ্য সফরের (গ্রীষ্ম ও শীত) রীতি সর্বপ্রথম কে প্রবর্তন করেন?',
      questionEn: 'Who first instituted the two annual trade journeys (summer & winter) for Quraysh?',
      optionsBn: [
        'হাশিম বিন আবদে মানাফ',
        'কুসাই বিন কিলাব',
        'আবদুল মুত্তালিব',
        'আম্র বিন লুহাই',
      ],
      optionsEn: [
        'Hashim bin Abd Manaf',
        'Qusayy bin Kilab',
        'Abdul Muttalib',
        'Amr bin Luhayy',
      ],
      correctIndex: 0,
      explanationBn: 'হাশিম সর্বপ্রথম বছরে দুটি বাণিজ্যিক সফরের সূচনা করেন—একটি গ্রীষ্মকালে সিরিয়ায় এবং অপরটি শীতকালে ইয়েমেনে।',
      explanationEn: 'Hashim was the first to establish two seasonal caravans—summer to Syria and winter to Yemen.',
      sourceFootnote: 'ইবনে হিশাম ১/১৫৭ (পাদটীকা ৮৬)',
    },
    {
      id: 4,
      questionBn: 'আবদুল মুত্তালিবের প্রকৃত নাম কী ছিল এবং তাঁর চুল সাদা দেখে মা কী নাম রেখেছিলেন?',
      questionEn: 'What was the birth name of Abdul Muttalib, given by his mother due to white hairs?',
      optionsBn: [
        'শাইবা',
        'মুগীরা',
        'আসাদ',
        'ফাইয়্যায',
      ],
      optionsEn: [
        'Shaiba',
        'Mughira',
        'Asad',
        'Fayyaadh',
      ],
      correctIndex: 0,
      explanationBn: 'জন্মলগ্নে তাঁর মাথায় কয়েকটি চুল সাদা থাকায় মা সালমা তাঁর নাম রেখেছিলেন শাইবা (আরবিতে শাইবা অর্থ শুভ্র/পাকা চুল)।',
      explanationEn: 'Because he was born with a few white hairs, his mother Salma named him Shaiba (meaning grey/white-haired in Arabic).',
      sourceFootnote: 'ইবনে হিশাম ১/১৩৭ (পাদটীকা ৮৭)',
    },
    {
      id: 5,
      questionBn: 'যমযম কূপ পুনঃখননের নির্দেশ আবদুল মুত্তালিব কীভাবে পেয়েছিলেন?',
      questionEn: 'How did Abdul Muttalib receive the command to re-excavate the Well of Zamzam?',
      optionsBn: [
        'স্বপ্নে নির্দেশপ্রাপ্তির মাধ্যমে, যেখানে সুনির্দিষ্ট অবস্থানও বলে দেওয়া হয়েছিল',
        'একটি প্রাচীন শিলালিপি পড়ে',
        'সিরিয়ার গণকের পরামর্শে',
        'মদীনার মামাদের চিঠি পেয়ে',
      ],
      optionsEn: [
        'Through a divine dream where its exact location was revealed',
        'By reading an ancient inscription',
        'On the advice of a Syrian soothsayer',
        'From a letter sent by his Yathrib uncles',
      ],
      correctIndex: 0,
      explanationBn: 'আবদুল মুত্তালিব এক রাতে স্বপ্নে যমযম কূপ খননের আদেশ পান এবং এর সুনির্দিষ্ট অবস্থানও তাঁকে বিস্তারিতভাবে জানিয়ে দেওয়া হয়।',
      explanationEn: 'Abdul Muttalib saw in a dream the exact location of Zamzam and was commanded to excavate it.',
      sourceFootnote: 'ইবনে হিশাম ১/১৪২-১৪৭ (পাদটীকা ৯১)',
    },
    {
      id: 6,
      questionBn: 'যমযম কূপ খননের সময় মাটি খুঁড়ে আবদুল মুত্তালিব কী কী জিনিস পেয়েছিলেন?',
      questionEn: 'What historic items did Abdul Muttalib unearth when excavating Zamzam?',
      optionsBn: [
        'বনু জুরহুমের রেখে যাওয়া কিছু তরবারি, লৌহবর্ম ও দুটি সোনার হরিণ',
        'তামার পাত্র ও প্রাচীন স্বর্ণমুদ্রা',
        'রুপার থালা ও প্রাচীন রথ',
        'শুধুমাত্র মিষ্টি পানির ঝরনা',
      ],
      optionsEn: [
        'Swords, iron armor, and two golden deer left by Banu Jurhum',
        'Copper vessels and ancient gold coins',
        'Silver plates and a chariot',
        'Only freshwater spring without objects',
      ],
      correctIndex: 0,
      explanationBn: 'মাটির তলদেশে তিনি তরবারি, লৌহবর্ম ও দুটি সোনার হরিণ পান। তিনি তরবারি দিয়ে কাবার দরজা বানান এবং সোনার হরিণদ্বয় দরজার সম্মুখে স্থাপন করেন।',
      explanationEn: 'He unearthed swords, chain armor, and two golden deer left behind by Banu Jurhum before their exile.',
      sourceFootnote: 'ইবনে হিশাম ১/১৪২-১৪৭; তারীখে তাবারী ২/২৪৮',
    },
    {
      id: 7,
      questionBn: 'হস্তীবাহিনীর ঘটনা রাসূলুল্লাহ ﷺ-এর জন্মের কত দিন পূর্বে ঘটেছিল?',
      questionEn: 'How many days before the birth of Prophet Muhammad ﷺ did the Elephant Army incident occur?',
      optionsBn: [
        '৫০ কিংবা ৫৫ দিন আগে (মুহাররম মাসে, ৫৭১ খ্রি.)',
        '৩ মাস আগে',
        '১ বছর আগে',
        '১০ দিন আগে',
      ],
      optionsEn: [
        '50 or 55 days before (Muharram 571 CE)',
        '3 months before',
        '1 year before',
        '10 days before',
      ],
      correctIndex: 0,
      explanationBn: 'অধিকাংশ ঐতিহাসিকের মতে হস্তীবাহিনীর ঘটনা ঘটেছিল রাসূলুল্লাহ ﷺ-এর শুভ জন্মের ৫০ বা ৫৫ দিন আগে মুহাররম মাসে (৫৭১ খ্রিস্টাব্দের ফেব্রুয়ারি/মার্চ)।',
      explanationEn: 'The majority consensus dates the Elephant event to 50 or 55 days prior to the Prophet’s ﷺ birth in Muharram 571 CE.',
      sourceFootnote: 'ইবনে হিশাম ১/৪৩-৫৬ (পাদটীকা ৯২)',
    },
    {
      id: 8,
      questionBn: 'মুহাসসার উপত্যকায় আবরাহার হস্তীবাহিনীর ওপর নিক্ষিপ্ত কঙ্করগুলো কোন আকারের ছিল?',
      questionEn: 'What size were the pebbles dropped by the Ababil birds onto Abrahah’s army?',
      optionsBn: [
        'ছোলার (চনাবুটের) আকারের',
        'বিশাল পাহাড়ের পাথরের আকারের',
        'খেজুরের বীচির আকারের',
        'বালুর কণার মতো',
      ],
      optionsEn: [
        'Chickpea-sized (chanaboot)',
        'Bolder-sized mountain rocks',
        'Date-pit sized',
        'Sand-grain sized',
      ],
      correctIndex: 0,
      explanationBn: 'কিতাব অনুসারে প্রতিটি আবাবীল পাখির কাছে ছোলার (চনাবুটের) আকারের তিনটি করে কঙ্কর ছিল—একটি চঞ্চুতে এবং দুটি দুই পায়ে।',
      explanationEn: 'According to the source text, each Ababil bird carried three chickpea-sized baked clay pebbles—one in its beak and two in its claws.',
      sourceFootnote: 'ইবনে হিশাম ১/৪৩-৫৬',
    },
    {
      id: 9,
      questionBn: 'আবদুল্লাহর মুক্তিপণে সর্বমোট কতটি উট কুরবানী দেওয়া হয়েছিল এবং এর ফলে রক্তপণ কত নির্ধারিত হয়?',
      questionEn: 'How many camels were sacrificed as Abdullah’s ransom, establishing the standard blood money?',
      optionsBn: [
        '১০০টি উট',
        '৫০টি উট',
        '১০টি উট',
        '২০০টি উট',
      ],
      optionsEn: [
        '100 camels',
        '50 camels',
        '10 camels',
        '200 camels',
      ],
      correctIndex: 0,
      explanationBn: '১০টি করে বাড়িয়ে ১০ম বার লটারিতে ১০০ উট উঠলে ১০০টি উট কুরবানী করা হয় এবং আরবে রক্তপণ (দিয়াত) ১০ থেকে বাড়িয়ে ১০০ উট নির্ধারিত হয়।',
      explanationEn: '100 camels were drawn and slaughtered, permanently establishing the standard blood money at 100 camels.',
      sourceFootnote: 'ইবনে হিশাম ১/১৫১-১৫৫; তারীখে তাবারী ২/২৪৬',
    },
    {
      id: 10,
      questionBn: 'আবদুল্লাহর ইনতিকালের পর যে হাবশী দাসী তাঁর উত্তরাধিকার হিসেবে নবীজি ﷺ-এর সেবা করেন তাঁর নাম ও কুনিয়াত কী?',
      questionEn: 'What was the name and kunya of the Abyssinian nursemaid left by Abdullah who cared for infant Muhammad ﷺ?',
      optionsBn: [
        'নাম বারাকা, কুনিয়াত উম্মে আয়মন (রা.)',
        'নাম হালিমা, কুনিয়াত উম্মে সুলাইম',
        'নাম সুওয়াইবা, কুনিয়াত উম্মে মাবাদ',
        'নাম ফাতিমা, কুনিয়াত উম্মে হানী',
      ],
      optionsEn: [
        'Name Barakah, kunya Umm Ayman (r.a.)',
        'Name Halimah, kunya Umm Sulaym',
        'Name Thuwaybah, kunya Umm Ma\'bad',
        'Name Fatimah, kunya Umm Hani',
      ],
      correctIndex: 0,
      explanationBn: 'আবদুল্লাহ যে সহায়-সম্পত্তি রেখে যান তার মধ্যে ছিলেন হাবশী দাসী বারাকা (কুনিয়াত উম্মে আয়মন)। জন্মের পর নবীজি ﷺ তাঁর স্নেহেই লালিত হন।',
      explanationEn: 'The inheritance included the blessed Abyssinian maidservant Barakah (Umm Ayman r.a.), who held and tended the infant Prophet ﷺ.',
      sourceFootnote: 'সহীহ মুসলিম ৩/১৩৯২ (হাদীস ১৭৭১)',
    },
  ],
};
