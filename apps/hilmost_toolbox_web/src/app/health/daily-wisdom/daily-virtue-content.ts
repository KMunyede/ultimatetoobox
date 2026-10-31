export interface FAQItem {
  question: string;
  answer: string;
}

export const META_TITLE = "Daily Virtue: Wisdom Quotes and a Reflection Journal";
export const META_DESCRIPTION = "Read wisdom quotes from Stoic writers and from the Bible, Quran and Hadith, then note your thoughts in a simple journal. Free, no account needed.";
export const LAYOUT_TITLE = "Daily Virtue | Quotes and daily reflection";
export const TOOL_HEADER_TITLE = "Daily Virtue";
export const TOOL_HEADER_SUBTITLE = "Wisdom quotes from Stoic and faith traditions, and a simple place to write down what is on your mind.";
export const BREADCRUMB_LABEL = "Daily Virtue";

export const ARTICLE_SECTIONS = {
  whatItDoes: {
    heading: "What Daily Virtue does",
    paragraph: "Daily Virtue shows you five short quotes at a time, taken from a small hand-picked set of wisdom sayings. The set includes sayings from Stoic writers such as Marcus Aurelius, Seneca and Epictetus, and from the Bible, the Quran and the Hadith. Each quote shows the source or the person it is attributed to. The quotes are chosen at random when you open the page in a new browser session, and they stay the same while that session lasts, so you can come back to them later in the day. Read them, pick the one that speaks to you, and think of one moment in your day where it applies. It takes less than a minute, costs nothing and needs no account.",
  },
  whyStoicIdeasHelp: {
    heading: "Why Stoic ideas still help",
    paragraph: "Stoicism began in Athens around 300 BCE with Zeno of Citium and was later shaped by teachers such as Epictetus, Seneca and Marcus Aurelius. It is a practical philosophy about how to live well when things go wrong. Its central idea, set out by Epictetus, is to separate what is up to you, such as your choices, effort and attitude, from what is not, such as other people's opinions, the weather or the outcome of a job application. The Stoics also named four core virtues: wisdom, courage, justice and temperance. Reading a few wise sayings each day is a small reminder to measure your day against those ideas instead of against your mood.",
  },
  howToUse: {
    heading: "How to use the page",
    steps: [
      "Read the quotes and pick one. Say it in your own words, as if explaining it to a friend.",
      "Ask one question: what in my day is up to me, and what is not?",
      "Open the Reflection Journal and write down what comes to mind, then press Release Thought. You can also browse more quotes in the Wisdom Library.",
    ],
  },
  aboutJournal: {
    heading: "About the reflection journal",
    paragraph: "The journal is a simple writing box. You type what you are thinking, then press Release Thought and the text is cleared. On this web version your entries are not saved, so write freely, and copy anything you want to keep before you release it. Writing a worry down and letting it go can help you see it more clearly, but it is a thinking aid, not a record.",
  },
  noteOnWellbeing: {
    heading: "A note on wellbeing",
    paragraph: "Daily Virtue is a tool for reflection and is not medical advice or a substitute for professional care. If you are struggling with your mental health, please speak to a doctor, a counsellor or someone you trust.",
  },
};

export const FAQS: FAQItem[] = [
  {
    question: "Is Daily Virtue free?",
    answer: "Yes. Everything on this page is free to use today.",
  },
  {
    question: "Do I need an account?",
    answer: "No. You can read the quotes and use the journal without signing in.",
  },
  {
    question: "Are my journal entries saved?",
    answer: "No. On this web version the text is cleared when you press Release Thought, and it is not saved. Copy it first if you want to keep it.",
  },
  {
    question: "Will I see the same quotes every day?",
    answer: "Not necessarily. The quotes are picked at random when you start a new browser session and stay the same until that session ends.",
  },
  {
    question: "Where do the quotes come from?",
    answer: "They are a small hand-picked set built into the page: sayings from Stoic writers such as Marcus Aurelius, Seneca and Epictetus, and from the Bible, the Quran and the Hadith. Each is shown with its source or the person it is attributed to.",
  },
];
