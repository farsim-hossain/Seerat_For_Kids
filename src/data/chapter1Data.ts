export interface LocationPoint {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  x: number; // Percent on map (0 - 100)
  y: number; // Percent on map (0 - 100)
  type: 'holy_city' | 'trade_hub' | 'historical_region' | 'water';
  summaryBn: string;
  summaryEn: string;
  storyBn: string;
  storyEn: string;
  lessonBn: string;
  lessonEn: string;
  unlockedJournalItemBn: string;
  unlockedJournalItemEn: string;
}

export interface TribeNode {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  category: 'baida' | 'ariba' | 'mustariba';
  descriptionBn: string;
  descriptionEn: string;
  keySubClansBn: string[];
  keySubClansEn: string[];
  significanceBn: string;
  significanceEn: string;
}

export interface LineageItem {
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
}

export interface QuizQuestion {
  id: number;
  questionBn: string;
  questionEn: string;
  optionsBn: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationBn: string;
  explanationEn: string;
}

export interface ChapterData {
  meta: {
    number: number;
    titleBn: string;
    titleEn: string;
    taglineBn: string;
    taglineEn: string;
    sourceBookBn: string;
    sourceBookEn: string;
  };
  locations: LocationPoint[];
  tribes: TribeNode[];
  lineagePath: LineageItem[];
  moralLesson: {
    traitBn: string;
    traitEn: string;
    storyContextBn: string;
    storyContextEn: string;
    dailyLifeScenarioBn: string;
    dailyLifeScenarioEn: string;
    reflectionQuestionBn: string;
    reflectionQuestionEn: string;
  };
  quizzes: QuizQuestion[];
}

export const CHAPTER_1_DATA: ChapterData = {
  meta: {
    number: 1,
    titleBn: "আরব: মাটি ও মানুষ",
    titleEn: "Arabia: The Land & The People",
    taglineBn: "মরুভূমির অজেয় দুর্গ থেকে পবিত্র মক্কার অভ্যুদয়",
    taglineEn: "From the invincible desert fortress to the rise of Holy Makkah",
    sourceBookBn: "আর-রাহীকুল মাখতূম (শাইখ সফিউর রহমান মুবারকপুরী)",
    sourceBookEn: "Ar-Raheeq Al-Makhtum (The Sealed Nectar) by Sheikh Safiur Rahman Mubarakpuri",
  },

  // 1. Geographic Landmarks & Discoveries for Interactive Map
  locations: [
    {
      id: "makkah",
      nameBn: "পবিত্র মক্কা",
      nameEn: "Holy Makkah",
      nameAr: "مكة المكرمة",
      x: 38,
      y: 56,
      type: "holy_city",
      summaryBn: "হযরত ইবরাহীম (আ.) ও ইসমাঈল (আ.)-এর পবিত্র পদচিহ্ন এবং কাবার শহর।",
      summaryEn: "The blessed footprints of Ibrahim (AS) & Ismail (AS) and home of the Ka'bah.",
      storyBn: "একদা ছিল উদ্ভিদহীন নির্জন এক উপত্যকা। আল্লাহর আদেশে হযরত ইবরাহীম (আ.) বিবি হাজেরা ও শিশু ইসমাঈলকে এখানে রেখে যান। আল্লাহর কুদরতে সেখানে যমযম কূপের মিষ্টি পানির ধারা প্রবাহিত হয় এবং বনু জুরহুম সেখানে বসতি স্থাপন করে। পরবর্তীতে পিতা-পুত্র মিলে কাবা নির্মাণ করেন।",
      storyEn: "Once a barren, uninhabited desert valley. By Allah's divine command, Prophet Ibrahim (AS) left Lady Hajar and infant Ismail here. By Allah's mercy, the sweet waters of the Zamzam spring gushed forth, drawing the Banu Jurhum tribe to settle. Together, Ibrahim and Ismail later raised the sacred foundations of the Ka'bah.",
      lessonBn: "আল্লাহর ওপর অটুট বিশ্বাস (তাওয়াক্কুল) রাখলে তিনি কখনো কাউকে একা ফেলে রাখেন না।",
      lessonEn: "When we place complete trust in Allah (Tawakkul), He never leaves us alone.",
      unlockedJournalItemBn: "মক্কা আবিষ্কারের সিলমোহর",
      unlockedJournalItemEn: "Seal of Holy Makkah",
    },
    {
      id: "yemen",
      nameBn: "ইয়েমেন (সাবার ভূমি)",
      nameEn: "Yemen (Land of Sheba)",
      nameAr: "اليمن",
      x: 52,
      y: 86,
      type: "trade_hub",
      summaryBn: "আরবে আরিবা (কাহতানী আরবদের) আদি বাসস্থান ও বাণিজ্যের সূতিকাগার।",
      summaryEn: "Ancestral home of the Qahtani Arabs and the cradle of ancient commerce.",
      storyBn: "ইয়েমেনের অধিবাসীরা ছিল অত্যন্ত সমৃদ্ধ। তাদের বিখ্যাত মা'রিব বাঁধ ভেঙে যাওয়ার পর (সায়লুল আরিম) ও রোমানদের অত্যাচারী বাণিজ্যের কারণে তারা সারা আরবে ছড়িয়ে পড়ে। তাদের মধ্য থেকেই মদীনার আউস ও খাযরাজ গোত্রের জন্ম।",
      storyEn: "The people of Yemen were once highly prosperous. After the historic collapse of the Ma'rib dam (Sayl al-Arim) and oppressive Roman commercial monopolies, Kahlan tribes migrated across Arabia. From their lineage arose Aws and Khazraj of Madinah and the Ghassanids of Syria.",
      lessonBn: "উত্থান ও পতনের মাধ্যমে জাতি শিক্ষা নেয়; ভ্রাতৃত্বই সবচেয়ে বড় শক্তি।",
      lessonEn: "Nations learn through tests and transitions; genuine unity and faith are true strength.",
      unlockedJournalItemBn: "ইয়েমেনের কাফেলা মার্কার",
      unlockedJournalItemEn: "Yemen Caravan Badge",
    },
    {
      id: "petra",
      nameBn: "পেট্রা (নাবাতীদের রাজ্য)",
      nameEn: "Petra (Nabataean Kingdom)",
      nameAr: "البتراء",
      x: 28,
      y: 22,
      type: "trade_hub",
      summaryBn: "পাহাড় কেটে তৈরি এক বিস্ময়কর দুর্গ-নগরী, প্রাচীন বাণিজ্য পথের নিয়ন্ত্রণ কেন্দ্র।",
      summaryEn: "A magnificent rock-carved fortress city controlling ancient global trade routes.",
      storyBn: "হযরত ইসমাঈল (আ.)-এর জ্যেষ্ঠ পুত্র নাবাত-এর বংশধররা পাহাড়ের খাঁজে খাঁজে গড়ে তোলে সুরম্য নগরী পেট্রা। দূর-দূরান্তের কাফেলা এখানে এসে কর প্রদান করত এবং এটি ছিল সমৃদ্ধ এক বাণিজ্য মারকাজ।",
      storyEn: "Descendants of Nabat (eldest son of Prophet Ismail AS) carved the magnificent city of Petra directly into pink sandstone cliffs. It commanded the northern incense trade route until Roman times.",
      lessonBn: "মেধা ও সততা দিয়ে প্রতিকূল পরিবেশেও সমৃদ্ধি তৈরি করা যায়।",
      lessonEn: "With diligence, wisdom, and resourcefulness, even harsh mountains can be turned into flourishing hubs.",
      unlockedJournalItemBn: "নাবাতী শিলালিপি কার্ড",
      unlockedJournalItemEn: "Nabataean Inscription Card",
    },
    {
      id: "yathrib",
      nameBn: "ইয়াসরিব (পরবর্তী মদীনা)",
      nameEn: "Yathrib (Later Madinah)",
      nameAr: "يثرب",
      x: 35,
      y: 44,
      type: "historical_region",
      summaryBn: "খেজুরের মরূদ্যান, যেখানে ইয়েমেনের আয্দ গোত্রের আউস ও খাযরাজ বংশ বসতি গড়ে।",
      summaryEn: "An oasis of lush date palms settled by the Aws and Khazraj from Yemen.",
      storyBn: "ইয়েমেন থেকে সা'লাবা বিন আমর মুযাইকিয়ার বংশধররা উত্তরে গিয়ে এই সবুজ খেজুর বাগানের উপত্যকায় স্থায়ী আবাস গড়ে তোলে। পরবর্তী সময়ে এই আউস ও খাযরাজই হলেন রাসূলে পাক ﷺ-এর 'আনসার'।",
      storyEn: "After migrating from Yemen, the sons of Haritha settled in the fertile palm-groves of Yathrib. Their two branches—Aws and Khazraj—would centuries later become the noble 'Ansar' (the Helpers) of Prophet Muhammad ﷺ.",
      lessonBn: "আল্লাহ পাক সুদূরপ্রসারী পরিকল্পনায় মানুষকে নির্দিষ্ট এক মহৎ লক্ষ্যের জন্য প্রস্তুত করেন।",
      lessonEn: "Allah prepares places and people generations in advance for grand divine purposes.",
      unlockedJournalItemBn: "ইয়াসরিবের মরূদ্যান প্রতীক",
      unlockedJournalItemEn: "Yathrib Oasis Emblem",
    },
    {
      id: "red_sea",
      nameBn: "লোহিত সাগর (পশ্চিম সীমান্ত)",
      nameEn: "The Red Sea (Western Border)",
      nameAr: "البحر الأحمر",
      x: 22,
      y: 50,
      type: "water",
      summaryBn: "আরবের পশ্চিমের প্রাকৃতিক জলপ্রাচীর যা আফ্রিকাকে আরবের সাথে যুক্ত করেছে।",
      summaryEn: "The western maritime moat protecting Arabia while connecting it to Africa.",
      storyBn: "লোহিত সাগরের উপকূল দিয়ে প্রাচীন মসলার বাণিজ্য জাহাজ ও কাফেলা চলত। এটি আরব উপদ্বীপকে বাইরের সাম্রাজ্যগুলোর আক্রমণ থেকে প্রাকৃতিকভাবে সুরক্ষিত রাখত।",
      storyEn: "Arabia was shielded on the west by the Red Sea, enabling merchants to sail between African ports and the Hijazi coastline while deterring foreign invasions.",
      lessonBn: "প্রকৃতির সীমারেখা মানুষকে নিরাপত্তা ও স্বতন্ত্র আত্মমর্যাদা দান করে।",
      lessonEn: "Natural boundaries grant safety, self-reliance, and protection.",
      unlockedJournalItemBn: "সাগর পথের কম্পাস",
      unlockedJournalItemEn: "Sea Voyage Compass",
    },
    {
      id: "arabian_gulf",
      nameBn: "আরব উপসাগর (পূর্ব সীমান্ত)",
      nameEn: "Arabian Gulf (Eastern Border)",
      nameAr: "الخليج العربي",
      x: 74,
      y: 42,
      type: "water",
      summaryBn: "ইরাক ও পারস্যের সাথে যোগাযোগের জলপথ ও মুক্তার সাগর।",
      summaryEn: "The maritime gateway to Mesopotamia, Persia, and the pearl divers' seas.",
      storyBn: "এই উপসাগরের তীরে আব্দুল কায়স ও বনু বকর গোত্র বসতি গড়ে তোলে। এখান থেকেই প্রাচীন মেসোপটেমিয়া ও ভারত মহাসাগরের পথে নৌবাণিজ্য পরিচালিত হতো।",
      storyEn: "Clans such as Abd al-Qays and Banu Bakr spread along the Gulf coast, engaging in commerce and pearl trade linking Mesopotamia, Oman, and the Indian Ocean.",
      lessonBn: "বিভিন্ন সভ্যতার মাঝে সেতুবন্ধন রচনার গুরুত্ব অপরিসীম।",
      lessonEn: "Honest trade and cross-cultural bridges foster prosperity and understanding.",
      unlockedJournalItemBn: "মুক্তা শিকারির মানচিত্র",
      unlockedJournalItemEn: "Pearl Diver's Map",
    }
  ],

  // 2. The 3 Historical Arab Classifications
  tribes: [
    {
      id: "baida",
      nameBn: "আরবে বায়িদা (اَلْعَرَبُ الْبَائِدَةُ)",
      nameEn: "Arabe Ba'ida (Extinct Ancient Arabs)",
      nameAr: "العرب البائدة",
      category: "baida",
      descriptionBn: "জাযিরাতুল আরবের সবচেয়ে প্রাচীন জাতিগোষ্ঠী, যারা কালের গর্ভে সম্পূর্ণ বিলুপ্ত হয়ে গেছে।",
      descriptionEn: "The most ancient Arab tribes who disappeared completely before the rise of classical history.",
      keySubClansBn: ["আদ (قوم عاد)", "সামূদ (قوم ثمود)", "তাসাম", "জাদীস", "আমালিক", "আদি জুরহুম"],
      keySubClansEn: ["Aad", "Thamud", "Tasm", "Jadis", "Amalekites", "1st Jurhum"],
      significanceBn: "কুরআনে এই জাতিসমূহের অহংকার ও অবাধ্যতার করুণ পরিণতির কথা সতর্কবার্তা হিসেবে উল্লেখ করা হয়েছে।",
      significanceEn: "The Qur'an frequently references their forgotten cities and ruins as moral reminders against arrogance and transgression.",
    },
    {
      id: "ariba",
      nameBn: "আরবে আরিবা (اَلْعَرَبُ الْعَارِبَةُ)",
      nameEn: "Arabe Ariba (The Indigenous Qahtani Arabs)",
      nameAr: "العرب العاربة",
      category: "ariba",
      descriptionBn: "কাহতানের বংশধর খাঁটি আরব। এদের মূল কেন্দ্র ছিল উর্বর ইয়েমেন রাজ্য।",
      descriptionEn: "The descendants of Ya'rub bin Yashjub bin Qahtan, rooted originally in the fertile civilizations of Yemen.",
      keySubClansBn: ["হিময়ার (কুযাআ, সাকাসিক)", "কাহলান (আয্দ, লাখম, তাঈ, কিন্দা, আউস ও খাযরাজ)"],
      keySubClansEn: ["Himyar (Quda'a, Sakasik)", "Kahlan (Azd, Lakhm, Tayy, Kinda, Aws & Khazraj)"],
      significanceBn: "এরাই পরবর্তী সময়ে মদীনার আনসার (আউস ও খাযরাজ) এবং সিরিয়ার গাস্সানী রাজ্যের পূর্বপুরুষ।",
      significanceEn: "Their massive migration distributed civilization across Arabia, directly fathering the Aws and Khazraj of Madinah.",
    },
    {
      id: "mustariba",
      nameBn: "আরবে মুস্তা'রিবা (اَلْعَرَبُ الْمُسْتَعْرَبَةُ)",
      nameEn: "Arabe Musta'riba (The Arabized / Adnani Arabs)",
      nameAr: "العرب المستعربة",
      category: "mustariba",
      descriptionBn: "হযরত ইসমাঈল (আ.)-এর বংশধর। তাঁরা বনু জুরহুমের সংস্পর্শে বিশুদ্ধ আরবি ভাষা আয়ত্ত করেন।",
      descriptionEn: "The descendants of Prophet Ismail (AS) who intermarried with Jurhum and mastered pristine Arabic.",
      keySubClansBn: ["আদনান", "মুযার ও রবীআ", "কেনানা", "কুরাইশ", "বনু হাশিম"],
      keySubClansEn: ["Adnan", "Mudhar & Rabi'a", "Kinana", "Quraysh", "Banu Hashim"],
      significanceBn: "এই সুমহান পবিত্র ধারার সমাপ্তি ঘটে সাইয়েদুল মুরসালীন, শেষ নবী হযরত মুহাম্মাদ ﷺ-এর আগমনে।",
      significanceEn: "From this pure, preserved ancestral line was chosen the Master of the Messengers, Prophet Muhammad ﷺ.",
    }
  ],

  // 3. The Noble Lineage of Prophet Muhammad ﷺ (Adnan to Prophet)
  lineagePath: [
    { nameBn: "হযরত ইবরাহীম (আ.)", nameEn: "Prophet Ibrahim (AS)", roleBn: "খলীলুল্লাহ, মূল পিতা", roleEn: "Friend of Allah, The Patriarch" },
    { nameBn: "হযরত ইসমাঈল (আ.)", nameEn: "Prophet Ismail (AS)", roleBn: "যবীহুল্লাহ, কাবার সহ-নির্মাতা", roleEn: "Sacrifice of Faith, Co-builder of Ka'bah" },
    { nameBn: "কায়দার", nameEn: "Qaidar (Kedar)", roleBn: "ইসমাঈল (আ.)-এর পুত্র", roleEn: "Son of Ismail (AS)" },
    { nameBn: "আদনান (عدنان)", nameEn: "Adnan", roleBn: "২১তম পুরুষ, আদনানী বংশের মূল", roleEn: "21st Ancestor, Root of Adnani Arabs" },
    { nameBn: "মা'আদ (معد)", nameEn: "Ma'ad", roleBn: "আদনানের পুত্র", roleEn: "Son of Adnan" },
    { nameBn: "নযর (نزار)", nameEn: "Nizar", roleBn: "মা'আদের পুত্র", roleEn: "Son of Ma'ad" },
    { nameBn: "মুযার (مضر)", nameEn: "Mudhar", roleBn: "কুরাইশদের মূল পিতৃপুরুষ", roleEn: "Forefather of Quraysh" },
    { nameBn: "ইলিয়াস (إلياس)", nameEn: "Ilyas", roleBn: "মুযারের পুত্র", roleEn: "Son of Mudhar" },
    { nameBn: "মুদরিকা (مدركة)", nameEn: "Mudrikah", roleBn: "ইলিয়াসের পুত্র", roleEn: "Son of Ilyas" },
    { nameBn: "খুযাইমা (خزيمة)", nameEn: "Khuzaymah", roleBn: "মুদরিকার পুত্র", roleEn: "Son of Mudrikah" },
    { nameBn: "কেনানা (كنانة)", nameEn: "Kinana", roleBn: "আল্লাহর মনোনীত শাখা", roleEn: "Chosen noble clan" },
    { nameBn: "নযর", nameEn: "Nadr", roleBn: "কেনানার পুত্র", roleEn: "Son of Kinana" },
    { nameBn: "মালিক", nameEn: "Malik", roleBn: "নযরের পুত্র", roleEn: "Son of Nadr" },
    { nameBn: "ফিহর (কুরাইশ - قريش)", nameEn: "Fihr (Quraysh)", roleBn: "কুরাইশ লকবধারী", roleEn: "Title holder of Quraysh" },
    { nameBn: "গালিব", nameEn: "Ghalib", roleBn: "ফিহরের পুত্র", roleEn: "Son of Fihr" },
    { nameBn: "লুআই", nameEn: "Lu'ayy", roleBn: "গালিবের পুত্র", roleEn: "Son of Ghalib" },
    { nameBn: "কা'ব", nameEn: "Ka'b", roleBn: "লুআইয়ের পুত্র", roleEn: "Son of Lu'ayy" },
    { nameBn: "মুররা", nameEn: "Murrah", roleBn: "কা'বের পুত্র", roleEn: "Son of Ka'b" },
    { nameBn: "কিলাব", nameEn: "Kilab", roleBn: "মুররার পুত্র", roleEn: "Son of Murrah" },
    { nameBn: "কুসাই বিন কিলাব (قصي)", nameEn: "Qusayy bin Kilab", roleBn: "কুরাইশদের ঐক্যের মহানায়ক", roleEn: "Uniter of Quraysh & Ka'bah Custodian" },
    { nameBn: "আবদে মানাফ", nameEn: "Abd Manaf", roleBn: "কুসাইয়ের পুত্র", roleEn: "Son of Qusayy" },
    { nameBn: "হাশিম (هاشم)", nameEn: "Hashim", roleBn: "বনু হাশিম শাখার প্রতিষ্ঠাতা", roleEn: "Founder of Banu Hashim" },
    { nameBn: "আব্দুল মুত্তালিব", nameEn: "Abd al-Muttalib", roleBn: "যমযম পুনর্খননকারী পিতামহ", roleEn: "Re-excavator of Zamzam, Grandfather" },
    { nameBn: "আব্দুল্লাহ", nameEn: "Abdullah", roleBn: "রাসূলুল্লাহ ﷺ-এর পিতা", roleEn: "Father of the Prophet ﷺ" },
    { nameBn: "মুহাম্মাদুর রাসূলুল্লাহ ﷺ", nameEn: "Muhammad ﷺ", roleBn: "বিশ্বনবী ও শেষ রাসুল", roleEn: "Seal of the Prophets & Mercy to All Worlds" }
  ],

  // 4. Moral Lesson & Journal Entries
  moralLesson: {
    traitBn: "তাওয়াক্কুল (আল্লাহর ওপর পূর্ণ ভরসা)",
    traitEn: "Tawakkul (Complete Reliance on Allah)",
    storyContextBn: "হযরত হাজেরা যখন দুধের শিশু ইসমাঈলকে নিয়ে মরুভূমিতে সম্পূর্ণ একাকী হলেন, তিনি জিজ্ঞাসা করেছিলেন: 'আল্লাহ কি আপনাকে এর আদেশ করেছেন?' যখন জানলেন হ্যাঁ, তিনি নিঃসংশয়ে বললেন: 'তাহলে আল্লাহ কখনোই আমাদের ধ্বংস হতে দেবেন না!'",
    storyContextEn: "When Lady Hajar was left alone with infant Ismail in the barren desert, she asked Ibrahim (AS): 'Did Allah command you to do this?' When he answered yes, she firmly declared: 'Then Allah will never abandon us!'",
    dailyLifeScenarioBn: "যখন কোনো পরীক্ষায় বা কঠিন পরিস্থিতিতে তুমি একা বা অসহায় বোধ করো, তখন সাধ্যমত চেষ্টা করে ফলাফল আল্লাহর হাতে সঁপে দাও। আল্লাহ সবসময় তাঁর বান্দার পাশে থাকেন।",
    dailyLifeScenarioEn: "When facing a daunting test or difficulty, do your best and trust the outcome to Allah. Sincere effort backed by trust in Allah unlocks unexpected ease.",
    reflectionQuestionBn: "তোমার জীবনে এমন কোনো মুহূর্ত কি এসেছে যেখানে তুমি একা ছিলে কিন্তু আল্লাহর সাহায্যে সফল হয়েছ?",
    reflectionQuestionEn: "Can you recall a moment when you felt uncertain, but asking Allah for help brought comfort and peace?"
  },

  // 5. Knowledge Challenge (Quiz)
  quizzes: [
    {
      id: 1,
      questionBn: "আরব ঐতিহাসিকদের মতে আরব জাতিকে কয়টি প্রধান ভাগে ভাগ করা হয়েছে?",
      questionEn: "According to historians, into how many major categories are Arab peoples classified?",
      optionsBn: ["২ ভাগে", "৩ ভাগে (বায়িদা, আরিবা, মুস্তা'রিবা)", "৪ ভাগে", "৫ ভাগে"],
      optionsEn: ["2 Categories", "3 Categories (Ba'ida, Ariba, Musta'riba)", "4 Categories", "5 Categories"],
      correctIndex: 1,
      explanationBn: "আরব জাতিকে তিনটি ধারায় বিভক্ত করা হয়: আরবে বায়িদা (বিলুপ্ত), আরবে আরিবা (কাহতানী খাঁটি আরব), এবং আরবে মুস্তা'রিবা (ইসমাঈলী/আদনানী আরব)।",
      explanationEn: "Arabs are classified into three historical branches: Arabe Ba'ida (extinct), Arabe Ariba (indigenous Qahtani), and Arabe Musta'riba (Arabized Adnani lineage)."
    },
    {
      id: 2,
      questionBn: "মরুভূমির বুকে প্রথম কোন পবিত্র কূপের পানি উৎসারিত হয়েছিল?",
      questionEn: "Which blessed spring of water miraculously gushed forth in the barren valley of Makkah?",
      optionsBn: ["কূপ বা'দা", "যমযম কূপ", "সালসাবিল", "কাউসার"],
      optionsEn: ["Well of Bada", "The Well of Zamzam", "Salsabil", "Kawthar"],
      correctIndex: 1,
      explanationBn: "বিবি হাজেরা ও শিশু ইসমাঈল (আ.)-এর পানির পিপাসায় আল্লাহর কুদরতে যমযম কূপের সুমিষ্ট পানির ঝরনা প্রবাহিত হয়।",
      explanationEn: "Through Allah's mercy for Lady Hajar and infant Ismail (AS), the pure water of Zamzam burst from the arid desert soil."
    },
    {
      id: 3,
      questionBn: "হযরত ইসমাঈল (আ.)-এর জ্যেষ্ঠ পুত্রের বংশধররা কোন বিশ্ববিখ্যাত পাথুরে নগরীর গোড়াপত্তন করেছিলেন?",
      questionEn: "Descendants of Prophet Ismail's eldest son Nabat founded which famous rock-hewn capital city?",
      optionsBn: ["দামেস্ক", "পেট্রা (আনবাতদের রাজধানী)", "বাগদাদ", "কায়রো"],
      optionsEn: ["Damascus", "Petra (Nabataean Capital)", "Baghdad", "Cairo"],
      correctIndex: 1,
      explanationBn: "হযরত ইসমাঈল (আ.)-এর পুত্র নাবাত-এর বংশধররা প্রাচীন জর্ডানের দক্ষিণে বিখ্যাত পাথুরে নগরী পেট্রা গড়ে তোলেন।",
      explanationEn: "Nabat's descendants founded the powerful Nabataean kingdom centered at the rock-carved city of Petra in southern Jordan."
    },
    {
      id: 4,
      questionBn: "কুরাইশ গোত্রকে বিচ্ছিন্ন অবস্থা থেকে একত্রিত করে ঐক্যের সুতোয় কে বেঁধেছিলেন?",
      questionEn: "Who united the scattered clans of Quraysh and restored administrative order in Makkah?",
      optionsBn: ["আদনান", "কুসাই বিন কিলাব", "আব্দুল মুত্তালিব", "হাশিম"],
      optionsEn: ["Adnan", "Qusayy bin Kilab", "Abd al-Muttalib", "Hashim"],
      correctIndex: 1,
      explanationBn: "কুসাই বিন কিলাব সমগ্র কুরাইশ গোত্রকে ঐক্যবদ্ধ করেন এবং মক্কার প্রশাসনিক শৃঙ্খলা ফিরিয়ে এনে কাবা শরীফের তত্ত্বাবধান করেন।",
      explanationEn: "Qusayy bin Kilab brought all divided clans of Quraysh under one unified council and became the custodian of the Ka'bah."
    },
    {
      id: 5,
      questionBn: "নবী করীম ﷺ-এর বংশপরম্পরায় 'আদনান' কততম পূর্বপুরুষ ছিলেন?",
      questionEn: "In the universally agreed lineage of Prophet Muhammad ﷺ, which ancestor was Adnan?",
      optionsBn: ["১০ম পুরুষ", "১৫তম পুরুষ", "২১তম পুরুষ", "৪০তম পুরুষ"],
      optionsEn: ["10th Ancestor", "15th Ancestor", "21st Ancestor", "40th Ancestor"],
      correctIndex: 2,
      explanationBn: "রাসূলুল্লাহ ﷺ থেকে শুরু করে ২১তম পূর্বপুরুষ হলেন আদনান, যা হাদিস ও ঐতিহাসিকদের সর্বসম্মত বিশুদ্ধ সূত্রে সংরক্ষিত।",
      explanationEn: "Adnan is the 21st direct paternal forefather of Prophet Muhammad ﷺ, agreed upon by all authoritative scholars."
    }
  ]
};
