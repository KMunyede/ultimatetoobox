import { AppContent } from "./types";

export const ultimateTicTacToe: AppContent = {
  slug: "ultimate-tic-tac-toe",
  name: "Ultimate TicTacToe",
  packageId: "net.hilmost.ultimatetictactoe",
  developer: "Hilmost Software Corporation",
  contactEmail: "support@hilmost.net",
  status: "coming-soon",
  storeUrl: "https://play.google.com/store/apps/details?id=net.hilmost.ultimatetictactoe",
  videoUrl: "https://youtu.be/BK9HdA9mSOQ",
  effectiveDate: "14 October 2026",
  tagline: "A multi-dimension Tic Tac Toe that's genuinely challenging",
  summary: [
    "Rotate, zoom, pan your board to get a different view of gameplay."
  ],
  features: [
    "Play as a guest, or sign in with Google, email or username",
    "Guest stats are merged into your account when you sign in",
    "Free to play, supported by ads"
  ],
  howToPlay: [
    {
      heading: "The basics",
      paragraphs: [
        "Two players take turns placing X and O; X always goes first. Each small board is classic tic-tac-toe: three in a row, column or diagonal wins that board. A full board with no line is a draw."
      ]
    },
    {
      heading: "Pick your rule set",
      items: [
        "Standard (default, 1 or 2 boards): to win the match you must win EVERY board in play. Anything less is a draw. Perfect for purists who like pressure.",
        "Most Wins (1-9 boards): win more boards than your opponent. Equal tallies = draw.",
        "Ultimate (always 9 boards): the classic Ultimate Tic Tac Toe. The 9 boards form a big 3x3 grid; win three small boards in a row on the big grid to win the match.",
        "Chaos (1-9 boards): Most Wins scoring, plus a countdown clock and surprise turn twists. The clock scales with the board count: 1:30 (1-3 boards), 3:30 (4-6), 4:30 (7-9)."
      ]
    },
    {
      heading: "The Ultimate \"send\" rule",
      paragraphs: [
        "In Ultimate, where you play decides where your opponent plays next. Mark the top-right square of a small board, and your opponent must move in the top-right board. If that board is already won or full, they get a free move anywhere."
      ]
    },
    {
      heading: "Ways to play",
      items: [
        "Player vs AI: Easy, Medium or Hard. Hard searches deep with minimax.",
        "Player vs Player: two people, one device.",
        "Online AI: a smarter server opponent; if you lose connection, the game switches to the on-device AI automatically."
      ]
    },
    {
      heading: "Quick tips",
      items: [
        "Ultimate: before you move, look at the board you're sending your opponent to. Never send them to a board they can win next turn.",
        "Ultimate: the centre board touches the most winning lines. Fight for it early.",
        "Most Wins & Chaos: close out boards you're winning before starting new fights.",
        "Standard: one lost board ends your hopes of a win, so play defence first.",
        "Chaos: keep an eye on the clock; quick, solid moves beat perfect slow ones."
      ]
    }
  ],
  faq: [
    {
      q: "Is it free?",
      a: "Yes. The game is free and supported by ads."
    },
    {
      q: "Do I need an account?",
      a: "No. Play as a guest right away. Sign in (Google, email or username) to keep your stats, XP and streaks synced to your account."
    },
    {
      q: "Does it work offline?",
      a: "Yes. Player vs AI and Player vs Player work without internet. Online AI needs a connection and falls back to the on-device AI if it drops."
    },
    {
      q: "Can I save a game?",
      a: "Yes, keep up to 3 saved games and continue them later."
    },
    {
      q: "Is there undo or hints?",
      a: "No, every move counts."
    },
    {
      q: "What stats are tracked?",
      a: "Wins, losses and draws for each AI level and for Player vs Player, plus total XP, current streak and best streak."
    },
    {
      q: "How do I delete my account?",
      a: "In the app: Menu > Account / Profile > Delete Account, or see our delete-account page: https://hilmost.net/apps/ultimate-tic-tac-toe/delete-account"
    }
  ],
  privacy: [
    {
      heading: "Who we are",
      paragraphs: [
        "Developer: Hilmost Software Corporation (an independent developer, not yet incorporated) · support@hilmost.net"
      ]
    },
    {
      heading: "What this covers",
      paragraphs: [
        "The Android game Ultimate TicTacToe (net.hilmost.ultimatetictactoe)."
      ]
    },
    {
      heading: "What we collect",
      bullets: [
        "Guest play: when you play as a guest, Firebase gives you an anonymous account ID, and your game stats and saved games are stored with it on our servers. This ID is not linked to your name or email.",
        "If you sign in (with Google, an email address and password, or a username and password): your email address, account ID, username, and, if you use Google, your display name and profile photo link. Passwords are handled by Firebase Authentication. We never see or store them.",
        "Game data: your stats, progress and saved games. When a guest signs in, their guest stats are merged into the account and the guest record is deleted.",
        "Sign-in protection: when someone signs in with a username, we keep a short-lived count of attempts, linked to that username and a scrambled (one-way hashed) form of the device's IP address. It is deleted automatically, usually within 1-2 days.",
        "Ads: the game shows ads from Google AdMob (banners and full-screen ads between games). To show ads, measure them and prevent fraud, AdMob may collect your device's advertising ID, approximate location (from your IP address), device information and how you interact with ads. Players in the UK, EEA and Switzerland are asked for consent before personalised ads are shown. You can reset or delete your advertising ID in your Android settings. How Google uses this data: https://policies.google.com/technologies/partner-sites",
        "Fonts: the game downloads its fonts from Google Fonts, which receives your device's IP address.",
        "No in-app purchases. No analytics or crash-reporting tools. The app's permissions are internet access and the advertising ID."
      ]
    },
    {
      heading: "Why we use it",
      bullets: [
        "To sign you in, save and sync your progress, show ads that keep the game free, and keep the game fair (for example, preventing abuse).",
        "We never sell your data."
      ]
    },
    {
      heading: "Who processes it",
      paragraphs: [
        "Google (Firebase Authentication, Cloud Firestore, Cloud Functions, Google Sign-In, Google AdMob, Google Fonts) processes this data for us under Google's terms. Game data is stored in Google data centres in South Africa (Johannesburg). Our sign-in and game-server functions run in the United States."
      ]
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "While your account exists. When you delete your account, it is hidden at once and permanently erased after 30 days. During those 30 days you can restore it by signing in again. Guest data stays until you delete it or ask us to. Sign-in attempt records expire within 1-2 days. Ad data is held by Google AdMob under Google's policies."
      ]
    },
    {
      heading: "Your choices and rights",
      paragraphs: [
        "Play as a guest, refuse personalised ads in the consent form, or reset your advertising ID. Ask us for a copy of your data, a correction, or deletion: https://hilmost.net/apps/ultimate-tic-tac-toe/delete-account",
        "You can also complain to POTRAZ, Zimbabwe's data protection authority."
      ]
    },
    {
      heading: "Children",
      paragraphs: [
        "The game is not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child under 13 has signed in, email us and we will delete the data."
      ]
    },
    {
      heading: "Security",
      paragraphs: [
        "Data is sent over encrypted connections (HTTPS), and access is restricted by Firebase security rules."
      ]
    },
    {
      heading: "Changes",
      paragraphs: [
        "We will update this page and its effective date. Significant changes will be noted in the app or on this page before they take effect."
      ]
    },
    {
      heading: "Contact & Support",
      paragraphs: [
        "support@hilmost.net"
      ]
    }
  ],
  terms: [
    {
      heading: "1. Using the game",
      paragraphs: [
        "Free to play for personal, non-commercial use. The game is free and supported by ads. By playing, you accept these terms."
      ]
    },
    {
      heading: "2. Accounts",
      paragraphs: [
        "Sign-in is optional. Keep your sign-in details (Google account, email and password, or username and password) secure. Usernames must not be offensive or impersonate others. We may suspend or delete accounts that cheat, exploit bugs, abuse other players, or attack our systems."
      ]
    },
    {
      heading: "3. Fair use",
      paragraphs: [
        "Do not reverse-engineer, modify, or automate the game, or interfere with its servers."
      ]
    },
    {
      heading: "4. Ownership",
      paragraphs: [
        "The game, its design and its artwork belong to Hilmost Software Corporation. Open-source parts are listed on the app's Licences page."
      ]
    },
    {
      heading: "5. No warranty",
      paragraphs: [
        "The game is provided \"as is\". We may change, pause, or end features or the game at any time."
      ]
    },
    {
      heading: "6. Liability",
      paragraphs: [
        "To the extent the law allows, we are not liable for indirect losses or loss of game progress."
      ]
    },
    {
      heading: "7. Changes",
      paragraphs: [
        "We may update these terms. Continuing to play means you accept them."
      ]
    },
    {
      heading: "8. Law",
      paragraphs: [
        "These terms are governed by the laws of Zimbabwe. Nothing here removes rights you have under the consumer laws of the country where you live."
      ]
    },
    {
      heading: "Contact & Support",
      paragraphs: [
        "support@hilmost.net"
      ]
    }
  ],
  deletion: [
    {
      heading: "In the app",
      bullets: [
        "Open the menu, then Account / Profile, then Delete Account.",
        "Confirm, entering your password if asked.",
        "Your account is hidden at once and permanently erased after 30 days. To change your mind, sign in again within 30 days and choose Restore."
      ]
    },
    {
      heading: "If you cannot open the app",
      paragraphs: [
        "Email support@hilmost.net FROM the email address you signed in with (your Google email, or the email you registered with), with the subject \"Delete my Ultimate TicTacToe account\". We confirm the request came from that address, delete your account within 30 days, and email you when it's done."
      ]
    },
    {
      heading: "What we delete",
      paragraphs: [
        "Your sign-in record (Firebase account), email address, username, display name, profile photo link, and all stats, progress and saved games stored on our servers."
      ]
    },
    {
      heading: "What we keep",
      paragraphs: [
        "Your account data for 30 days after you delete it (so you can restore it), then nothing, except where the law requires it."
      ]
    },
    {
      heading: "Guest players",
      paragraphs: [
        "Guest stats are stored with an anonymous account ID that is not linked to your name or email. To have them deleted, sign in and use Delete Account (your guest stats are merged into your account first, then everything is deleted), or email support@hilmost.net and we will help."
      ]
    },
    {
      heading: "Advertising data",
      paragraphs: [
        "Ad data is collected and held by Google AdMob, not by us, so it isn't deleted with your account. Reset or delete your advertising ID in Android settings."
      ]
    },
    {
      heading: "Queries & Feedback",
      paragraphs: [
        "support@hilmost.net"
      ]
    }
  ]
};
