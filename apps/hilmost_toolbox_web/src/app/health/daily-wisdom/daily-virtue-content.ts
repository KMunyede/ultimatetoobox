export interface FAQItem {
  question: string;
  answer: string;
}

export const META_TITLE = "Daily Virtue: Daily Stoic Quotes and a Reflection Journal";
export const META_DESCRIPTION = "Read one Stoic quote a day and write down your thoughts in a simple reflection journal. Free to use, no account needed.";
export const LAYOUT_TITLE = "Daily Virtue | Stoic quotes and daily reflection";
export const TOOL_HEADER_TITLE = "Daily Virtue";
export const TOOL_HEADER_SUBTITLE = "A daily Stoic quote and a simple place to write down what is on your mind.";
export const BREADCRUMB_LABEL = "Daily Virtue";

export const ARTICLE_SECTIONS = {
  whatItDoes: {
    heading: "What Daily Virtue does",
    paragraph: "Daily Virtue shows you one short quote from the Stoic tradition, with the name of the philosopher it is attributed to shown underneath. The quote is chosen at random from a small hand-picked set when you open the page in a new browser session, and it stays the same while that session lasts, so you can come back to it later in the day. Read it, think of one moment in your day where it applies, and carry on. It takes less than a minute, costs nothing and needs no account.",
  },
  whyStoicIdeasHelp: {
    heading: "Why Stoic ideas still help",
    paragraph: "Stoicism began in Athens around 300 BCE with Zeno of Citium and was later shaped by teachers such as Epictetus, Seneca and Marcus Aurelius. It is a practical philosophy about how to live well when things go wrong. Its central idea, set out by Epictetus, is to separate what is up to you, such as your choices, effort and attitude, from what is not, such as other people's opinions, the weather or the outcome of a job application. The Stoics also named four core virtues: wisdom, courage, justice and temperance. A daily quote is a small reminder to measure your day against those ideas instead of against your mood.",
  },
  howToUse: {
    heading: "How to use the page",
    steps: [
      "Read the quote. Say it in your own words, as if explaining it to a friend.",
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
    answer: "No. You can read the daily quote and use the journal without signing in.",
  },
  {
    question: "Are my journal entries saved?",
    answer: "No. On this web version the text is cleared when you press Release Thought, and it is not saved. Copy it first if you want to keep it.",
  },
  {
    question: "Will I see the same quote every day?",
    answer: "Not necessarily. A quote is picked at random when you start a new browser session and stays the same until that session ends.",
  },
  {
    question: "Where do the quotes come from?",
    answer: "They are a hand-picked set of Stoic and related philosophical quotes, each shown with the philosopher it is attributed to.",
  },
];
