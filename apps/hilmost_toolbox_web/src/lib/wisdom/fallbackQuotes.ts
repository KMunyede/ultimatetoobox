export interface Quote {
  id: string;
  text: string;
  philosopher: string;
}

export const fallbackQuotes: Quote[] = [
  // STOIC PHILOSOPHY
  { id: "1", text: "Waste no more time arguing about what a good man should be. Be one.", philosopher: "Marcus Aurelius" },
  { id: "2", text: "The happiness of your life depends upon the quality of your thoughts.", philosopher: "Marcus Aurelius" },
  { id: "3", text: "We suffer more often in imagination than in reality.", philosopher: "Seneca" },
  { id: "4", text: "Wealth consists not in having great possessions, but in having few wants.", philosopher: "Epictetus" },
  { id: "5", text: "It is not what happens to you, but how you react to it that matters.", philosopher: "Epictetus" },
  { id: "6", text: "He who fears death will never do anything worth of a man who is alive.", philosopher: "Seneca" },
  
  // CHRISTIAN BIBLE
  { id: "7", text: "I can do all things through Christ who strengthens me.", philosopher: "Philippians 4:13 (Bible)" },
  { id: "8", text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", philosopher: "2 Timothy 1:7 (Bible)" },
  { id: "9", text: "And now these three remain: faith, hope and love. But the greatest of these is love.", philosopher: "1 Corinthians 13:13 (Bible)" },
  { id: "10", text: "Trust in the Lord with all your heart and lean not on your own understanding.", philosopher: "Proverbs 3:5 (Bible)" },
  { id: "11", text: "The Lord is my shepherd; I shall not want.", philosopher: "Psalm 23:1 (Bible)" },
  
  // QURAN
  { id: "12", text: "So verily, with every difficulty, there is relief.", philosopher: "Surah Al-Inshirah 94:5 (Quran)" },
  { id: "13", text: "Allah does not burden a soul beyond that it can bear.", philosopher: "Surah Al-Baqarah 2:286 (Quran)" },
  { id: "14", text: "The best among you are those who have the best manners and character.", philosopher: "Prophet Muhammad (Hadith)" },
  { id: "15", text: "Kindness is a mark of faith, and whoever is not kind has no faith.", philosopher: "Prophet Muhammad (Hadith)" },
  { id: "16", text: "Be patient, for indeed, the promise of Allah is truth.", philosopher: "Surah Ar-Rum 30:60 (Quran)" },
  { id: "17", text: "Indeed, Allah is with the patient.", philosopher: "Surah Al-Baqarah 2:153 (Quran)" },
];
