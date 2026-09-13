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

export interface GovernancePortfolio {
  id: string;
  nameAr: string;
  nameBn: string;
  nameEn: string;
  clanBn: string;
  clanEn: string;
  iconName: string;
  summaryBn: string;
  summaryEn: string;
  detailsBn: string;
  detailsEn: string;
}

export interface ChieftainPrivilege {
  id: string;
  nameAr: string;
  nameBn: string;
  nameEn: string;
  shareBn: string;
  shareEn: string;
  descriptionBn: string;
  descriptionEn: string;
}

export interface Section2Data {
  meta: {
    number: string;
    titleBn: string;
    titleEn: string;
    taglineBn: string;
    taglineEn: string;
    sourceBookBn: string;
    sourceBookEn: string;
  };
  locations: LocationPoint[];
  portfolios: GovernancePortfolio[];
  chieftainPrivileges: ChieftainPrivilege[];
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

export const SECTIONS_META = [
  {
    id: '1.1',
    numberBn: 'পর্ব ১.১',
    numberEn: 'Part 1.1',
    titleBn: 'আরবের মাটি, জাতি ও কাবার অভ্যুদয়',
    titleEn: 'Land, Peoples & Rise of the Ka\'bah',
    taglineBn: 'মরুভূমির ভৌগোলিক অবস্থান, যমযম কূপের অলৌকিক প্রকাশ ও ইবরাহীম (আ.)-এর পদচিহ্ন',
    taglineEn: 'Geography of the desert fortress, Zamzam miracle, and footsteps of Ibrahim (AS)',
    badgeCount: 5,
  },
  {
    id: '1.2',
    numberBn: 'পর্ব ১.২',
    numberEn: 'Part 1.2',
    titleBn: 'আরবের রাজবংশ ও মক্কার প্রশাসন',
    titleEn: 'Kingdoms & The Council of Makkah',
    taglineBn: 'পারস্য ও রোমের সীমান্তবর্তী রাজ্যসমূহ, কুসাইয়ের দারুন নদওয়া ও কুরাইশের সংসদীয় দায়িত্ব',
    taglineEn: 'Buffer kingdoms of Rome and Persia, Qusayy\'s Dar al-Nadwah & portfolios of Quraysh',
    badgeCount: 5,
  },
];

export const CHAPTER_1_SECTION_2_DATA: Section2Data = {
  meta: {
    number: "1.2",
    titleBn: "আরবের সরকার ও প্রশাসন",
    titleEn: "Leadership & Governance in Arabia",
    taglineBn: "দারুন নদওয়ার ঐতিহ্য, প্রাচীন রাজবংশ ও প্রাক-ইসলামিক শাসন ব্যবস্থা",
    taglineEn: "The Hall of Dar al-Nadwah, ancient client kingdoms, and Meccan governance",
    sourceBookBn: "আর-রাহীকুল মাখতূম (মূল: আল্লামা সফিউর রহমান মুবারকপুরী, পৃ. ৪৪–৬২)",
    sourceBookEn: "Ar-Raheeq Al-Makhtum (The Sealed Nectar by Sheikh Mubarakpuri, pp. 44–62)",
  },

  // 1. Kingdom Locations for Map in Section 1.2
  locations: [
    {
      id: "al_hirah",
      nameBn: "আল-হীরা (ইরাক সীমান্ত)",
      nameEn: "Al-Hirah (Persian Border)",
      nameAr: "الحيرة",
      x: 68,
      y: 20,
      type: "historical_region",
      summaryBn: "পারস্যের সাসানীয় সাম্রাজ্যের অধীনস্থ আরব লখমী রাজবংশের রাজধানী শহর।",
      summaryEn: "Capital of the Lakhmid Arab kingdom serving as a buffer state for the Sassanid Persian Empire.",
      storyBn: "হীরা শহরটি ইউফ্রেটিস নদীর উর্বর তীরে অবস্থিত ছিল। সাসানীয় পারস্যের সম্রাটরা আরব যাযাবরদের আক্রমণ ঠেকাতে এবং রোমানদের বিরুদ্ধে লড়াইয়ে এই লখমী রাজাদের বাফার স্টেট হিসেবে ব্যবহার করত। এখানেই নুমান বিন মুনযিরের পর বিখ্যাত 'যী কারের যুদ্ধ' (Battle of Dhi Qar) সংঘটিত হয়েছিল, যেখানে আরবরা ইতিহাসের প্রথম বারের মতো পরাক্রমশালী পারস্য সেনাবাহিনীকে পর্যুদস্ত করেছিল।",
      storyEn: "Al-Hirah sat on the fertile banks of the Euphrates. Sassanid Persian Emperors used the Arab Lakhmid kings as a buffer against desert bedouins and Romans. Near here, the historic Battle of Dhi Qar took place, marking the first time Arab tribes united and defeated a Sassanid imperial Persian army.",
      lessonBn: "ন্যায়ের জন্য ঐক্যবদ্ধ অবস্থান নিলে পরাক্রমশালী সাম্রাজ্যের দম্ভও ভেঙে যায়।",
      lessonEn: "When people stand united for trust and dignity, even mighty imperial forces can be overcome.",
      unlockedJournalItemBn: "হীরার লখমী রাজ্য ও যী কারের বিজয় স্মৃতি",
      unlockedJournalItemEn: "Lakhmid Kingdom & Victory of Dhi Qar"
    },
    {
      id: "busra",
      nameBn: "বসরা ও গাস্সানী রাজ্য (সিরিয়া সীমান্ত)",
      nameEn: "Busra & The Ghassanid Kingdom (Syria)",
      nameAr: "بُصرى / الغساسنة",
      x: 35,
      y: 12,
      type: "historical_region",
      summaryBn: "রোমান (বাইজেন্টাইন) সাম্রাজ্যের মিত্র গাস্সানী আরব শাসকদের সমৃদ্ধ রাজধানী।",
      summaryEn: "Flourishing capital of the Christian Ghassanid Arab dynasty, allied with the Byzantine Roman Empire.",
      storyBn: "কাহতানী আরবদের একটি দল সিরিয়ার প্রত্যন্ত এলাকায় হিজরত করে এবং রোম সম্রাটদের অনুগ্রহ লাভ করে তাদের অধীনস্থ শাসক হিসেবে প্রতিষ্ঠিত হয়। তাদের প্রধান প্রাণকেন্দ্র ছিল বসরা শহর। রোমানরা পারস্য ও মরুভূমির যাযাবর আরবদের থেকে সিরিয়ার সীমান্ত সুরক্ষিত রাখতে গাস্সানীদের অস্ত্র ও অর্থ দিয়ে সহায়তা করত। পরবর্তী সময়ে ইসলামের যুগে এই অঞ্চলটি ন্যায়বিচারের পতাকাতলে আসে।",
      storyEn: "Qahtani Arab clans migrated to outer Syria and were appointed by Byzantine emperors as buffer rulers. Their capital was Busra. The Romans supplied them with gold and weapons to defend the borders against Sassanid Persia and bedouin incursions.",
      lessonBn: "বাহ্যিক পরাশক্তির অন্ধ পুতুলে পরিণত হলে প্রকৃত স্বাধীনতা ও গৌরব টিকে থাকে না।",
      lessonEn: "Relying blindly on foreign superpowers as client puppets erodes true independence and integrity.",
      unlockedJournalItemBn: "সিরিয়ার গাস্সানী সীমানা ও বসরা নগরী",
      unlockedJournalItemEn: "Busra & The Ghassanid Borderlands"
    },
    {
      id: "marib",
      nameBn: "মাআরিব বাঁধ ও সাবা রাজ্য (ইয়েমেন)",
      nameEn: "Ma'rib Dam & Kingdom of Saba (Yemen)",
      nameAr: "سد مأرب / سبأ",
      x: 62,
      y: 84,
      type: "historical_region",
      summaryBn: "প্রাচীন সাবার বিস্ময়কর ঐতিহাসিক বাঁধ এবং পবিত্র কুরআনে বর্ণিত 'সায়লুল আরিম' (মহাপ্লাবন)।",
      summaryEn: "The engineering marvel of ancient Saba and the biblical/quranic Great Flood of Saylul 'Arim.",
      storyBn: "ইয়েমেনের সাবা জাতির শাসকগণ মাআরিব বাঁধ নির্মাণ করেছিলেন যা বিশাল মরুভূমিকে সবুজ ফলবান উদ্যানে পরিণত করেছিল। কিন্তু যখন তারা নিয়ামতের শুকরিয়া ভুলে অহংকারী হয়ে পড়ল, তখন এক প্রলয়ংকর বন্যায় বাঁধটি ভেঙে চুরমার হয়ে যায় (কুরআনে বর্ণিত 'সায়লুল আরিম')। এ ধ্বংসের পরই সাবার অসংখ্য আরব গোত্র মক্কা, মদীনা ও সিরিয়ায় হিজরত করে ছড়িয়ে পড়ে।",
      storyEn: "The kings of Saba constructed the massive Ma'rib Dam, turning arid plains into lush fertile gardens. But when the people became arrogant and ungrateful for Allah's bounties, the dam fractured in a catastrophic deluge (the 'Saylul Arim' described in Surah Saba), scattering Arab tribes across Arabia.",
      lessonBn: "আল্লাহর নিয়ামতের জন্য শুকরিয়া আদায় করা উচিত; অহংকার ও অকৃতজ্ঞতা সভ্যতাকেও ধুলোয় মিশিয়ে দেয়।",
      lessonEn: "Always remain grateful for blessings; arrogance and ungratefulness can crumble even the greatest civil engineering marvels.",
      unlockedJournalItemBn: "মাআরিব বাঁধের শিক্ষণীয় ইতিহাস",
      unlockedJournalItemEn: "The Lesson of Ma'rib Dam"
    },
    {
      id: "dar_al_nadwah",
      nameBn: "দারুন নদওয়া (মক্কার সংসদ)",
      nameEn: "Dar al-Nadwah (Mecca's Parliament)",
      nameAr: "دار الندوة",
      x: 40,
      y: 52,
      type: "holy_city",
      summaryBn: "কুসাই বিন কিলাব কর্তৃক পবিত্র কাবার উত্তর পাশে নির্মিত কুরাইশের ঐতিহাসিক সভাকক্ষ।",
      summaryEn: "The historic council chamber built by Qusayy bin Kilab north of the Ka'bah for Meccan governance.",
      storyBn: "মক্কার ক্ষমতা পুনর্গঠন করে কুসাই বিন কিলাব কাবার উত্তর পাশে 'দারুন নদওয়া' নির্মাণ করেন যার দরজা ছিল সরাসরি কাবার দিকে। এখানে কুরাইশ গোত্রের বিজ্ঞ ব্যক্তিবর্গ গুরুত্বপূর্ণ সামাজিক, রাজনৈতিক ও বাণিজ্যিক সিদ্ধান্তের পরামর্শ করতেন। এখানেই যুদ্ধের পতাকা (লিওয়া) বাঁধা হতো এবং কাফেলা প্রেরণের সিদ্ধান্ত গৃহীত হতো।",
      storyEn: "After consolidating authority in Makkah, Qusayy bin Kilab constructed Dar al-Nadwah with its doorway facing the Ka'bah. Here the elders of Quraysh gathered for consultations, solemnized marriages, approved trade expeditions, and fastened the sacred war banner (Al-Liwa).",
      lessonBn: "পারস্পরিক পরামর্শ (মাশওয়ারা) ও প্রাতিষ্ঠানিক শৃঙ্খলাই একটি সমাজকে নৈরাজ্য থেকে রক্ষা করে।",
      lessonEn: "Sincere mutual consultation (Shura) and civic organization protect a society from chaos and injustice.",
      unlockedJournalItemBn: "দারুন নদওয়ার সভাকক্ষ",
      unlockedJournalItemEn: "Dar al-Nadwah Assembly Chamber"
    },
    {
      id: "najran",
      nameBn: "নাজরান ও আসহাবুল উখদুদ",
      nameEn: "Najran & People of the Ditch",
      nameAr: "نجران / أصحاب الأخدود",
      x: 52,
      y: 72,
      type: "historical_region",
      summaryBn: "ইয়েমেনের অত্যাচারী যুনোওয়াসের অগ্নিকুণ্ডের জুলুম এবং সূরা আল-বুরূজে বর্ণিত ঘটনা।",
      summaryEn: "The tragic trenches of fire under tyrant Dhu Nuwas, immortalized in Surah Al-Buruj.",
      storyBn: "৫২৩ খ্রিস্টাব্দে ইয়েমেনের রাজা যুনোওয়াস নাজরানের ঈমানদারদের ওপর ইতিহাসের ভয়াবহতম নির্যাতন চালায়। যখন তারা ঈমান ত্যাগ করতে অস্বীকার করে, তখন গভীর পরিখা খুঁড়ে আগুন জ্বালিয়ে জীবন্ত পুড়িয়ে মারা হয়। কুরআনে আল্লাহ তাদের ঈমানী অবিচলতাকে চিরস্মরণীয় করে রেখেছেন। এ ঘটনার পরেই হাবশার সেনাবাহিনী ইয়েমেন আক্রমণ করে।",
      storyEn: "In 523 CE, the tyrant king Dhu Nuwas brutally persecuted the faithful of Najran. When they refused to renounce their faith, they were cast alive into blazing trenches of fire (Ashab al-Ukhdud in Surah Al-Buruj). This injustice triggered the Abyssinian invasion of Yemen.",
      lessonBn: "সত্য ও বিশ্বাসের ওপর অবিচল থাকা সর্বাবস্থায় মানুষের সবচেয়ে মূল্যবান সম্পদ।",
      lessonEn: "Unshakable steadfastness in truth and faith remains the believer's greatest inner victory.",
      unlockedJournalItemBn: "নাজরানের ঈমানী অবিচলতা",
      unlockedJournalItemEn: "Steadfast Faith of Najran"
    }
  ],

  // 2. The 7 Administrative Portfolios of Quraysh in Makkah
  portfolios: [
    {
      id: "siqayah",
      nameAr: "السقاية",
      nameBn: "আস-সিক্বায়াহ (হাজীদের পানি পান করানো)",
      nameEn: "Al-Siqayah (Water for Pilgrims)",
      clanBn: "বনু হাশিম (হাশিম ➔ আব্দুল মুত্তালিব ➔ আব্বাস রা.)",
      clanEn: "Banu Hashim (Hashim ➔ Abd al-Muttalib ➔ Abbas RA)",
      iconName: "Droplet",
      summaryBn: "হজ্জের মৌসুমে দূর-দূরান্ত থেকে আগত পিপাসার্ত হাজীদের জন্য সুপেয় মিষ্টি পানির সুব্যবস্থা করা।",
      summaryEn: "Arranging fresh sweet water in leather cisterns infused with dates/raisins for all visiting pilgrims.",
      detailsBn: "কুসাই ও হাশিমের সময়ে যমযমের পানি বড় বড় চামড়ার পাত্র ও হাউযে ভরে রাখা হতো এবং তাতে কিশমিশ ও খেজুর ভিজিয়ে সুস্বাদু শরবত তৈরি করা হতো। হাজীদের ক্লান্তি দূর করতে বনু হাশিম এই মর্যাদাপূর্ণ দায়িত্ব পরম যত্নে পালন করত।",
      detailsEn: "Water from Zamzam and sweet springs was stored in large leather cisterns, naturally sweetened with raisins and dates. Banu Hashim carried this noble honor with legendary hospitality through generations."
    },
    {
      id: "rifadah",
      nameAr: "الرفادة",
      nameBn: "আর-রিফাদাহ (হাজীদের মেহমানদারী ও খাবার)",
      nameEn: "Al-Rifadah (Feeding Pilgrims)",
      clanBn: "বনু হাশিম",
      clanEn: "Banu Hashim",
      iconName: "Utensils",
      summaryBn: "হজ্জের মৌসুমে মক্কায় আগত নিঃস্ব ও দূরযাত্রী হাজীদের জন্য বিনামূল্যে আতিথেয়তামূলক ভোজের আয়োজন।",
      summaryEn: "A public hospitality welfare fund collected to feed poor, weary, and destitute pilgrims during Hajj.",
      detailsBn: "কুসাই কুরাইশদের ওপর একটি বার্ষিক অর্থ সংগ্রহের নীতি নির্ধারণ করেছিলেন, যা দিয়ে হজ্জের দিনগুলোতে বিশেষ আহার তৈরি করা হতো। যে সকল হাজীর কোনো পাথেয় বা সম্বল থাকত না, তারা এই খাবার খেয়ে তৃপ্ত হতো।",
      detailsEn: "Qusayy established a communal levy upon Quraysh clans to finance wholesome meals for pilgrims without provisions, guaranteeing no traveler in the sacred sanctuary went hungry."
    },
    {
      id: "hijabah",
      nameAr: "الحجابة",
      nameBn: "আল-হিজাবাহ (কাবার চাবি ও গিলাফের অভিভাবকত্ব)",
      nameEn: "Al-Hijabah (Custody of the Ka'bah)",
      clanBn: "বনু আব্দুদ্দার",
      clanEn: "Banu Abdud-Dar",
      iconName: "Key",
      summaryBn: "পবিত্র কাবা শরীফের চাবি রক্ষা করা, দরজা খোলা-বন্ধ করা এবং গিলাফের তত্ত্বাবধান।",
      summaryEn: "Keeping the sacred keys of the Ka'bah, controlling entry, and managing the holy sanctuary curtain.",
      detailsBn: "বনু আব্দুদ্দারের অনুমতি ছাড়া কাবার অভ্যন্তরে কেউ প্রবেশ করতে পারত না। কুসাই তার জ্যেষ্ঠ পুত্র আব্দুদ্দারকে এই পবিত্র চাবি সমর্পণ করেছিলেন, যা বংশপরম্পরায় তাঁদের কাছে সংরক্ষিত ছিল।",
      detailsEn: "No person could enter the interior of the Ka'bah without their authorization. Qusayy entrusted the sacred key directly to his eldest son Abdud-Dar, remaining in their honorable lineage."
    },
    {
      id: "liwa",
      nameAr: "اللواء",
      nameBn: "আল-লিওয়া (যুদ্ধের পবিত্র জাতীয় পতাকা)",
      nameEn: "Al-Liwa (The Standard of War)",
      clanBn: "বনু আব্দুদ্দার",
      clanEn: "Banu Abdud-Dar",
      iconName: "Flag",
      summaryBn: "মক্কার প্রতিরক্ষা বা যুদ্ধের জাতীয় পতাকা ধারণ এবং দারুন নদওয়ায় তা স্থাপন।",
      summaryEn: "Fastening and carrying the sacred military battle standard, bound exclusively inside Dar al-Nadwah.",
      detailsBn: "কুরাইশদের কোনো যুদ্ধযাত্রার পতাকা কেবল দারুন নদওয়াতেই বনু আব্দুদ্দারের কোনো প্রবীণ ব্যক্তিত্বের হাতে বাঁধা হতো। এটি ছিল সামরিক সংহতি ও ঐক্যের প্রতীক।",
      detailsEn: "Whenever Quraysh went to battle or mobilized an expedition, the military banner was bound exclusively inside the hall of Dar al-Nadwah by an elder of Banu Abdud-Dar."
    },
    {
      id: "mashwarah",
      nameAr: "المشورة",
      nameBn: "আল-মাশওয়ারা (পরামর্শ ও উপদেষ্টা পরিষদ)",
      nameEn: "Al-Mashwarah (Advisory Council)",
      clanBn: "বনু আসাদ",
      clanEn: "Banu Asad",
      iconName: "MessageSquare",
      summaryBn: "দারুন নদওয়ায় জটিল রাষ্ট্রীয় ও সামাজিক সংকট নিরসনে নীতি নির্ধারণী পরামর্শ প্রদান।",
      summaryEn: "Facilitating parliamentary deliberation and strategic council meetings on major civic crises.",
      detailsBn: "বনু আসাদের নেতৃবৃন্দ মক্কার বিচার ও গোত্রীয় ঐক্যের বিভিন্ন জটিল পরিস্থিতিতে প্রাজ্ঞ পরামর্শকদের ভূমিকা পালন করতেন।",
      detailsEn: "Elders of Banu Asad acted as respected arbiters and facilitators of council discussions, ensuring consensus among proud competing clans."
    },
    {
      id: "ashnaq",
      nameAr: "الأشناق",
      nameBn: "আল-আশনাক (রক্তপণ ও জরিমানা সালিশী)",
      nameEn: "Al-Ashnaq (Blood Money & Indemnities)",
      clanBn: "বনু তায়ম (হযরত আবু বকর রা.-এর গোত্র)",
      clanEn: "Banu Taym (Clan of Abu Bakr RA)",
      iconName: "Scale",
      summaryBn: "হত্যা, সংঘাত ও আঘাতের ক্ষতিপূরণ ও দিয়াত নির্ধারণ করে রক্তক্ষয়ী যুদ্ধ নিবারণ করা।",
      summaryEn: "Calculating blood money (Diyah), assessing civil damages, and arbitrating disputes to prevent tribal bloodbaths.",
      detailsBn: "জাহেলী যুগে তুচ্ছ কারণে শতাব্দীব্যাপী যুদ্ধ শুরু হতো। বনু তায়মের বিজ্ঞ ব্যক্তিরা ন্যায়সঙ্গত জরিমানা ও দিয়াত নির্ধারণ করে শান্তি বজায় রাখতেন। পরবর্তী সময়ে হযরত আবু বকর (রা.) এই গোত্রেই জন্মগ্রহণ করেন।",
      detailsEn: "In an era where minor insults triggered decades of tribal bloodshed, Banu Taym assessed fair indemnities to reconcile grieving clans. Abu Bakr al-Siddiq (RA) hailed from this noble branch."
    },
    {
      id: "sifarah",
      nameAr: "السفارة",
      nameBn: "আস-সিফারাহ (কূটনীতি ও বৈদেশিক দূতাবাস)",
      nameEn: "Al-Sifarah (Diplomacy & Foreign Embassy)",
      clanBn: "বনু আদী (হযরত উমর রা.-এর গোত্র)",
      clanEn: "Banu Adi (Clan of Umar RA)",
      iconName: "Compass",
      summaryBn: "বহিরাগত শক্তিশালী সাম্রাজ্য ও অন্যান্য আরব গোত্রসমূহের সাথে কূটনৈতিক দূত হিসেবে মধ্যস্থতা করা।",
      summaryEn: "Representing Makkah as ambassadors and diplomatic envoys to foreign empires and rival confederacies.",
      detailsBn: "মক্কার সম্মান ও বাণিজ্য সুরক্ষায় বনু আদীর দূতেরা রোম, পারস্য ও নজদের গোত্রপ্রধানদের কাছে প্রেরিত হতো। খলীফাতুল মুসলিমীন হযরত উমর বিন খাত্তাব (রা.) এই নির্ভীক কূটনীতিক গোত্রেরই সন্তান ছিলেন।",
      detailsEn: "Whenever negotiations were required with distant monarchs or belligerent bedouin confederations, envoys of Banu Adi served as eloquent plenipotentiaries. Umar ibn al-Khattab (RA) belonged to this clan."
    }
  ],

  // 3. The 4 Ancient Spoils Privileges of a Pre-Islamic Chieftain
  chieftainPrivileges: [
    {
      id: "mirba",
      nameAr: "المرباع",
      nameBn: "আল-মিরবা' (এক-চতুর্থাংশ বা ২৫%)",
      nameEn: "Al-Mirba' (The 25% Share)",
      shareBn: "২৫% অংশ",
      shareEn: "25% Fixed Cut",
      descriptionBn: "যুদ্ধশেষে সংগৃহীত সমগ্র গনীমতের মালের এক-চতুর্থাংশ (২৫%) গোত্রপ্রধান একাই লাভ করতেন।",
      descriptionEn: "A flat one-quarter (25%) of the total collective spoils was surrendered directly to the chieftain before anything else."
    },
    {
      id: "safi",
      nameAr: "الصفايا",
      nameBn: "আস-সফী (নির্বাচিত পছন্দের জিনিস)",
      nameEn: "Al-Safi (The Choice Selection)",
      shareBn: "পছন্দের বস্তু",
      shareEn: "First Pick",
      descriptionBn: "সাধারণ যোদ্ধাদের মধ্যে গনীমত বণ্টনের আগেই সর্দার নিজের পছন্দমতো শ্রেষ্ঠ ঘোড়া বা মূল্যবান তলোয়ার তুলে নিতেন।",
      descriptionEn: "Before general distribution among fighters, the chief picked out any single prized item (e.g. the finest steed or jewel-encrusted blade)."
    },
    {
      id: "nashitah",
      nameAr: "النشيطة",
      nameBn: "আন-নাশীতাহ (যাত্রাপথে সংগৃহীত হিস্যা)",
      nameEn: "Al-Nashitah (En-Route Plunder)",
      shareBn: "পথের মালামাল",
      shareEn: "Transit Booty",
      descriptionBn: "যুদ্ধক্ষেত্রে বা শিবিরে পৌঁছানোর আগেই যাত্রাপথে শত্রুর কাছ থেকে যা কিছু ছিনিয়ে নেওয়া হতো, তা সরাসরি সর্দারের প্রাপ্য হতো।",
      descriptionEn: "Any cattle or valuables captured while on the march before reaching the main camp belonged exclusively to the leader."
    },
    {
      id: "fudul",
      nameAr: "الفضول",
      nameBn: "আল-ফুযূল (বণ্টন-পরবর্তী উদ্বৃত্ত সম্পদ)",
      nameEn: "Al-Fudul (Indivisible Surplus)",
      shareBn: "উদ্বৃত্ত সম্পদ",
      shareEn: "Undivided Remainder",
      descriptionBn: "সৈন্যদের মাঝে সমানভাবে ভাগ করার পর যে সব জিনিস (যেমন অবশিষ্ট উট বা বর্ম) আর ভাগ করা যেত না, তা সর্দার গ্রহণ করতেন।",
      descriptionEn: "Any indivisible residual spoils left over after equal mathematical distribution (e.g. 2 spare camels among 50 men) went to the chief."
    }
  ],

  // 4. Moral Lesson: Servant Leadership vs Selfish Tyranny
  moralLesson: {
    traitBn: "নেতৃত্ব হলো আমানত ও সেবা, শোষণ নয় (Servant Leadership)",
    traitEn: "Leadership is a Trust and Service, Not Privilege (Servant Leadership)",
    storyContextBn: "জাহেলী যুগে আরবের গোত্রপতিরা গনীমতের সিংহভাগ নিজেরা ভোগ করত এবং গোত্রের মানুষকে বলত: 'গোত্র অন্যায়ে লিপ্ত হলেও অন্ধভাবে তার পক্ষে থাকবে'। কিন্তু ইসলাম শিক্ষা দিয়েছে: প্রকৃত নেতা তিনিই যিনি জনগণের সেবক এবং যিনি ন্যায়ের প্রশ্নে নিজের পরিবার ও গোত্রের অন্যায়ের বিরুদ্ধেও সত্যে অটল থাকেন।",
    storyContextEn: "In pre-Islamic Jahiliyyah, chieftains hoarded a quarter of all wealth for themselves and demanded blind tribal loyalty: 'Follow your clan even if they commit tyranny'. Islam completely abolished this unjust hierarchy, declaring that a true leader is the servant of his people, accountable to divine justice.",
    dailyLifeScenarioBn: "যখন কোনো ক্লাসে, খেলায় বা দলে তোমাকে দলনেতা (ক্যাপ্টেন) বানানো হয়, তখন সবাইকে আগে সুবিধা ও সুযোগ দাও এবং সবার সমস্যার খেয়াল রাখো। নিজের স্বার্থ উদ্ধারে নেতৃত্ব ব্যবহার করো না।",
    dailyLifeScenarioEn: "When chosen as a leader, team captain, or class monitor, use your responsibility to serve your peers and ensure fairness, rather than seeking privileges for yourself.",
    reflectionQuestionBn: "একজন ভালো নেতার মধ্যে কোন গুণটি থাকা সবচেয়ে জরুরি বলে তুমি মনে করো—ক্ষমতা প্রদর্শন নাকি মানুষের পাশে থাকা?",
    reflectionQuestionEn: "What do you think is the most vital quality in a great leader—demanding privileges, or genuinely serving and caring for others?"
  },

  // 5. Section 1.2 Knowledge Challenge (Quiz)
  quizzes: [
    {
      id: 101,
      questionBn: "কুসাই বিন কিলাব পবিত্র কাবার উত্তর পাশে কোন ঐতিহাসিক সভাকক্ষ নির্মাণ করেছিলেন?",
      questionEn: "Which historic parliamentary hall did Qusayy bin Kilab construct adjacent to the Ka'bah?",
      optionsBn: ["দারুল আরকাম", "দারুন নদওয়া", "দারুস সালাম", "বাইতুল হিকমাহ"],
      optionsEn: ["Dar al-Arqam", "Dar al-Nadwah", "Dar al-Salam", "Bayt al-Hikmah"],
      correctIndex: 1,
      explanationBn: "কুসাই কাবার উত্তর পাশে 'দারুন নদওয়া' নির্মাণ করেছিলেন, যেখানে কুরাইশদের গুরুত্বপূর্ণ পরামর্শ সভা, বিয়ের অনুষ্ঠান ও যুদ্ধপতাকা প্রস্তুত হতো।",
      explanationEn: "Qusayy established Dar al-Nadwah beside the Ka'bah as the central assembly hall for civic policy, consultation, and solemnizing agreements."
    },
    {
      id: 102,
      questionBn: "কোন ঐতিহাসিক যুদ্ধে আরবরা ইতিহাসের প্রথমবারের মতো পারস্যের বিশাল সেনাবাহিনীকে পরাজিত করেছিল?",
      questionEn: "In which historic engagement did Arab tribes unite to defeat an imperial Persian army for the first time?",
      optionsBn: ["কাদিসিয়ার যুদ্ধ", "যী কারের যুদ্ধ (Battle of Dhi Qar)", "ইয়ারমুকের যুদ্ধ", "মুতার যুদ্ধ"],
      optionsEn: ["Battle of Qadisiyyah", "Battle of Dhi Qar", "Battle of Yarmuk", "Battle of Mu'tah"],
      correctIndex: 1,
      explanationBn: "হীরার নিকটবর্তী 'যী কার'-এর যুদ্ধে বনু শায়বান ও আরব গোত্রগুলো পারস্যের সেনাদলকে চরমভাবে পরাজিত করেছিল, যা ছিল আজমের ওপর প্রথম আরব বিজয়।",
      explanationEn: "At the Battle of Dhi Qar near Al-Hirah, Arab warriors under Banu Shayban decisively defeated a Sassanid Persian army for the first time in recorded history."
    },
    {
      id: 103,
      questionBn: "মক্কা ছেড়ে যাওয়ার আগে বনু জুরহুম যমযম কূপের ভেতর কী লুকিয়ে রেখে গিয়েছিল?",
      questionEn: "Before their exile from Makkah, what did Banu Jurhum bury inside the Well of Zamzam?",
      optionsBn: ["লৌহ বর্ম", "স্বর্ণের দুটি হরিণ ও হাজরে আসওয়াদ", "রুপার তরবারি", "প্রাচীন শিলালিপি"],
      optionsEn: ["Iron shields", "Two golden gazelles and the Black Stone", "Silver swords", "Ancient stone tablets"],
      correctIndex: 1,
      explanationBn: "বনু জুরহুম মক্কা ত্যাগ করার প্রাক্কালে কাবার দুটি স্বর্ণের হরিণ এবং হাজরে আসওয়াদ যমযম কূপে দাফন করে কূপটির অবস্থান মাটি দিয়ে ঢেকে দিয়েছিল।",
      explanationEn: "Before fleeing to Yemen, the Jurhumites concealed the Ka'bah's two golden gazelles and the Black Stone inside Zamzam, burying the well flush with the ground."
    },
    {
      id: 104,
      questionBn: "প্রাক-ইসলামিক আরবে একজন গোত্রপ্রধান গনীমতের সম্পদের কত শতাংশ অংশ (মিরবা') একাই গ্রহণ করতেন?",
      questionEn: "In pre-Islamic Arabia, what fixed percentage ('Al-Mirba') of battle spoils did a chieftain claim for himself?",
      optionsBn: ["১০%", "১৫%", "২৫% (এক-চতুর্থাংশ)", "৫০%"],
      optionsEn: ["10%", "15%", "25% (One Quarter)", "50%"],
      correctIndex: 2,
      explanationBn: "জাহেলী যুগে সর্দাররা গনীমতের মালের এক-চতুর্থাংশ (২৫%) বা 'মিরবা'' নিজেদের জন্য বাধ্যতামূলক হিসেবে নিয়ে নিতেন।",
      explanationEn: "Chieftains customarily demanded 'Al-Mirba', which was a mandatory 25% (one quarter) cut of all captured spoils before distribution."
    },
    {
      id: 105,
      questionBn: "হাজীদের সুপেয় মিষ্টি পানি পান করানোর মহান দায়িত্ব (আস-সিক্বায়াহ) কুরাইশের কোন গোত্রের ভাগে ছিল?",
      questionEn: "Which noble clan of Quraysh held the honor of providing sweet water to pilgrims (Al-Siqayah)?",
      optionsBn: ["বনু উমাইয়্যা", "বনু হাশিম (হাশিম, আব্দুল মুত্তালিব ও আব্বাস রা.)", "বনু মাখযূম", "বনু আদী"],
      optionsEn: ["Banu Umayyah", "Banu Hashim (Hashim, Abdul Muttalib & Abbas RA)", "Banu Makhzum", "Banu Adi"],
      correctIndex: 1,
      explanationBn: "হাজীদের পানি পান করানোর দায়িত্ব 'আস-সিক্বায়াহ' বনু হাশিমের ভাগে ছিল, যা হাশিম থেকে আব্দুল মুত্তালিব ও পরবর্তীতে হযরত আব্বাস (রা.) পালন করেন।",
      explanationEn: "The privilege of Al-Siqayah was held by Banu Hashim—stewarded by Hashim, Abdul Muttalib, and later Abbas ibn Abd al-Muttalib (RA)."
    }
  ]
};

