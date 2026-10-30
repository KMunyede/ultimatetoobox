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
  },
  "/converters/age-calculator": {
    "subject": "the age calculator",
    "howItWorks": [
      "The calculator measures the gap between a birth date and a target date, which defaults to today. It counts complete years first, then the complete months left over, then the remaining days. A separate figure gives the total number of days, which is the difference between the two dates divided by the length of a day.",
      "Calendar rules such as different month lengths and leap days are handled for you, so you do not have to count them by hand. You can also change the target date to find an age at a past or future moment, such as on the day you start a job or retire."
    ],
    "examples": [
      {
        "title": "15 March 1990 to 26 October 2026",
        "steps": [
          "Complete years: 36 (up to 15 March 2026)",
          "Complete months after that: 7 (up to 15 October 2026)",
          "Remaining days: 11",
          "Result: 36 years, 7 months and 11 days"
        ]
      },
      {
        "title": "Why total days is not years × 365",
        "steps": [
          "1 January 2000 to 1 January 2001 is 1 year and 366 days, because 2000 was a leap year."
        ]
      }
    ],
    "tips": [
      "Enter the birth date exactly as on the official document, and check the order of day and month, which differs between countries.",
      "A leap-day birthday (29 February) happens only in leap years. Countries differ on whether a person born that day turns a year older on 28 February or on 1 March in other years, so check the rule that applies for legal purposes.",
      "Use the target date field for forms that ask for your age on a given date, such as an entry deadline or a school cut-off."
    ]
  },
  "/converters/area": {
    "subject": "the area converter",
    "howItWorks": [
      "Every unit on this page is defined against one base unit, the square metre. A value is first converted to square metres by multiplying by that unit's size, then divided by the size of the unit you want. A hectare is 10,000 square metres and an acre is about 4,046.9 square metres, so these two steps work for any pair of the ten units.",
      "Area units are squares of length units, so the factors grow quickly. One metre is about 3.28 feet, but one square metre is about 10.76 square feet, because the length factor is squared."
    ],
    "examples": [
      {
        "title": "1 hectare in square metres",
        "steps": [
          "1 × 10,000 = 10,000 m²"
        ]
      },
      {
        "title": "1 acre in hectares and square feet",
        "steps": [
          "1 acre ≈ 4,046.86 m²",
          "4,046.86 ÷ 10,000 ≈ 0.405 hectares",
          "1 acre ≈ 43,560 square feet"
        ]
      },
      {
        "title": "A 2,500 sq ft house in square metres",
        "steps": [
          "2,500 × 0.0929 ≈ 232 m²"
        ]
      }
    ],
    "tips": [
      "Do not reuse a length factor for area. Converting square feet to square metres needs 0.0929, not 0.3048.",
      "Land is often sold in acres or hectares, floor space in square feet or square metres. Convert both to one unit before you compare prices per unit of area.",
      "A square mile is 640 acres, or about 259 hectares."
    ]
  },
  "/converters/percentage": {
    "subject": "the percentage calculator",
    "howItWorks": [
      "The calculator has three modes. What is X% of Y multiplies Y by X divided by 100. X is what % of Y divides X by Y and multiplies by 100. Percentage change subtracts the old value from the new one, divides by the old value and multiplies by 100. A negative result means a decrease.",
      "A percentage is always relative to a starting amount. Changing which number you treat as the starting point changes the answer, which is the source of most percentage mistakes."
    ],
    "examples": [
      {
        "title": "What is 15% of 80?",
        "steps": [
          "80 × 15 ÷ 100 = 12"
        ]
      },
      {
        "title": "30 is what percent of 120?",
        "steps": [
          "30 ÷ 120 × 100 = 25%"
        ]
      },
      {
        "title": "Percentage change, up and down",
        "steps": [
          "From 80 to 100: (100 − 80) ÷ 80 × 100 = +25%",
          "From 100 back to 80: (80 − 100) ÷ 100 × 100 = −20%",
          "The same 20-unit gap is a 25% rise one way and a 20% fall the other, because the starting amounts differ."
        ]
      }
    ],
    "tips": [
      "Two discounts do not add up. A 20% discount followed by a further 10% discount leaves 0.8 × 0.9 = 0.72 of the price, a 28% saving in total, not 30%.",
      "Do not mix up percent and percentage points. If an interest rate moves from 4% to 5%, it rose by 1 percentage point but by 25% in relative terms.",
      "To add a percentage, multiply by 1 plus the rate: adding 15% to 200 is 200 × 1.15 = 230."
    ]
  },
  "/converters/time-zone": {
    "subject": "the time zone converter",
    "howItWorks": [
      "Every place on Earth follows a time zone defined as an offset from Coordinated Universal Time (UTC). The converter turns the time you enter into a single UTC moment, then shows that moment as local time in each zone you pick. Zones are named after regions and cities, such as Africa/Harare or America/New_York, because a city's rules can include daylight saving changes that a plain offset cannot describe.",
      "The zone list and the daylight saving rules come from the zone data built into your browser and the date-fns-tz library, so results follow the rules in force on the date you choose, not just today's offset."
    ],
    "examples": [
      {
        "title": "15:00 UTC in Harare",
        "steps": [
          "Harare is UTC+2 all year, with no daylight saving.",
          "15:00 + 2 hours = 17:00"
        ]
      },
      {
        "title": "09:00 in New York on 15 March 2027, in London",
        "steps": [
          "The United States starts daylight saving on 14 March 2027, so New York is on UTC−4.",
          "The United Kingdom does not change until 28 March 2027, so London is still on UTC+0.",
          "09:00 + 4 hours = 13:00 in London. For most of the year the gap is 5 hours."
        ]
      }
    ],
    "tips": [
      "Pick the city or region name, not an abbreviation. CST can mean US Central, China or Cuba Standard Time.",
      "Daylight saving dates differ by country. The US and the EU change on different weekends, so the gap between two cities can shift by an hour for a few weeks each year.",
      "For meetings across several zones, convert once and share the UTC time as well as each local time to avoid mix-ups."
    ]
  },
  "/finance/earnings-per-share-calculator": {
    "subject": "the earnings per share calculator",
    "howItWorks": [
      "Earnings per share shows how much of a company's profit belongs to each share. Basic EPS subtracts preferred dividends from net income, because those are owed to preferred shareholders first, and divides what is left by the weighted average number of ordinary shares during the period.",
      "Diluted EPS adds shares that could be created by options, warrants or convertible securities to the divisor. It shows a cautious view for existing shareholders and, when earnings are positive, is equal to or lower than basic EPS."
    ],
    "examples": [
      {
        "title": "Net income $5,000,000, preferred dividends $500,000, 2,000,000 weighted shares",
        "steps": [
          "Earnings for ordinary shareholders: 5,000,000 − 500,000 = $4,500,000",
          "Basic EPS: 4,500,000 ÷ 2,000,000 = $2.25",
          "With 250,000 dilutive shares: 4,500,000 ÷ 2,250,000 = $2.00"
        ]
      }
    ],
    "tips": [
      "Use the weighted average share count for the period, not the number outstanding at year end, because shares issued or bought back during the year only count for part of it.",
      "Compare EPS only between similar periods. To compare different companies, look at it next to the share price, for example in the price-to-earnings ratio.",
      "EPS is only as good as the net income behind it. One-off gains or losses can distort it, so check whether they are included."
    ]
  },
  "/finance/income-tax": {
    "subject": "the income tax calculator",
    "howItWorks": [
      "Most income tax systems are progressive: income is split into bands, and each band is taxed at its own rate. Only the part of your income that falls inside a band is taxed at that band's rate, so a pay rise never lowers your take-home pay by pushing all of your income into a higher rate.",
      "This calculator covers 16 countries, using the 2025 or 2025-26 tax year rates built into it. It estimates income tax only and does not include state or local taxes or social security contributions, which can be large in some countries. Treat the result as an estimate, not as a tax return."
    ],
    "examples": [
      {
        "title": "US example: $60,000 income with the default standard deduction",
        "steps": [
          "Taxable income: 60,000 − 15,750 = $44,250",
          "First $11,925 at 10% = $1,192.50",
          "Next $32,325 (up to $44,250) at 12% = $3,879.00",
          "Total tax: $5,071.50, an average rate of about 8.45% of income",
          "The marginal rate, the rate on the last dollar earned, is 12%."
        ]
      }
    ],
    "tips": [
      "Know the difference between the marginal rate and the average (effective) rate. The marginal rate applies to your next dollar, while the average rate is total tax divided by total income.",
      "Deductions reduce the income that is taxed; credits reduce the tax itself, so a credit of the same size is worth more.",
      "Rates and allowances change every year. Check your tax authority for the current figures before you file."
    ]
  },
  "/finance/loan-calculator": {
    "subject": "the loan calculator",
    "howItWorks": [
      "The monthly payment follows the standard amortisation formula: M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the amount borrowed, r is the monthly rate (the yearly rate divided by 100 and by 12) and n is the number of monthly payments (years × 12). Interest is charged on the balance that remains each month, so early payments are mostly interest and later payments are mostly principal.",
      "At a 0% rate the calculator simply divides the amount by the number of months, so 12000 over 1 year is 1000 a month with no interest charged."
    ],
    "examples": [
      {
        "title": "$10,000 at 6% a year for 5 years",
        "steps": [
          "r = 0.06 ÷ 12 = 0.005 and n = 60",
          "Monthly payment ≈ $193.33",
          "Total paid: 193.33 × 60 ≈ $11,600, so interest is about $1,600"
        ]
      },
      {
        "title": "The same loan over 10 years",
        "steps": [
          "r = 0.005 and n = 120",
          "Monthly payment ≈ $111.02",
          "Total paid ≈ $13,322, so interest rises to about $3,322"
        ]
      }
    ],
    "tips": [
      "A longer term lowers the monthly payment but raises the total interest, as the two examples show.",
      "Paying extra toward the principal shortens the loan and cuts interest, because every extra dollar reduces the balance that interest is charged on.",
      "The payment shown covers principal and interest only. Compare loans using the annual percentage rate (APR) from the lender, which includes certain fees."
    ]
  },
  "/finance/salary-converter": {
    "subject": "the salary converter",
    "howItWorks": [
      "The converter turns a pay rate into the other common periods using three assumptions: 52 weeks a year, 5 working days a week, and a number of hours per week that starts at 40 and that you can change. At 40 hours that makes 40 × 52 = 2,080 working hours a year and a working day of 8 hours.",
      "Hourly pay is annual pay divided by the yearly hours, and every other period follows from the same two numbers. The figures are gross, meaning before tax and other deductions."
    ],
    "examples": [
      {
        "title": "$25 an hour at 40 hours a week",
        "steps": [
          "Weekly: 25 × 40 = $1,000",
          "Annual: 1,000 × 52 = $52,000",
          "Monthly: 52,000 ÷ 12 ≈ $4,333.33",
          "Daily: 25 × 8 = $200"
        ]
      },
      {
        "title": "A $60,000 salary as an hourly rate",
        "steps": [
          "60,000 ÷ 2,080 ≈ $28.85 an hour"
        ]
      },
      {
        "title": "The same $25 rate at 37.5 hours a week",
        "steps": [
          "25 × 37.5 × 52 = $48,750 a year"
        ]
      }
    ],
    "tips": [
      "Change the hours per week if your contract differs. A shorter week lowers every annual figure.",
      "Paid leave and public holidays are already inside the 52 weeks. If you are paid only for hours worked and take unpaid leave, your real annual income will be lower.",
      "Overtime, bonuses and tax are not included. Use the result to compare offers, not to predict your bank balance."
    ]
  },
  "/text-data/word-unscrambler": {
    "subject": "the word unscrambler",
    "howItWorks": [
      "Enter a set of letters and the tool searches a word list for real words that can be made from them. The word lists are stored by length, from 2 to 15 letters, in six languages: English, French, German, Spanish, Italian and Portuguese. Pick the language first, because the same letters can form words in one language and not in another.",
      "Words that use exactly the same letters in a different order are called anagrams, for example listen, silent, enlist and tinsel. The results can also include shorter words made from only some of your letters, which is useful in word games."
    ],
    "examples": [
      {
        "title": "Letters entered: listen",
        "steps": [
          "Anagrams found include silent, enlist and tinsel."
        ]
      },
      {
        "title": "Letters entered: team",
        "steps": [
          "Anagrams found include meat, mate and tame."
        ]
      }
    ],
    "tips": [
      "Word lists differ from game to game. A word that appears here may not be accepted by a particular game's official dictionary, and the other way round.",
      "Use ? or * for a blank tile. Each one stands for exactly one letter, so c?t finds cat, cot and cut. Enter at least 2 letters; blank tiles count towards that.",
      "Spelling variants such as colour and color may appear in only one list, so try both."
    ]
  }
};
