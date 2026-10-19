export interface PhotoMemory {
  id: string;
  src: string;
  caption: string;
  date?: string;
  location?: string;
}

export interface BirthdayConfig {
  recipientName: string;
  birthdayDate: string; // e.g. "November 7"
  birthdayYear?: number;
  passcode: string; // "0712"
  
  // Cinematic Intro copy
  openingTitle: string;
  openingSubtitle: string;
  openingInvitation: string;

  // Personal Quote
  personalQuote: {
    hindi: string;
    english: string;
  };

  // Photographs
  photos: PhotoMemory[];

  // Letter & Wishes
  letter: {
    salutation: string;
    paragraphs: string[];
    favoriteMemoryTitle: string;
    favoriteMemoryText: string;
    birthdayWishTitle: string;
    birthdayWishText: string;
    closing: string;
    signOff: string;
  };

  // Final Scene
  finalMessage: string;
  finalSubtext: string;

  // Audio settings
  audio: {
    defaultMuted: boolean;
    customAudioPath?: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "You",
  birthdayDate: "November 7",
  birthdayYear: 2026,
  passcode: "0712",

  openingTitle: "A little world, made just for you.",
  openingSubtitle: "Some people leave beautiful memories wherever they go.",
  openingInvitation: "Tap to begin the journey",

  personalQuote: {
    hindi: "कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।",
    english: "Some bonds never truly end; only words quietly fall silent.",
  },

  photos: [
    {
      id: "photo-1",
      src: "/images/photo-1.jpg",
      caption: "A radiant glimpse of happiness, holding light in every gentle glance.",
      date: "A timeless memory",
      location: "Captured in time",
    },
    {
      id: "photo-2",
      src: "/images/photo-2.jpg",
      caption: "Grace and serenity — an effortless beauty that remains unforgettable.",
      date: "Treasured chapter",
      location: "In our thoughts",
    },
    {
      id: "photo-3",
      src: "/images/photo-3.jpg",
      caption: "Some memories don't fade; they stay softly etched in the heart forever.",
      date: "Special moment",
      location: "Always cherished",
    },
  ],

  letter: {
    salutation: "Happy Birthday,",
    paragraphs: [
      "I wanted to make something a little different for your special day. Some people become an indelible part of our story, and the memories they leave behind continue to mean something profound.",
      "“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”",
      "I hope this new year of your life brings you deep peace, boundless happiness, wonderful opportunities, and countless reasons to smile from your heart.",
      "No expectations, no pressure, and nothing left unsaid — just a sincere wish that life treats you kindly, wherever your path may lead.",
    ],
    favoriteMemoryTitle: "A Gentle Reflection",
    favoriteMemoryText:
      "The quiet moments of genuine laughter, unspoken understanding, and shared tranquility that time will always preserve with dignity.",
    birthdayWishTitle: "My Birthday Wish for You",
    birthdayWishText:
      "May you always walk through life surrounded by genuine warmth, protected by peace, and granted every dream your kind heart secretly holds.",
    closing: "Happy Birthday.",
    signOff: "Take care of yourself, always.",
  },

  finalMessage: "May your day be as luminous as the kindness you carry.",
  finalSubtext: "Celebrate today — you deserve every ounce of beauty this world has to offer.",

  audio: {
    defaultMuted: true,
    customAudioPath: "/audio/ambient.mp3",
  },
};
