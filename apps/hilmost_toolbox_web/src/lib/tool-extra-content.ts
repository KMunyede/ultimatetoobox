export type ToolExtra = {
  subject: string;
  howItWorks: string[];
  examples: { title: string; steps: string[] }[];
  tips: string[];
};

export const TOOL_EXTRA: Record<string, ToolExtra> = {
  "/converters/time": {
    "subject": "the time converter",
    "howItWorks": [
      "Every unit on this page is defined as a number of seconds: a minute is 60 seconds, an hour is 3,600 seconds and a day is 86,400 seconds. The converter first turns your value into seconds, then divides by the number of seconds in the unit you chose. Going through one common unit keeps every pair of units consistent, whichever way you convert.",
      "Milliseconds, microseconds and nanoseconds work the same way, only with fractions of a second. A millisecond is one thousandth of a second, which is why 1,000 ms equals 1 second. Programmers meet these units in timeouts, animation delays and performance logs."
    ],
    "examples": [
      {
        "title": "2.5 hours in minutes",
        "steps": [
          "2.5 hours × 3,600 = 9,000 seconds",
          "9,000 seconds ÷ 60 = 150 minutes"
        ]
      },
      {
        "title": "90 minutes in hours",
        "steps": [
          "90 minutes × 60 = 5,400 seconds",
          "5,400 seconds ÷ 3,600 = 1.5 hours"
        ]
      },
      {
        "title": "3 days in hours",
        "steps": [
          "3 days × 86,400 = 259,200 seconds",
          "259,200 seconds ÷ 3,600 = 72 hours"
        ]
      }
    ],
    "tips": [
      "Weeks, months and years are the units to watch. A week is always 7 days, but months run from 28 to 31 days and years from 365 to 366, so any conversion involving months or years is an approximation.",
      "To find the exact time between two calendar dates, count the days on a calendar instead of converting units.",
      "Check the unit you mean before you convert. Short symbols such as m can stand for minutes or months, and that is a common source of mistakes."
    ]
  },
  "/finance/budget-planner": {
    "subject": "the 50/30/20 budget",
    "howItWorks": [
      "The 50/30/20 rule splits your take-home pay into three parts: 50% for needs, 30% for wants and 20% for savings and debt repayment. It was popularised by Elizabeth Warren and Amelia Warren Tyagi in their book All Your Worth, and it works as a starting point, not a strict law.",
      "Needs are costs you cannot easily drop: rent or mortgage, utilities, groceries, transport to work, insurance and minimum debt payments. Wants are everything that improves life but could be cut, such as eating out, subscriptions, hobbies and holidays. The last 20% goes to an emergency fund, retirement saving or paying debt faster than the minimum."
    ],
    "examples": [
      {
        "title": "Take-home pay of $3,000 a month",
        "steps": [
          "Needs: 50% of 3,000 = $1,500",
          "Wants: 30% of 3,000 = $900",
          "Savings and debt repayment: 20% of 3,000 = $600"
        ]
      },
      {
        "title": "Take-home pay of $1,200 a month",
        "steps": [
          "Needs: 50% of 1,200 = $600",
          "Wants: 30% of 1,200 = $360",
          "Savings and debt repayment: 20% of 1,200 = $240"
        ]
      }
    ],
    "tips": [
      "Use the money that actually reaches your account after tax, not your gross salary, or every figure will be too high.",
      "If your needs already take more than 50%, do not give up on the rule. Try a split such as 60/20/20 for now and work towards 50/30/20 as your income grows or your costs fall.",
      "Review the split every few months, and every time your income or your rent changes."
    ]
  },
  "/text-data/md5-hash": {
    "subject": "the MD5 hash generator",
    "howItWorks": [
      "MD5 reads any text and produces a fixed-length fingerprint: 128 bits, shown as 32 hexadecimal characters. The same input always gives the same fingerprint, while even a one-character change gives a completely different one. The process only goes one way, so you cannot recover the original text from the fingerprint.",
      "People use MD5 fingerprints to check that two pieces of data match, for example to confirm that a downloaded file was not damaged on the way, or to build short cache keys."
    ],
    "examples": [
      {
        "title": "Same word, different capital letter",
        "steps": [
          "hello gives 5d41402abc4b2a76b9719d911017c592",
          "Hello gives 8b1a9953c4611296a827abf8c47804d7",
          "Only the first letter changed, yet nothing in the output matches."
        ]
      },
      {
        "title": "Empty input",
        "steps": [
          "An empty string gives d41d8cd98f00b204e9800998ecf8427e, a handy value to recognise when a file turns out to be empty."
        ]
      }
    ],
    "tips": [
      "MD5 is no longer safe for security. Researchers found ways to create two different inputs with the same MD5 value, so do not use it for passwords, signatures or certificates.",
      "It is still fine for catching accidental damage to a file and for generating cache keys or quick identifiers.",
      "For security work use SHA-256 for integrity checks, and a purpose-built password method such as bcrypt or Argon2 for passwords.",
      "Spaces and line breaks count. A trailing space or newline changes the result, which is the usual reason two fingerprints do not match."
    ]
  },
  "/text-data/word-count": {
    "subject": "the word counter",
    "howItWorks": [
      "Words are counted as groups of characters separated by spaces or line breaks. Characters are counted two ways: with spaces, which is what most limits use, and without spaces. Lines are counted by line breaks. Everything updates as you type, so you can trim a draft until it fits.",
      "Programs differ in small ways, for example in how they treat hyphenated words, numbers and symbols, so the same text can show slightly different counts in different tools. If a strict limit matters, leave a small margin."
    ],
    "examples": [
      {
        "title": "The quick brown fox jumps over the lazy dog",
        "steps": [
          "Words: 9",
          "Characters with spaces: 43",
          "Characters without spaces: 35"
        ]
      },
      {
        "title": "Reading time of a 1,000-word article",
        "steps": [
          "At 200 to 250 words per minute, silent reading takes about 4 to 5 minutes."
        ]
      }
    ],
    "tips": [
      "Know the limits you write for: a post on X allows 280 characters, and search results usually show only the first 155 to 160 characters of a meta description.",
      "Check whether a limit counts spaces. Many forms count them, some do not.",
      "Paste plain text where you can. Text copied from web pages or documents can carry hidden characters that change the count."
    ]
  },
  "/text-data/base64-encode": {
    "subject": "Base64 encoding",
    "howItWorks": [
      "Base64 turns binary data or text into plain letters, digits, plus and slash characters, so it can travel through systems that only handle text, such as email, JSON and URLs. Every 3 bytes of input become 4 characters of output, so encoded data is about one third larger. If the input length is not a multiple of 3, one or two equals signs are added at the end as padding.",
      "Encoding is not encryption. Anyone can decode Base64 in a second, so never use it to hide passwords or personal data. Text is first converted to bytes, normally using UTF-8, so characters outside basic English, such as é or emoji, take more than one byte each."
    ],
    "examples": [
      {
        "title": "Man",
        "steps": [
          "Man encodes to TWFu",
          "3 bytes in, 4 characters out, no padding."
        ]
      },
      {
        "title": "Hi",
        "steps": [
          "Hi encodes to SGk=",
          "2 bytes in, so one equals sign of padding is added."
        ]
      },
      {
        "title": "Decoding",
        "steps": [
          "TWFu decodes back to Man."
        ]
      }
    ],
    "tips": [
      "Common uses: embedding small images in web pages as data URLs, attaching files in email, and sending binary data inside JSON.",
      "If decoding fails, check for missing padding, extra spaces or line breaks, or the URL-safe variant, which uses - and _ in place of + and /.",
      "Do not Base64-encode large files just to store them; the size grows by about 33%."
    ]
  },
  "/converters/data-storage": {
    "subject": "the data storage converter",
    "howItWorks": [
      "Computers count in bits. A byte is 8 bits, and larger units are built on bytes: kilobyte, megabyte, gigabyte, terabyte and petabyte. This converter uses steps of 1,024, so 1 KB is 1,024 bytes and 1 MB is 1,024 KB, which matches how Windows and most memory sizes are reported.",
      "Drive makers usually use steps of 1,000 instead, so a drive sold as 500 GB holds 500,000,000,000 bytes. A Windows computer divides that by 1,024 three times and shows about 465.7 GB. Nothing is missing; two counting systems are being compared. The binary units have their own names, KiB, MiB and GiB, to avoid the confusion."
    ],
    "examples": [
      {
        "title": "2.5 GB in MB",
        "steps": [
          "2.5 × 1,024 = 2,560 MB"
        ]
      },
      {
        "title": "A 500 GB drive as Windows reports it",
        "steps": [
          "500 × 1,000,000,000 = 500,000,000,000 bytes",
          "500,000,000,000 ÷ 1,073,741,824 (1,024 cubed) ≈ 465.7 GB"
        ]
      },
      {
        "title": "100 Mbps internet in megabytes per second",
        "steps": [
          "Divide megabits by 8 to get megabytes: 100 ÷ 8 = 12.5 MB per second."
        ]
      }
    ],
    "tips": [
      "Watch the capital letters: b means bit and B means byte, so Mb is a megabit and MB is a megabyte, eight times larger.",
      "Windows shows sizes in steps of 1,024 while macOS uses steps of 1,000, so the same file can show different sizes on the two systems.",
      "Network speeds are quoted in bits per second, file sizes in bytes. Convert one to the other before comparing."
    ]
  },
  "/finance/retirement-planner": {
    "subject": "the retirement planner",
    "howItWorks": [
      "A retirement projection rests on compound growth: money you save earns returns, and those returns earn returns of their own. The result depends on four things you control or can estimate: how long you invest, how much you add each month, the annual return you assume, and the amount you start with. Of these, time usually matters most, because compounding speeds up in the later years.",
      "Treat the answer as an estimate, not a promise. Real returns change from year to year, fees reduce them, and inflation means a future dollar buys less than a dollar today."
    ],
    "examples": [
      {
        "title": "Why starting early helps",
        "steps": [
          "$10,000 growing at 6% a year for 20 years becomes about $32,071: 10,000 × 1.06^20.",
          "The same $10,000 for 30 years becomes about $57,435: 10,000 × 1.06^30.",
          "Ten extra years add roughly 79% more."
        ]
      },
      {
        "title": "The 4% rule of thumb",
        "steps": [
          "A common guide is to withdraw about 4% of your savings in the first year of retirement.",
          "To draw $40,000 a year you would need about $1,000,000: 40,000 ÷ 0.04 = 1,000,000.",
          "The rule comes from US research on historical returns and is a rough guide, not a guarantee."
        ]
      }
    ],
    "tips": [
      "Use cautious returns. Many planners test several rates, such as 4%, 6% and 8%, to see the range.",
      "Allow for inflation by using a return after inflation, or by raising the target amount.",
      "Count other income in retirement, such as a pension or state benefits, and subtract it from the amount you need to fund.",
      "This tool is for planning only and is not financial advice."
    ]
  },
  "/finance/inflation": {
    "subject": "the inflation calculator",
    "howItWorks": [
      "Inflation is the rate at which prices rise over time. This calculator compounds the yearly rate: a price after n years equals today's price × (1 + rate)^n. Because each year's increase builds on the last, the effect grows faster than simply multiplying the rate by the number of years.",
      "The same maths shows how purchasing power falls. If prices rise by a total factor F, what a fixed sum of money buys shrinks by dividing by F. Inflation is usually measured with a consumer price index, which tracks the price of a typical basket of goods and services."
    ],
    "examples": [
      {
        "title": "A $100 basket at 3% a year for 10 years",
        "steps": [
          "100 × 1.03^10 = $134.39"
        ]
      },
      {
        "title": "What $100 of cash buys after 10 years at 3%",
        "steps": [
          "100 ÷ 1.3439 ≈ $74.41 in today's money"
        ]
      },
      {
        "title": "The rule of 72",
        "steps": [
          "Divide 72 by the inflation rate to estimate how many years until prices double.",
          "At 3% that is 72 ÷ 3 = 24 years. The exact figure is about 23.5."
        ]
      }
    ],
    "tips": [
      "Use the rate that fits your situation. National averages hide big differences between rent, food, fuel and school fees.",
      "Compare real and nominal values: a 5% pay rise with 4% inflation is only about a 1% real rise.",
      "Rates change from year to year, so run several scenarios instead of relying on one."
    ]
  },
  "/converters/unix-time": {
    "subject": "Unix time",
    "howItWorks": [
      "Unix time counts the seconds that have passed since 00:00:00 UTC on 1 January 1970, a moment known as the epoch. It is a single number with no time zone attached, which makes it a simple way for computers to store, compare and sort moments in time. A time zone only matters when the number is shown as a date for people. Unix time does not count leap seconds.",
      "Many systems store time in milliseconds instead of seconds. A current timestamp with 10 digits is in seconds, while one with 13 digits is in milliseconds, as returned by JavaScript's Date.now(). Dividing a millisecond value by 1,000 gives seconds."
    ],
    "examples": [
      {
        "title": "Three landmark timestamps",
        "steps": [
          "0 is 1 January 1970, 00:00:00 UTC",
          "1,000,000,000 is 9 September 2001, 01:46:40 UTC",
          "1,700,000,000 is 14 November 2023, 22:13:20 UTC"
        ]
      }
    ],
    "tips": [
      "If a converted date is off by a few hours, the usual cause is the time zone: the timestamp is in UTC, but the display may use your local time.",
      "If a date comes out in January 1970, you probably passed seconds where milliseconds were expected, or the value is 1,000 times too small.",
      "The year 2038 problem: systems that store the timestamp in a signed 32-bit integer run out of range on 19 January 2038 at 03:14:07 UTC. Modern systems use 64 bits, which does not run out in any practical sense."
    ]
  },
  "/finance/tip-calculator": {
    "subject": "the tip calculator",
    "howItWorks": [
      "The tip is a percentage of the bill. Multiply the bill by the percentage written as a decimal (18% is 0.18), add the result to the bill to get the total, and divide by the number of people to split it.",
      "Round the final amount up if you like a tidy total. A small rounding difference between people is normal when the total does not divide evenly."
    ],
    "examples": [
      {
        "title": "A $84.50 bill with an 18% tip, split three ways",
        "steps": [
          "Tip: 84.50 × 0.18 = $15.21",
          "Total: 84.50 + 15.21 = $99.71",
          "Each person: 99.71 ÷ 3 = $33.24 (rounded)"
        ]
      },
      {
        "title": "Quick mental maths for 10% and 20%",
        "steps": [
          "For 10%, move the decimal point one place left: $84.50 becomes $8.45.",
          "Double that for 20%: $16.90."
        ]
      }
    ],
    "tips": [
      "Customs vary by country. In some places service is already included in the bill and tipping is optional or small, so check the receipt first.",
      "Decide whether to tip on the amount before tax or on the total including tax, and use the same rule every time.",
      "An even split is only fair when everyone had a similar meal. If one person ordered much more, split by what each person ordered."
    ]
  }
};
