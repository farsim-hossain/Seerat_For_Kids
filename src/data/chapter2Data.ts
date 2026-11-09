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

export interface LineagePartExtended {
  textBn: string;
  textEn: string;
  scholarlyNoteBn: string;
  scholarlyNoteEn: string;
  sourceBn: string;
  sourceEn: string;
}

export interface ChapterFootnote {
  id: number;
  citationBn: string;
  citationEn: string;
  topicBn: string;
  topicEn: string;
  pageBn: string;
  pageEn: string;
}

export interface AbdulMuttalibChild {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  relationBn: string;
  relationEn: string;
  gender: 'son' | 'daughter';
  titleBn?: string;
  titleEn?: string;
  fameBn: string;
  fameEn: string;
  islamicEraNoteBn?: string;
  islamicEraNoteEn?: string;
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

  // 1. Lineage Ancestors (Muhammad ﷺ to Adnan - 21 generations)
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
      significanceBn: 'আবদুল মুত্তালিবের সবচেয়ে প্রিয় ও নিষ্পাপ পুত্র। যার মুক্তিপণে ১০০ উট কুরবানী দেওয়া হয়েছিল।',
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

  // Lineage Part 2: Adnan to Prophet Ibrahim (A.S.)
  lineagePart2: {
    textBn: 'আদনান বিন উদাদ বিন হামাইসা\' বিন সালামাহ বিন আউস বিন বুয বিন কিমওয়াল বিন উবাই বিন আওয়াম বিন নাশেদ বিন হেযা বিন বুলদাস বিন ইউদলাফ বিন তাবিথ বিন জাহিম বিন নাহিশ বিন মাখী বিন ঈস বিন আবকর বিন আবীদ বিন দিয়া বিন হামদান বিন সিনবর বিন ইয়ারুবী বিন ইয়াহযুন বিন ইয়ালহুন বিন উরওয়া বিন আয়জ বিন দীশান বিন আয়সার বিন উফনান বিন আয়হাম বিন মুকসির বিন নাহিস বিন যারিহ বিন সামী বিন মুযী বিন আওজা বিন ইরাম বিন কায়দার বিন ইসমাঈল বিন ইবরাহীম আলাইহিস সালাম।',
    textEn: 'Adnan b. Udad b. Humaysa\' b. Salamah b. Aws b. Buz b. Qamwal b. Ubayy b. Awwam b. Nashid b. Haza b. Baldas b. Yadlaf b. Tabikh b. Jahim b. Nahish b. Makhi b. Ayd b. Abqar b. Ubayd b. Di\'a b. Hamdan b. Sinbar b. Yathrabi b. Yahzun b. Yalhan b. Urwah b. Ayd b. Deshan b. Aysar b. Afnan b. Ayham b. Muqsir b. Nahith b. Zarih b. Sami b. Mazzi b. Awda b. Iram b. Qaydar b. Ismail b. Ibrahim (Peace be upon them).',
    scholarlyNoteBn: 'দ্বিতীয় অংশের ব্যাপারে ঐতিহাসিক ও সীরাত লেখকদের মধ্যে মতানৈক্য রয়েছে। এ সংখ্যা গণনায় ত্রিশটিরও বেশি মত রয়েছে। একদল আলেম এ ব্যাপারে নীরব থাকাকে উত্তম বলেছেন। তবে সকলেরই ঐকমত্য রয়েছে যে আদনান হযরত ইসমাঈল (আ.)-এর প্রকৃত বংশধর।',
    scholarlyNoteEn: 'Scholars note significant divergence across historical narrations between Adnan and Prophet Ibrahim (AS), with over thirty variants. Many recommend silence on exact intermediate names, but all agree Adnan is a direct descendant of Ismail (AS).',
    sourceBn: 'তাবাকাতে ইবনে সা\'দ ১/৫৬, ৫৭; তারীখে তাবারী ২/২৭১-২৭৬; ফাতহুল বারী ৬/৬২১-৬২৩ [পাদটীকা ৮৪]',
    sourceEn: 'Tabaqat Ibn Sa\'d 1/56-57; Tarikh al-Tabari 2/271-276; Fath al-Bari 6/621-623 [Footnote 84]'
  } as LineagePartExtended,

  // Lineage Part 3: Prophet Ibrahim (A.S.) to Prophet Adam (A.S.)
  lineagePart3: {
    textBn: 'ইবরাহীম আ. বিন তারাহ—তার নাম আযর—বিন নাহুর বিন সারূ\'—অথবা সারূগ—বিন রা\'উ বিন ফালাখ বিন আবের বিন শালাখ বিন উরফাকশাদ বিন সাম বিন নূহ আ. বিন লামেক বিন মুতাওয়াশলাখ বিন আখসূখ—কারও মতে তিনি আল্লাহর নবী হযরত ইদরীস আ.— বিন ইয়ারদ বিন মাহলাইল বিন কীনান বিন আনুশ বিন শীস বিন আদম আলাইহিমুস সালাম।',
    textEn: 'Ibrahim (AS) b. Tarih (Azar) b. Nahur b. Saru\' (or Sarug) b. Ra\'u b. Falakh b. Abir b. Shalakh b. Arfakhshad b. Sam b. Nuh (AS) b. Lamik b. Mutawashlakh b. Akhnukh (Idris AS) b. Yarid b. Mahlayil b. Qinan b. Anush b. Sheeth b. Adam (Peace be upon them).',
    scholarlyNoteBn: 'তৃতীয় অংশের মূল ভিত্তি হলো আহলে কিতাবদের বর্ণনা। এতে বিস্তারিত বর্ণনা দিতে গিয়ে তারা বহু বিভ্রান্তি তৈরি করায় আমাদের সংযত থাকা সমীচীন। তবে মূল নবীগণের ধারাবাহিকতা সংরক্ষিত।',
    scholarlyNoteEn: 'The intermediate names from Ibrahim (AS) to Adam (AS) derive primarily from Isra\'iliyyat (People of the Book narrations), which contain discrepancies.',
    sourceBn: 'সীরাতে ইবনে হিশাম ২/২-৪; তারীখে তাবারী ২/২৭৬ [পাদটীকা ৮৫]',
    sourceEn: 'Sirah Ibn Hisham 2/2-4; Tarikh al-Tabari 2/276 [Footnote 85]'
  } as LineagePartExtended,

  // 2. The Children of Abdul Muttalib (10 Sons & 6 Daughters) - Uncles and Aunts of the Prophet ﷺ
  abdulMuttalibChildren: [
    {
      id: 'abdullah',
      nameBn: 'আব্দুল্লাহ',
      nameEn: 'Abdullah',
      nameAr: 'عَبْدُ اللَّهِ',
      relationBn: 'নবীজি ﷺ-এর সম্মানিত পিতা',
      relationEn: 'Beloved father of Prophet Muhammad ﷺ',
      gender: 'son',
      titleBn: 'আয-যবীহ (কুরবানীর জন্য মনোনীত)',
      titleEn: 'Adh-Dhabeeh (The Intended Sacrifice)',
      fameBn: 'আবদুল মুত্তালিবের সর্বাধিক প্রিয়, পবিত্র ও রূপবান সন্তান। যাঁর জন্য ১০০ উটের রক্তপণ দেওয়া হয়েছিল।',
      fameEn: 'The most beloved and chaste son of Abdul Muttalib, ransomed with 100 camels.',
    },
    {
      id: 'hamza',
      nameBn: 'হামযা (রা.)',
      nameEn: 'Hamzah (R.A.)',
      nameAr: 'حَمْزَةُ رَضِيَ اللَّهُ عَنْهُ',
      relationBn: 'নবীজি ﷺ-এর প্রিয় চাচা ও দুধভাই',
      relationEn: 'Uncle and foster brother of the Prophet ﷺ',
      gender: 'son',
      titleBn: 'আসাদুল্লাহ (আল্লাহর সিংহ) ও সাইয়্যিদুশ শুহাদা',
      titleEn: 'Lion of Allah & Master of Martyrs',
      fameBn: 'ইসলামের অন্যতম শ্রেষ্ঠ বীর ও সেনাপতি, যিনি বদর ও উহুদের যুদ্ধে অসামান্য বীরত্ব প্রদর্শন করেন।',
      fameEn: 'Supreme warrior of Islam who displayed legendary valor at Badr and Uhud.',
      islamicEraNoteBn: 'উহুদের যুদ্ধে শাহাদাত বরণ করেন। রাসূল ﷺ তাঁকে "সাইয়্যিদুশ শুহাদা" উপাধিতে ভূষিত করেন।',
      islamicEraNoteEn: 'Martyred at Uhud; honoured by the Prophet ﷺ as "Master of Martyrs".',
    },
    {
      id: 'abbas',
      nameBn: 'আব্বাস (রা.)',
      nameEn: 'Al-Abbas (R.A.)',
      nameAr: 'الْعَبَّاسُ رَضِيَ اللَّهُ عَنْهُ',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      titleBn: 'হাজীদের পানি পান করানোর দায়িত্বপ্রাপ্ত (সাক্বায়ে হারাম)',
      titleEn: 'Custodian of Siqayah (Watering Pilgrims)',
      fameBn: 'ইসলাম গ্রহণের পর মক্কায় মুসলিমদের গুপ্ত সংবাদ সরবরাহ করতেন এবং হুনায়নের যুদ্ধে অবিচল ছিলেন। আব্বাসীয় খিলাফতের প্রতিষ্ঠাতা পূর্বপুরুষ।',
      fameEn: 'Steadfast at the Battle of Hunayn; ancestral patriarch of the Abbasid Caliphate.',
    },
    {
      id: 'abu_talib',
      nameBn: 'আবু তালিব (আসল নাম: আবদে মানাফ)',
      nameEn: 'Abu Talib (Abd Manaf)',
      nameAr: 'أَبُو طَالِبٍ (عَبْدُ مَنَافٍ)',
      relationBn: 'নবীজি ﷺ-এর স্নেহের অভিভাবক চাচা',
      relationEn: 'Protector and loving guardian uncle',
      gender: 'son',
      titleBn: 'কুরাইশের প্রবীণ নেতা ও আলীর (রা.) পিতা',
      titleEn: 'Elder of Quraysh & Father of Ali (RA)',
      fameBn: 'আবদুল মুত্তালিবের ইনতিকালের পর থেকে আমৃত্যু নবীজি ﷺ-কে নিজ সন্তানের চেয়ে বেশি ভালোবাসেন ও কুরাইশের অত্যাচার থেকে বুক দিয়ে আগলে রাখেন।',
      fameEn: 'Sheltered and fiercely defended the Prophet ﷺ against Quraysh persecution throughout his life.',
    },
    {
      id: 'harith',
      nameBn: 'হারিস',
      nameEn: 'Al-Harith',
      nameAr: 'الْحَارِثُ',
      relationBn: 'আবদুল মুত্তালিবের জ্যেষ্ঠ পুত্র',
      relationEn: 'Eldest son of Abdul Muttalib',
      gender: 'son',
      fameBn: 'যমযম কূপ পুনঃখননের সময় আবদুল মুত্তালিবের একমাত্র জীবিত ও সহায়তাকারী পুত্র ছিলেন। তাঁর নামেই আবদুল মুত্তালিবের কুনিয়াত "আবু হারিস" ছিল।',
      fameEn: 'The only son alive assisting Abdul Muttalib during the initial excavation of Zamzam; hence his kunya was Abu al-Harith.',
    },
    {
      id: 'zubayr',
      nameBn: 'যুবায়ের',
      nameEn: 'Az-Zubayr',
      nameAr: 'الزُّبَيْرُ',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      fameBn: 'হিলফুল ফুযুল (শান্তি চুক্তি)-এর অন্যতম মূল উদ্যোক্তা ও কুরাইশের সম্মানিত কবি-নেতা ছিলেন।',
      fameEn: 'A prime initiator of Hilf al-Fudul (Pact of Chivalry) and a respected elder of Banu Hashim.',
    },
    {
      id: 'abu_lahab',
      nameBn: 'আবু লাহাব (আসল নাম: আবদুল উজ্জা)',
      nameEn: 'Abu Lahab (Abdul Uzza)',
      nameAr: 'أَبُو لَهَبٍ (عَبْدُ الْعُزَّى)',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      fameBn: 'রূপের লালচে উজ্জ্বলতার কারণে আবু লাহাব নামে পরিচিত ছিল। ইসলামের চরম শত্রুতা করে ধ্বংসপ্রাপ্ত হয়, যাঁর সম্পর্কে সূরা আল-লাহাব অবতীর্ণ হয়েছে।',
      fameEn: 'Titled Abu Lahab for his ruddy complexion; became a fierce adversary of Islam mentioned in Surah al-Lahab.',
    },
    {
      id: 'ghaydaq',
      nameBn: 'গায়দাক',
      nameEn: 'Al-Ghaydaq',
      nameAr: 'الْغَيْدَاقُ',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      fameBn: 'অত্যন্ত দানশীল ছিলেন, যে কারণে তাঁকে গায়দাক (অঢেল দাতা) বলা হতো। কারও মতে তাঁর অপর নাম ছিল হাজল।',
      fameEn: 'Renowned for lavish generosity (Ghaydaq means abundant giver); also referred to as Hajal.',
    },
    {
      id: 'muqawwim',
      nameBn: 'মুকাওউইম',
      nameEn: 'Al-Muqawwim',
      nameAr: 'الْمُقَوِّمُ',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      fameBn: 'কারও কারও মতে তাঁর অপর নাম ছিল আবদুল কাবা।',
      fameEn: 'Mentioned by some historians as also bearing the name Abdul Ka\'bah.',
    },
    {
      id: 'dirar',
      nameBn: 'যিরার',
      nameEn: 'Dirar',
      nameAr: 'ضِرَارٌ',
      relationBn: 'নবীজি ﷺ-এর চাচা',
      relationEn: 'Uncle of the Prophet ﷺ',
      gender: 'son',
      fameBn: 'আব্বাস (রা.)-এর সহোদর ভাই ছিলেন এবং যৌবনেই ইনতিকাল করেন।',
      fameEn: 'Full brother of Al-Abbas (RA); passed away before the advent of Islam.',
    },
    // Daughters (Aunts of the Prophet ﷺ)
    {
      id: 'safiyyah',
      nameBn: 'সাফিয়্যা (রা.)',
      nameEn: 'Safiyyah (R.A.)',
      nameAr: 'صَفِيَّةُ رَضِيَ اللَّهُ عَنْهَا',
      relationBn: 'নবীজি ﷺ-এর ফুফু',
      relationEn: 'Aunt of the Prophet ﷺ',
      gender: 'daughter',
      titleBn: 'হাওয়ারী যুবায়ের বিন আওয়ামের (রা.) মা',
      titleEn: 'Mother of Az-Zubayr bin al-Awwam (RA)',
      fameBn: 'ইসলাম গ্রহণকারী মহীয়সী সাহাবী নারী, যিনি খন্দকের যুদ্ধে সাহসিকতার সাথে শত্রুকে প্রতিহত করেছিলেন। হামযা (রা.)-এর সহোদর বোন।',
      fameEn: 'Heroic companion who valiantly defended the fortress during Khandaq; full sister of Hamzah (RA).',
    },
    {
      id: 'umm_hakim_bayda',
      nameBn: 'উম্মে হাকীম (আল-বায়যা)',
      nameEn: 'Umm Hakim (Al-Bayda)',
      nameAr: 'أُمُّ حَكِيمٍ (الْبَيْضَاءُ)',
      relationBn: 'নবীজি ﷺ-এর ফুফু ও আব্দুল্লাহর জমজ বোন',
      relationEn: 'Aunt of the Prophet ﷺ (twin sister of Abdullah)',
      gender: 'daughter',
      fameBn: 'আবদুল্লাহর সাথে জমজ সন্তান হিসেবে জন্মগ্রহণ করেছিলেন। তিনি উসমান (রা.)-এর মা আরওয়া বিনতে কুরাইযের নানী ছিলেন।',
      fameEn: 'Twin sister of Abdullah (the Prophet’s father); grandmother of Arwa (mother of Caliph Uthman RA).',
    },
    {
      id: 'barrah',
      nameBn: 'বাররা',
      nameEn: 'Barrah',
      nameAr: 'بَرَّةُ',
      relationBn: 'নবীজি ﷺ-এর ফুফু',
      relationEn: 'Aunt of the Prophet ﷺ',
      gender: 'daughter',
      fameBn: 'উম্মুল মুমিনীন মায়মুনা (রা.) ও আবু সালামা (রা.)-এর নিকটাত্মীয়।',
      fameEn: 'Paternal aunt; mother of Abu Salamah (RA), the illustrious early companion.',
    },
    {
      id: 'atika',
      nameBn: 'আতেকা',
      nameEn: 'Atikah',
      nameAr: 'عَاتِكَةُ',
      relationBn: 'নবীজি ﷺ-এর ফুফু',
      relationEn: 'Aunt of the Prophet ﷺ',
      gender: 'daughter',
      fameBn: 'বদর যুদ্ধের পূর্বে মক্কায় ঐতিহাসিক সতর্কতামূলক স্বপ্ন দেখেছিলেন যা কুরাইশদের বিনাশের ভবিষ্যদ্বাণী করেছিল।',
      fameEn: 'Remembered for her prescient dream warning Makkah prior to their defeat at Badr.',
    },
    {
      id: 'arwa',
      nameBn: 'আরওওয়া',
      nameEn: 'Arwa',
      nameAr: 'أَرْوَى',
      relationBn: 'নবীজি ﷺ-এর ফুফু',
      relationEn: 'Aunt of the Prophet ﷺ',
      gender: 'daughter',
      fameBn: 'মদীনায় হিজরতকারী ও ইসলাম গ্রহণকারী সম্মানিত সাহাবী নারী। তুলাইব বিন উমায়েরের মা।',
      fameEn: 'Embraced Islam and migrated to Madinah; mother of companion Tulayb bin Umayr (RA).',
    },
    {
      id: 'umayma',
      nameBn: 'উমাইমা',
      nameEn: 'Umaymah',
      nameAr: 'أُمَيْمَةُ',
      relationBn: 'নবীজি ﷺ-এর ফুফু',
      relationEn: 'Aunt of the Prophet ﷺ',
      gender: 'daughter',
      fameBn: 'উম্মুল মুমিনীন যয়নব বিনতে জাহশ (রা.) ও বিশিষ্ট সাহাবী আব্দুল্লাহ বিন জাহশ (রা.)-এর মা।',
      fameEn: 'Mother of Mother of the Believers Zaynab bint Jahsh (RA) and companion Abdullah bin Jahsh (RA).',
    },
  ],

  // 3. The 5 Main Story Stations
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
      historicalContextBn: 'বনু আবদে মানাফ ও বনু আব্দুদ্দারের ঐতিহাসিক চুক্তির পর হাজীদের পানি পান করানো (সিকায়া) এবং খাদ্য পরিবেশনের (রিফাদা) গুরুদায়িত্ব হাশিম লাভ করেন। ব্যবসা উপলক্ষে তিনি সিরিয়া যাওয়ার পথে ইয়াসরিবে বনু আদী বিন নাজ্জারের সালমা বিনতে আমরকে বিবাহ করেন। সেখানে শাইবা (আবদুল মুত্তালিব)-এর জন্ম হয়। হাশিম ফিলিস্তিনের গাযা শহরে ইনতিকাল করেন। হাশিমের চার ছেলে (আসাদ, আবু সাইফী, নাযলা ও আবদুল মুত্তালিব) এবং পাঁচ মেয়ে (শিফা, খালেদা, জয়ীফা, রুকাইয়্যা ও জান্নাহ) ছিলেন।',
      historicalContextEn: 'Following the pact between Banu Abd Manaf and Banu Abd ad-Dar, Hashim received the vital portfolios of Siqayah (providing water) and Rifadah (feeding pilgrims). On a trade trip toward Syria, he married Salma bint Amr of Banu Najjar in Yathrib. There, Shaiba (Abdul Muttalib) was born in 497 CE. Hashim passed away in Gaza, Palestine. Hashim had four sons (Asad, Abu Saifi, Nazla, Abdul Muttalib) and five daughters (Shifa, Khalida, Da\'ifa, Ruqayyah, Jannah).',
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
      titleBn: 'আবদুল মুত্তালিব, যমযমের পুনঃখনন ও মরুভূমির পানির অলৌকিক পরীক্ষা',
      titleEn: 'Abdul Muttalib, Zamzam & The Desert Water Miracle',
      titleAr: 'حَفْرُ زَمْزَمَ وَآيَةُ الْمَاءِ فِي الْبَادِيَةِ',
      taglineBn: 'স্বপ্নে নির্দেশপ্রাপ্তি, জুরহুমদের লুকানো স্বর্ণের হরিণ উদ্ধার ও মরুভূমিতে পানির অলৌকিক সুরহা',
      taglineEn: 'The dream guidance, unearthing Jurhum treasures, and the desert water sign that silenced Quraysh',
      imageKey: 'zamzam_rediscovery_ancient',
      summaryBn: 'শাইবা তাঁর চাচা মুত্তালিবের সাথে মক্কায় আসার পর "আবদুল মুত্তালিব" নামে পরিচিত হন। এক রাতে তিনি স্বপ্নে যমযম কূপ পুনঃখননের নির্দেশ পান। মাটি খনন করে তিনি বনু জুরহুমের লুকানো তরবারি ও দুটি স্বর্ণের হরিণ উদ্ধার করেন। কুরাইশরা অংশীদার হতে চাইলে বিরোধ সৃষ্টি হয়। সুরহার উদ্দেশ্যে সিরিয়ার গণকের কাছে যাওয়ার পথে মরুভূমিতে পানির তীব্র সংকট দেখা দেয়। যখন সবাই মৃত্যুর আশঙ্কায় নিজেদের কবর খুঁড়তে শুরু করেছিল, তখন আবদুল মুত্তালিবের উটের খুরের নিচ থেকে অলৌকিকভাবে সুমিষ্ট পানি উপচে পড়ে! কুরাইশরা মাথা নত করে যমযমের নিরঙ্কুশ অধিকার আবদুল মুত্তালিবকে সঁপে দেয়।',
      summaryEn: 'Shaiba came to Makkah with uncle Muttalib and was titled "Abdul Muttalib". In a divine dream, he was commanded to excavate the well of Zamzam. Digging at the spot, he recovered buried swords and two golden deer left by Banu Jurhum. When Quraysh disputed his sole guardianship, they journeyed to Syria to seek arbitration. In the scorching desert, water ran out completely. Facing imminent death, they were digging their own graves when freshwater miraculously gushed from beneath Abdul Muttalib’s camel hooves! Quraysh yielded on the spot, conceding Zamzam solely to him.',
      historicalContextBn: 'মুত্তালিব ইয়েমেনের রিদমানে মারা গেলে নওফল আবদুল মুত্তালিবের সম্পত্তি দখল করে নেয়। মদীনা থেকে মামা আবু সা\'দ বিন আদী ৮০ জন সওয়ার নিয়ে এসে হাতীমে নাঙ্গা তরবারি তুলে নওফলকে বাধ্য করেন সম্পত্তি ফিরিয়ে দিতে। এরপর বনু খুযা\'আও বনু হাশিমের সাথে ঐতিহাসিক মৈত্রী চুক্তি করে—যা বহু বছর পর মক্কা বিজয়ের প্রত্যক্ষ কারণ হয়! যমযম বিরোধ নিষ্পত্তির পর আবদুল মুত্তালিব মানত করেন—যদি তাঁকে ১০টি ছেলে সন্তান দেওয়া হয় তবে একজনকে তিনি কাবার কাছে কুরবানী দিবেন।',
      historicalContextEn: 'When Muttalib died in Ridman (Yemen), Nawfal usurped his estate. Maternal uncle Abu Sa\'d arrived from Yathrib with 80 horsemen, drawing his bare sword over Nawfal\'s head at Hateem until all properties were returned. Seeing this loyalty, Banu Khuza\'a formed a sacred mutual defense pact with Banu Hashim—which decades later directly caused the Conquest of Makkah! Following the desert Zamzam miracle, Abdul Muttalib made his solemn vow (Nadhr) to sacrifice one son to Allah if blessed with ten protective sons.',
      keyEventsBn: [
        'মুত্তালিব কর্তৃক মদীনায় গিয়ে ভ্রাতুষ্পুত্র শাইবাকে মক্কায় আনা এবং "আবদুল মুত্তালিব" নামের প্রসার।',
        'মদীনার মামা আবু সা\'দের ৮০ জন অশ্বারোহী নিয়ে হাতীমে তরবারি তুলে নওফলের বিরুদ্ধে অধিকার প্রতিষ্ঠা ও ঐতিহাসিক খুযা\'আ মৈত্রী।',
        'স্বপ্নে যমযম কূপের সুনির্দিষ্ট অবস্থান দর্শন এবং মাটিতে লুকানো জুরহুমদের তরবারি ও দুটি স্বর্ণের হরিণ উদ্ধার।',
        'সিরিয়ার পথে মরুভূমিতে চরম পানির তৃষ্ণা, কবর খোঁড়ার নৈরাশ্য ও আবদুল মুত্তালিবের উটের পায়ের তলা থেকে অলৌকিক সুপেয় পানির প্রবাহ।',
        'কুরাইশের স্বীকারোক্তি: "যিনি মরুভূমিতে পানি দিলেন তিনিই আপনাকে যমযম দান করেছেন!" এবং আবদুল মুত্তালিবের ১০ পুত্র হলে কুরবানী দেওয়ার মানত।',
      ],
      keyEventsEn: [
        'Muttalib brought Shaiba from Yathrib to Makkah on his camel; people titled him "Abdul Muttalib".',
        'Uncle Abu Sa\'d of Banu Najjar arrived with 80 horsemen to restore his rights against Nawfal at Hateem; Khuza\'a treaty formed.',
        'Received divine dream locating the hidden Well of Zamzam; unearthed buried swords and two golden deer.',
        'Facing death by thirst in the Syrian desert, companions dug their graves until sweet freshwater gushed from under his camel.',
        'Quraysh conceded sole custodianship on the spot; Abdul Muttalib made his historic vow to sacrifice one son if blessed with ten.',
      ],
      footnotes: ['ইবনে হিশাম ১/১৩৭, ১৩৮', 'তারীখে তাবারী ২/২৪৭-২৫১', 'ইবনে হিশাম ১/১৪২-১৪৭'],
      moralLessonBn: 'ন্যায্য অধিকার রক্ষা, বিপদের মুহূর্তে অবিচল থাকা এবং চরম সংকটেও আল্লাহর রহমত থেকে কখনো নিরাশ না হওয়ার শিক্ষা।',
      moralLessonEn: 'Upholding justice, defending inherited rights, and never despairing of Allah’s mercy even on the brink of death.',
      journalUnlockBn: 'যমযম কূপ পুনঃখনন, মরুভূমির পানির পরীক্ষা ও খুযা\'আ মৈত্রী উন্মোচিত',
      journalUnlockEn: 'Discovered Zamzam Rediscovery, Desert Water Sign & The Khuza\'a Alliance',
    },
    {
      id: 'elephant_army_571',
      titleBn: 'হস্তীবাহিনীর অলৌকিক ধ্বংস ও কাবার বৈশ্বিক শ্রেষ্ঠত্ব (আমুল ফীল - ৫৭১ খ্রি.)',
      titleEn: 'The Year of the Elephant & Global Geopolitics (571 CE)',
      titleAr: 'حَادِثَةُ الْفِيلِ وَحِفْظُ الْبَيْتِ الْعَتِيقِ',
      taglineBn: 'আবরাহার ৬০ হাজার সৈন্য ও মাহমুদ হাতি, মুহাসসার উপত্যকা, আবাবীল পাখি এবং কাবা বনাম বায়তুল মুকাদ্দাস',
      taglineEn: 'Abrahah’s 60,000 army, Mahmoud the elephant, Ababil birds, and Ka\'bah vs. Jerusalem mystery',
      imageKey: 'wadi_muhassir_elephant_storm',
      summaryBn: 'ইয়েমেনের গভর্নর আবরাহা সানা\'য় বিশাল গির্জা (আল-কুল্লাইস) নির্মাণ করে আরবদের হজ্জ সেখানে ঘোরানোর চক্রান্ত করে। ব্যর্থ হয়ে সে ৬০ হাজার সৈন্য ও প্রকাণ্ড যুদ্ধহাতী নিয়ে কাবা ধ্বংস করতে আসে। মীনা ও মুযদালিফার মাঝামাঝি মুহাসসার উপত্যকায় মাহমুদ হাতী কাবার দিকে এগোতে অস্বীকৃতি জানায়। আল্লাহ আবাবীল পাখির ঝাঁক পাঠিয়ে কঙ্কর নিক্ষেপ করে আবরাহার পুরো বাহিনীকে ভক্ষিত তৃণের ন্যায় ধ্বংস করে দেন।',
      summaryEn: 'Abrahah, governor of Yemen, built a lavish cathedral in Sana\'a to divert the Arabian pilgrimage. Infuriated by Arab resistance, he marched with 60,000 soldiers and giant war elephants to demolish the Ka\'bah. At Wadi Muhassir, his lead elephant Mahmoud knelt and refused to step towards Makkah. Flocks of Ababil birds showered them with baked clay pebbles, crushing them like eaten straw.',
      historicalContextBn: 'ঘটনাটি ঘটেছিল রাসূলুল্লাহ ﷺ-এর জন্মের ৫০ বা ৫৫ দিন পূর্বে, মুহাররম মাসে (৫৭১ খ্রিস্টাব্দের ফেব্রুয়ারি বা মার্চ)। ইতিহাসের এক গভীর রহস্য হলো—বায়তুল মুকাদ্দাস অতীতে দুইবার ধ্বংস হয়েছিল (৫৭৮ খ্রি.পূ. বুখতেনাসার কর্তৃক এবং ৭০ খ্রি. রোমানদের দ্বারা), যখন তার অধিবাসীরা ছিল ঈমানদার। অথচ কাবা শরীফকে আল্লাহ কোনো মানবীয় সৈন্য ছাড়া অলৌকিকভাবে রক্ষা করলেন যখন কাবার অধিবাসীরা ছিল মুশরিক! কারণ আল্লাহ পুরো বিশ্বকে (রোম ও পারস্যকে) বুঝিয়ে দিলেন যে, এই সেই পবিত্র ঘর যাকে তিনি সর্বশেষ নবীর জন্য মনোনীত করেছেন। এ ঘটনার পর পারস্যরা দৌড়ে ইয়েমেনে চলে আসে এবং তৎকালীন দুই পরাশক্তি কাবার ঐশ্বরিক মর্যাদা স্বীকার করে নেয়।',
      historicalContextEn: 'This occurred 50 to 55 days before the birth of Prophet Muhammad ﷺ in Muharram 571 CE. A profound historical mystery highlights that Jerusalem (Bayt al-Maqdis) was overrun twice (in 586 BC by Nebuchadnezzar and 70 CE by Romans) when its residents were believers, yet Christian Habashah was completely obliterated when attempting to conquer the Ka\'bah, even though its guardians were idolaters! Allah did this to showcase the supreme sanctuary to superpowers (Rome and Persia), heralding the advent of the final Messenger ﷺ.',
      keyEventsBn: [
        'আবরাহা কর্তৃক সানা\'য় বিশাল গির্জা (আল-কুল্লাইস) নির্মাণ ও আরবদের কাবা থেকে সরানোর অপচেষ্টা।',
        '৬০,০০০ সৈন্য ও ৯ থেকে ১৩টি যুদ্ধহাতী নিয়ে আবরাহার মক্কা অভিমুখে আগ্রাসন।',
        'মুহাসসার উপত্যকায় প্রধান হাতী মাহমুদ কাবার দিকে বসে পড়লেও অন্য দিকে জোর কদমে দৌড়ানোর অলৌকিক ঘটনা।',
        'ঝাঁকে ঝাঁকে আবাবীল পাখির আগমন; প্রতিটি পাখির চঞ্চু ও দুই পায়ে ছোলার ন্যায় ৩টি করে কঙ্করের আঘাত।',
        'আবরাহার শোচনীয় অঙ্গহীনতা ও সানা\'য় ফিরে বুক ফেটে মৃত্যু।',
        'কাবা বনাম বায়তুল মুকাদ্দাসের ঐতিহাসিক তুলনা এবং পারস্য ও রোমের সম্মুখে কাবার বিশ্বজনীন মর্যাদা প্রতিষ্ঠা।',
      ],
      keyEventsEn: [
        'Abrahah constructed the opulent Al-Qullays cathedral in Sana\'a to divert pilgrimage away from Makkah.',
        'Marched toward Makkah with 60,000 troops and 9 to 13 giant war elephants.',
        'At Wadi Muhassir, lead elephant Mahmoud knelt toward the Ka\'bah but rushed willingly in other directions.',
        'Swarms of Ababil birds arrived carrying 3 baked clay pebbles each (in beak and claws), pulverizing the invaders.',
        'Abrahah contracted an agonizing disease where his fingers dropped off, dying in Sana\'a with a burst chest.',
        'The Ka\'bah vs. Jerusalem theological contrast and the dawn of global recognition before the Prophet’s ﷺ birth.',
      ],
      footnotes: ['ইবনে হিশাম ১/৪৩-৫৬', 'সূরা আল-ফীল ও তাফসীর গ্রন্থসমূহ'],
      moralLessonBn: 'অহংকার ও দাম্ভিকতার অবধারিত পতন এবং মহান আল্লাহর ওপর অটুট বিশ্বাসের শিক্ষা।',
      moralLessonEn: 'The inevitable ruin of arrogance and the invincible might of divine protection over sacred truth.',
      journalUnlockBn: 'আমুল ফীল (হস্তী বছর ৫৭১ খ্রি.), আবাবীল পাখি ও কাবার বৈশ্বিক মর্যাদা উন্মোচিত',
      journalUnlockEn: 'Discovered the Year of the Elephant (571 CE) & Ka\'bah\'s Global Glory',
    },
    {
      id: 'abdullah_ransom_100_camels',
      titleBn: 'আবদুল্লাহর মানত, ১০০ উটের মুক্তিপণ ও ৩ বার অতিরিক্ত লটারি',
      titleEn: 'The Ransom of Abdullah with 100 Camels & 3-Fold Verification',
      titleAr: 'فِدَاءُ عَبْدِ اللَّهِ وَتَكْرَارُ الْقُرْعَةِ ثَلَاثَ مَرَّاتٍ',
      taglineBn: 'লটারিতে প্রিয় পুত্রের নাম, কুরাইশের প্রতিরোধ, ১০ বারে ১০০ উট এবং ৩ বার নিশ্চিতকরণ',
      taglineEn: 'The lottery for Abdullah, Quraysh intervention, reaching 100 camels, and repeating the draw 3 times',
      imageKey: 'azlam_divination_arrows',
      summaryBn: 'আবদুল মুত্তালিবের ১০ জন পুত্রসন্তান প্রাপ্তির পর তিনি মানত পূরণের উদ্দেশ্যে লটারি করেন। লটারিতে তাঁর সর্বাধিক প্রিয় ও নিষ্পাপ পুত্র আব্দুল্লাহর নাম ওঠে। কুরাইশ, আবু তালিব ও বনু মাখযূমের তীব্র বাধার মুখে গণকের পরামর্শে আব্দুল্লাহ ও উটের মধ্যে লটারি চালানো হয়। প্রতিবারে ১০টি করে উট বাড়ানো হতে থাকে। অবশেষে ১০০ উট পূর্ণ হলে লটারিতে উটের নাম ওঠে। সম্পূর্ণ নিশ্চিত ও প্রশান্ত হওয়ার জন্য আবদুল মুত্তালিব আরও ৩ বার লটারি দিলেন—প্রতিবারই উটের নাম উঠল! ১০০ উট কুরবানী করে আব্দুল্লাহ মুক্ত হলেন।',
      summaryEn: 'Having been blessed with ten protective sons, Abdul Muttalib prepared to fulfill his solemn vow. When the lots were cast at Hubal, the name of his most cherished son, Abdullah, emerged. Quraysh, Abu Talib, and Banu Makhzum passionately intervened. Following an arbiter’s counsel, lots were cast between Abdullah and camels, increasing by ten each round until 100 camels were drawn. To be absolutely confident of divine pleasure, Abdul Muttalib repeated the draw three additional times—each time the camels emerged! 100 camels were slaughtered, ransoming Abdullah.',
      historicalContextBn: 'আরবে পূর্বে রক্তপণ (দিয়ত) ছিল ১০টি উট। আব্দুল্লাহর এই মুক্তিপণের ঘটনার পর থেকে আরবে ও পরবর্তীকালে ইসলামে দিয়তের পরিমাণ ১০০ উট হিসেবে সুপ্রতিষ্ঠিত হয়। এ কারণেই রাসূলে কারীম ﷺ বলতেন: "আমি দুই যবীহের সন্তান—হযরত ইসমাঈল (আ.) ও আমার পিতা আব্দুল্লাহ।" আবদুল মুত্তালিবের ১০ জন ছেলে ও ৬ জন মেয়ে ছিলেন—যাঁদের মধ্যে হামযা (রা.), আব্বাস (রা.), আবু তালিব ও সাফিয়্যা (রা.) ইসলামের ইতিহাসের শীর্ষ ব্যক্তিত্ব।',
      historicalContextEn: 'Previously, Arabian blood money (diyah) was set at ten camels. Following Abdullah’s ransom, the standard blood money across Arabia and permanently ratified in Islam became 100 camels. Hence the Prophet ﷺ proudly declared: "I am the son of the two sacrificed ones—Ismail (a.s.) and my father Abdullah." Abdul Muttalib’s children included titans of Islamic history such as Hamzah (RA), Al-Abbas (RA), Abu Talib, and Safiyyah (RA).',
      keyEventsBn: [
        'আবদুল মুত্তালিবের ১০ পুত্রের বিনাবাক্যে পিতার মানত পালনের আনুগত্য প্রকাশ।',
        'লটারিতে সবচেয়ে সুন্দর ও পবিত্র পুত্র আব্দুল্লাহর নাম ওঠা এবং কাবার সামনে ধারালো ছুরি নিয়ে যাওয়ার দৃশ্য।',
        'কুরাইশ নেতা, আবু তালিব ও বনু মাখযূমের (আবদুল্লাহর মামাবংশ) তীব্র প্রতিরোধ।',
        '১০টি করে উট বাড়িয়ে লটারি প্রদান; ১০ম বারে ১০০ উটের নাম ওঠা।',
        'সম্পূর্ণ নিশ্চিত হওয়ার জন্য আবদুল মুত্তালিব কর্তৃক আরও ৩ বার লটারি পুনরান্বেষণ ও প্রতিবারই উট নির্বাচিত হওয়া।',
        '১০০ উট কুরবানী করে মানুষ ও বন্যপ্রাণীর জন্য খাদ্য উন্মুক্তকরণ এবং ইসলামে রক্তপণ ১০০ উট নির্ধারণ।',
      ],
      keyEventsEn: [
        'The ten sons demonstrated unquestioning obedience to their father’s sacred oath.',
        'The lot fell upon Abdullah, the most handsome and beloved son, taken toward the Ka\'bah.',
        'Quraysh elders, Abu Talib, and Banu Makhzum (Abdullah\'s maternal uncles) intervened fiercely.',
        'Lots cast between Abdullah and camels, increasing by 10 each round until 100 camels were drawn.',
        'Abdul Muttalib repeated the draw 3 additional times to be completely sure—each lot chose the camels.',
        '100 camels sacrificed and distributed freely to all humans and wildlife, cementing 100-camel diyah.',
      ],
      hadithOrQuoteBn: 'রাসূলে কারীম ﷺ ইরশাদ করেছেন: "আমি দুই যবীহের সন্তান—হযরত ইসমাঈল (আ.) ও আমার পিতা আব্দুল্লাহ।"',
      hadithOrQuoteEn: 'The Messenger of Allah ﷺ stated: "I am the son of the two sacrificed ones—Ismail (a.s.) and my father Abdullah."',
      footnotes: ['সীরাতে ইবনে হিশাম ১/১০৮, ১০৯', 'তারীখে তাবারী ২/২৩৯', 'ইবনে হিশাম ১/১৫১-১৫৫', 'রওযুল আনফু ১/১৪৪'],
      moralLessonBn: 'পিতামাতার আনুগত্য, প্রতিশ্রুতি রক্ষা এবং মানবজীবনের সম্মান রক্ষার্থে সম্পদের ত্যাগ স্বীকারের শিক্ষা।',
      moralLessonEn: 'Filial devotion, fulfilling solemn covenants, and sacrificing immense wealth to preserve noble human life.',
      journalUnlockBn: 'আব্দুল্লাহর মুক্তিপণ (১০০ উট), ৩ বার যাচাই ও "দুই যবীহের সন্তান" তত্ত্ব উন্মোচিত',
      journalUnlockEn: 'Discovered The Ransom of Abdullah (100 Camels & 3-Fold Verification)',
    },
    {
      id: 'abdullah_marriage_passing',
      titleBn: 'আব্দুল্লাহর বিবাহ, মদীনায় অন্তিম বিদায় ও উম্মে আয়মান',
      titleEn: "Abdullah's Marriage, Passing in Yathrib & Umm Ayman",
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

  // 4. Quizzes (13 comprehensive questions)
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
      questionBn: 'যমযম কূপ বিরোধে সিরিয়ার পথে মরুভূমিতে পানির চরম সংকটের সময় কী অলৌকিক ঘটনা ঘটেছিল?',
      questionEn: 'During the journey toward Syria regarding the Zamzam dispute, what miracle occurred in the desert?',
      optionsBn: [
        'আবদুল মুত্তালিবের উট দাঁড়াতেই তার খুরের নিচ থেকে মিষ্টি পানি উথলে ওঠে',
        'আকাশ থেকে মুষলধারে বৃষ্টি বর্ষিত হয়',
        'একটি হরিণ পথ দেখিয়ে জলাশয়ে নিয়ে যায়',
        'হঠাৎ একটি কাফেলা এসে পানি দান করে',
      ],
      optionsEn: [
        'Fresh sweet water miraculously welled up from beneath Abdul Muttalib’s camel hooves',
        'Torrential rain poured on everyone from the sky',
        'A deer guided them to an oasis',
        'A passing caravan supplied them with water',
      ],
      correctIndex: 0,
      explanationBn: 'যখন সকলে পানির অভাবে মৃত্যুর অপেক্ষায় নিজেদের কবর খুঁড়ছিল, তখন আবদুল মুত্তালিবের উট উঠতেই তার পায়ের তলা থেকে মিষ্টি পানি বের হয়, যা দেখে কুরাইশরা যমযমের দাবি ছেড়ে দেয়।',
      explanationEn: 'When all companions were digging their own graves in despair, water gushed from under Abdul Muttalib\'s camel, convincing Quraysh to yield.',
      sourceFootnote: 'ইবনে হিশাম ১/১৪২-১৪৭ (পাদটীকা ৯১)',
    },
    {
      id: 6,
      questionBn: 'নওফলের সম্পত্তি দখলের পর মদীনা থেকে আবদুল মুত্তালিবের কোন মামা ৮০ জন অশ্বারোহী নিয়ে হাতীমে উপস্থিত হন?',
      questionEn: 'Which maternal uncle arrived from Yathrib with 80 horsemen to defend young Abdul Muttalib at Hateem?',
      optionsBn: [
        'আবু সা\'দ বিন আদী (বনু নাজ্জার)',
        'হামযা বিন আবদুল মুত্তালিব',
        'সা\'দ বিন উবাদাহ',
        'আস\'আদ বিন যুরারাহ',
      ],
      optionsEn: [
        'Abu Sa\'d bin Adi (Banu Najjar)',
        'Hamzah bin Abdul Muttalib',
        'Sa\'d bin Ubadah',
        'As\'ad bin Zurarah',
      ],
      correctIndex: 0,
      explanationBn: 'মদীনার বনু নাজ্জারের মামা আবু সা\'দ বিন আদী ৮০ জন সওয়ার নিয়ে এসে হাতীমে নওফলের মাথার ওপর নাঙ্গা তরবারি তুলে সম্পত্তি ফিরিয়ে নেন।',
      explanationEn: 'Uncle Abu Sa\'d bin Adi of Banu Najjar arrived with 80 horsemen, raising his sword over Nawfal at Hateem to restore his nephew\'s rights.',
      sourceFootnote: 'ইবনে হিশাম ১/১৩৭, ১৩৮; তারীখে তাবারী ২/২৪৭',
    },
    {
      id: 7,
      questionBn: 'বনু নাজ্জারের সহায়তার পর কোন গোত্র বনু হাশিমের সাথে মিত্রচুক্তি করে, যা পরবর্তীতে মক্কা বিজয়ের কারণ হয়েছিল?',
      questionEn: 'Which tribe forged a defense alliance with Banu Hashim following Banu Najjar’s aid, later causing the Conquest of Makkah?',
      optionsBn: [
        'বনু খুযা\'আ',
        'বনু সাকীফ',
        'বনু কুযাআ',
        'বনু তামিম',
      ],
      optionsEn: [
        'Banu Khuza\'a',
        'Banu Thaqif',
        'Banu Quda\'a',
        'Banu Tamim',
      ],
      correctIndex: 0,
      explanationBn: 'বনু খুযা\'আ এগিয়ে এসে দারুন নদওয়াতে বনু হাশিমের সাথে মিত্রচুক্তি আবদ্ধ করে। এ চুক্তি লঙ্ঘন করায় বহু বছর পর মক্কা বিজয়ের ক্ষেত্র তৈরি হয়।',
      explanationEn: 'Banu Khuza\'a entered into a sacred alliance with Banu Hashim, the breach of which decades later directly led to the Conquest of Makkah.',
      sourceFootnote: 'তারীখে তাবারী ২/২৪৮-২৫১ (পাদটীকা ৯০)',
    },
    {
      id: 8,
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
      id: 9,
      questionBn: 'বায়তুল মুকাদ্দাস অতীতে দুইবার ধ্বংস হলেও কাবার ওপর হাবশীরা কেন কর্তৃত্ব করতে পারেনি?',
      questionEn: 'Why could Habashah not conquer the Ka\'bah, whereas Jerusalem had fallen twice in history?',
      optionsBn: [
        'আল্লাহ সর্বশেষ নবীর আগমন উপলক্ষে বিশ্বমঞ্চে কাবার সম্মান ও অলৌকিক শ্রেষ্ঠত্ব জাহির করতে চেয়েছিলেন',
        'মক্কাবাসীদের বিশাল সৈন্যবাহিনী ছিল',
        'রোমানরা কাবা রক্ষা করেছিল',
        'আবদুল মুত্তালিব যুদ্ধ করেছিলেন',
      ],
      optionsEn: [
        'Allah intended to manifest the divine sanctity of the Ka\'bah to the world to herald the final Prophet ﷺ',
        'Makkans possessed an invincible human army',
        'The Romans intervened to defend Makkah',
        'Abdul Muttalib defeated them in open combat',
      ],
      correctIndex: 0,
      explanationBn: 'সীরাতগ্রন্থ অনুসারে আল্লাহ কোনো মানবীয় বাহিনী ছাড়াই আবরাহাকে ধ্বংস করে গোটা বিশ্বকে (রোম ও পারস্যকে) কাবার শ্রেষ্ঠত্ব ও নবুওতের প্রাক-প্রস্তুতি বুঝিয়ে দেন।',
      explanationEn: 'Allah preserved the Ka\'bah without human armies to manifest its unique global sanctity and prepare humanity for the final Prophet ﷺ.',
      sourceFootnote: 'আর-রাহীকুল মাখতূম পৃষ্ঠা ৯৩, ৯৪',
    },
    {
      id: 10,
      questionBn: 'আবদুল মুত্তালিবের সর্বমোট কত জন ছেলে ও কত জন মেয়ে ছিলেন?',
      questionEn: 'How many sons and daughters did Abdul Muttalib have in total?',
      optionsBn: [
        '১০ জন ছেলে ও ৬ জন মেয়ে',
        '৭ জন ছেলে ও ৩ জন মেয়ে',
        '১২ জন ছেলে ও ৪ জন মেয়ে',
        '৮ জন ছেলে ও ৮ জন মেয়ে',
      ],
      optionsEn: [
        '10 sons and 6 daughters',
        '7 sons and 3 daughters',
        '12 sons and 4 daughters',
        '8 sons and 8 daughters',
      ],
      correctIndex: 0,
      explanationBn: 'কিতাব অনুসারে আবদুল মুত্তালিবের ১০ জন ছেলে (মতভেদে ১১ বা ১৩) এবং ৬ জন মেয়ে ছিলেন।',
      explanationEn: 'According to the source, Abdul Muttalib had 10 sons (some state 11 or 13) and 6 daughters.',
      sourceFootnote: 'সীরাতে ইবনে হিশাম ১/১০৮, ১০৯ (পাদটীকা ৯৩)',
    },
    {
      id: 11,
      questionBn: 'আবদুল্লাহর মুক্তিপণে ১০০ উটের নাম ওঠার পর আবদুল মুত্তালিব নিশ্চিত হওয়ার জন্য আরও কত বার লটারি করেছিলেন?',
      questionEn: 'After 100 camels were drawn, how many extra times did Abdul Muttalib repeat the lottery to be completely certain?',
      optionsBn: [
        'আরও ৩ বার লটারি করেছিলেন (প্রতিবারই উটের নাম ওঠে)',
        'আরও ৫ বার করেছিলেন',
        'আর কোনো লটারি করেননি',
        'আরও ১ বার করেছিলেন',
      ],
      optionsEn: [
        'He repeated the draw 3 additional times (camels drawn each time)',
        'He repeated it 5 times',
        'He did not repeat it at all',
        'He repeated it only once',
      ],
      correctIndex: 0,
      explanationBn: 'সম্পূর্ণ নিশ্চিত হওয়ার জন্য আবদুল মুত্তালিব আরও ৩ বার লটারি দেন এবং প্রতিবারই উটের নাম উঠলে তিনি ১০০ উট কুরবানী দেন।',
      explanationEn: 'To be absolutely confident, Abdul Muttalib cast lots three more times, and each draw selected the camels.',
      sourceFootnote: 'ইবনে হিশাম ১/১৫১-১৫৫; তারীখে তাবারী ২/২৪৬',
    },
    {
      id: 12,
      questionBn: 'ইসলামের বীর সেনাপতি হামযা (রা.) ও আব্বাস (রা.) রাসূলুল্লাহ ﷺ-এর কী হতেন?',
      questionEn: 'What was the relationship of Islamic heroes Hamzah (RA) and Al-Abbas (RA) to Prophet Muhammad ﷺ?',
      optionsBn: [
        'তারা উভয়েই নবীজি ﷺ-এর আপন চাচা হতেন',
        'তারা নবীজি ﷺ-এর মামা হতেন',
        'তারা নবীজি ﷺ-এর ফুফাতো ভাই হতেন',
        'তারা দূরের আত্মীয় হতেন',
      ],
      optionsEn: [
        'Both were direct paternal uncles of the Prophet ﷺ',
        'They were his maternal uncles',
        'They were his cousins',
        'They were distant relatives',
      ],
      correctIndex: 0,
      explanationBn: 'হামযা (রা.) ও আব্বাস (রা.) ছিলেন আবদুল মুত্তালিবের সুযোগ্য পুত্র এবং রাসূলে কারীম ﷺ-এর আপন চাচা।',
      explanationEn: 'Hamzah (RA) and Al-Abbas (RA) were the sons of Abdul Muttalib and direct uncles of Prophet Muhammad ﷺ.',
      sourceFootnote: 'সীরাতে ইবনে হিশাম ১/১০৮, ১০৯',
    },
    {
      id: 13,
      questionBn: 'আবদুল্লাহর ইনতিকালের পর যে হাবশী দাসী নবীজি ﷺ-এর সেবা করেন তাঁর নাম ও কুনিয়াত কী?',
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

  // 5. Authentic Footnotes & Book Citations ([83] to [97]) from Ar-Raheeq Al-Makhtum
  allFootnotes: [
    {
      id: 83,
      citationBn: 'ইবনে হিশাম ১/১,২। তারীখে তাবারী ২/২৩৯-২৭২।',
      citationEn: 'Ibn Hisham 1/1,2; Tarikh al-Tabari 2/239-272.',
      topicBn: '১ম অংশ: মুহাম্মদ ﷺ থেকে আদনান পর্যন্ত ২১ পুরুষের সর্বসম্মত প্রামাণ্য নসবনামা',
      topicEn: 'Part 1: The unanimous authentic 21 generations from Muhammad ﷺ to Adnan',
      pageBn: 'পৃষ্ঠা ৮৯',
      pageEn: 'Page 89',
    },
    {
      id: 84,
      citationBn: 'তাবাকাতে ইবনে সা\'দ ১/৫৬, ৫৭। তারীখে তাবারী ২/২৭২, ২/২৭১-২৭৬। ফাতহুল বারী ৬/৬২১-৬২৩।',
      citationEn: 'Tabaqat Ibn Sa\'d 1/56, 57; Tarikh al-Tabari 2/271-276; Fath al-Bari 6/621-623.',
      topicBn: '২য় অংশ: আদনান থেকে হযরত ইবরাহীম (আ.) পর্যন্ত ঐতিহাসিক মতপার্থক্য',
      topicEn: 'Part 2: Divergences among historians between Adnan and Ibrahim (a.s.)',
      pageBn: 'পৃষ্ঠা ৯০',
      pageEn: 'Page 90',
    },
    {
      id: 85,
      citationBn: 'ইবনে হিশাম ২/২-৪। তারীখে তাবারী ২/২৭৬।',
      citationEn: 'Ibn Hisham 2/2-4; Tarikh al-Tabari 2/276.',
      topicBn: '৩য় অংশ: হযরত ইবরাহীম (আ.) থেকে হযরত আদম (আ.) পর্যন্ত আহলে কিতাবের বর্ণনা',
      topicEn: 'Part 3: People of the Book narrations from Ibrahim (a.s.) to Adam (a.s.)',
      pageBn: 'পৃষ্ঠা ৯০',
      pageEn: 'Page 90',
    },
    {
      id: 86,
      citationBn: 'ইবনে হিশাম ১/১৫৭।',
      citationEn: 'Ibn Hisham 1/157.',
      topicBn: 'হাশিমের সারীদ পরিবেশন ও কুরাইশের শীত-গ্রীষ্মের দুই বাণিজ্যিক কাফেলার সূচনার কবিতা',
      topicEn: 'Poetry praising Hashim for serving Thareed and establishing winter/summer caravans',
      pageBn: 'পৃষ্ঠা ৯১',
      pageEn: 'Page 91',
    },
    {
      id: 87,
      citationBn: 'ইবনে হিশাম ১/১৩৭।',
      citationEn: 'Ibn Hisham 1/137.',
      topicBn: '৪৯৭ খ্রিস্টাব্দে শাইবার জন্ম ও শুভলক্ষণস্বরূপ শ্বেত কেশের নামকরণ',
      topicEn: 'Birth of Shaiba in 497 CE and named after a lock of white hair',
      pageBn: 'পৃষ্ঠা ৯১',
      pageEn: 'Page 91',
    },
    {
      id: 88,
      citationBn: 'ইবনে হিশাম ১/১০৭।',
      citationEn: 'Ibn Hisham 1/107.',
      topicBn: 'হাশিমের চার পুত্র (আসাদ, আবু সাইফী, নাযলা, আবদুল মুত্তালিব) ও পাঁচ কন্যা',
      topicEn: 'The four sons and five daughters of Hashim',
      pageBn: 'পৃষ্ঠা ৯২',
      pageEn: 'Page 92',
    },
    {
      id: 89,
      citationBn: 'ইবনে হিশাম ১/১৩৭, ১৩৮। তারীখে তাবারী ২/২৪৭।',
      citationEn: 'Ibn Hisham 1/137, 138; Tarikh al-Tabari 2/247.',
      topicBn: 'চাচা মুত্তালিবের সাথে শাইবার মক্কায় আগমন, আবদুল মুত্তালিব নাম ধারণ ও নেতৃত্বলাভ',
      topicEn: 'Shaiba arriving in Makkah with Uncle Muttalib, becoming Abdul Muttalib',
      pageBn: 'পৃষ্ঠা ৯২',
      pageEn: 'Page 92',
    },
    {
      id: 90,
      citationBn: 'তারীখে তাবারী ২/২৪৮-২৫১।',
      citationEn: 'Tarikh al-Tabari 2/248-251.',
      topicBn: 'হাতীমে মামা আবু সা\'দের নাঙ্গা তলোয়ার, নওফলের আত্মসমর্পণ ও বনু খুযা\'আ মিত্রচুক্তি (মক্কা বিজয়ের বীজ)',
      topicEn: 'Hateem confrontation by Abu Sa\'d with 80 horsemen, and the decisive Khuza\'a alliance',
      pageBn: 'পৃষ্ঠা ৯৩',
      pageEn: 'Page 93',
    },
    {
      id: 91,
      citationBn: 'ইবনে হিশাম ১/১৪২-১৪৭।',
      citationEn: 'Ibn Hisham 1/142-147.',
      topicBn: 'যমযম কূপ পুনঃখনন, সিরিয়া যাত্রায় মরুভূমির পানির মুজিযা ও ১০ পুত্র হলে একজনকে কোরবানির মানত',
      topicEn: 'Zamzam excavation, the Syrian desert water trial miracle, and the vow of sacrifice',
      pageBn: 'পৃষ্ঠা ৯৩-৯৪',
      pageEn: 'Page 93-94',
    },
    {
      id: 92,
      citationBn: 'ইবনে হিশাম ১/৪৩-৫৬ এবং সূরা আল-ফীলের প্রাচীন তাফসীরসমূহ।',
      citationEn: 'Ibn Hisham 1/43-56 and classical tafseer of Surah al-Fil.',
      topicBn: 'আবরাহার ৬০ হাজারী হস্তীবাহিনী, মুহাস্সার উপত্যকায় মাহমূদ হাতির হাঁটু গেড়ে বসা ও ঝাঁকে ঝাঁকে আবাবীল পাখির কঙ্কর নিক্ষেপ',
      topicEn: 'Abrahah\'s 60,000 army, Mahmoud the elephant kneeling, and flocks of Ababil birds',
      pageBn: 'পৃষ্ঠা ৯৪-৯৫',
      pageEn: 'Page 94-95',
    },
    {
      id: 93,
      citationBn: 'সীরাতে ইবনে হিশাম ১/১০৮, ১০৯। তালকীহে ফুহূমুল আহলিল আসারী পৃ. ৮, ৯।',
      citationEn: 'Sirah Ibn Hisham 1/108, 109; Talqih Fuhum Ahl al-Athar pp. 8, 9.',
      topicBn: 'আবদুল মুত্তালিবের ১০ জন পুত্র (চাচা) এবং ৬ জন কন্যা (ফুফু)-এর বিশদ বিবরণ',
      topicEn: 'Detailed lineage of the 10 sons (uncles) and 6 daughters (aunts) of Abdul Muttalib',
      pageBn: 'পৃষ্ঠা ৯৫-৯৬',
      pageEn: 'Page 95-96',
    },
    {
      id: 94,
      citationBn: 'তারীখে তাবারী ২/২৩৯।',
      citationEn: 'Tarikh al-Tabari 2/239.',
      topicBn: 'আবদুল মুত্তালিবের ১০ পুত্র পূর্ণ হওয়া ও মানত আদায়ের প্রথম লটারিতে আবদুল্লাহর নাম ওঠা',
      topicEn: 'Ten sons reaching maturity and casting first lot landing on Abdullah',
      pageBn: 'পৃষ্ঠা ৯৬',
      pageEn: 'Page 96',
    },
    {
      id: 95,
      citationBn: 'ইবনে হিশাম ১/১৫১-১৫৫। তারীখে তাবারী ২/২৪৬। রওযুল আনফু ১/১৪৪।',
      citationEn: 'Ibn Hisham 1/151-155; Tarikh al-Tabari 2/246; Rawd al-Unuf 1/144.',
      topicBn: '১০ থেকে ১০০ উটে রক্তপণ বৃদ্ধি, ৩ বার অতিরিক্ত লটারি ও "আনা ইবনুয যাবীহাইন" হাদিস',
      topicEn: 'Diyah raised to 100 camels, verified three extra times, and "Son of the Two Sacrificed"',
      pageBn: 'পৃষ্ঠা ৯৬-৯৭',
      pageEn: 'Page 96-97',
    },
    {
      id: 96,
      citationBn: 'তাবাকাতে ইবনে সা\'দ ১/১০০।',
      citationEn: 'Tabaqat Ibn Sa\'d 1/100.',
      topicBn: 'আমিনার সাথে শুভ বিবাহ, মদীনায় আব্দুল্লাহর ইনতিকাল ও নাবেগা জু\'দীতে সমাধি',
      topicEn: 'Marriage with Aminah, Abdullah\'s demise in Yathrib, and burial at Dar al-Nabighah',
      pageBn: 'পৃষ্ঠা ৯৭',
      pageEn: 'Page 97',
    },
    {
      id: 97,
      citationBn: 'সহীহ মুসলিম ৩/১৩৯২ (হাদীস নং ১৭৭১)।',
      citationEn: 'Sahih Muslim 3/1392 (Hadith 1771).',
      topicBn: 'আবদুল্লাহর রেখে যাওয়া সহায়-সম্পদ ও খাদেমা বরকতময়ী উম্মে আয়মান বারাকা (রা.)',
      topicEn: 'The inheritance left by Abdullah including blessed nursemaid Umm Ayman Barakah (r.a.)',
      pageBn: 'পৃষ্ঠা ৯৮',
      pageEn: 'Page 98',
    },
  ] as ChapterFootnote[],
};
