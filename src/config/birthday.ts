export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: string;
}

export interface BirthdayConfig {
  recipientName: string;
  birthdayDate: string;
  subtitle: string;
  openingText: {
    line1: string;
    line2: string;
    line3: string;
    buttonText: string;
  };
  mainPhoto: string;
  cakeMessage: string;
  letter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    sender: string;
  };
  memories: MemoryItem[];
  playlist: PlaylistItem[];
  wishes: string[];
  finalWishQuote: string;
  interactiveStars: {
    title: string;
    instruction: string;
    starCount: number;
    completedTitle: string;
    hiddenMessage: string;
  };
  finalSurprise: {
    waitLine1: string;
    waitLine2: string;
    headline: string;
    subline: string;
    replayButton: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipientName: "You",
  birthdayDate: "November 7",
  subtitle: "November 7 • A world made with gratitude & quiet love",
  openingText: {
    line1: "Hey...",
    line2: "I made something quiet and special for you.",
    line3: "Take your time and take a breath.",
    buttonText: "Begin the Journey ↓",
  },
  mainPhoto: "/images/photo-1.jpg",
  cakeMessage: "May every silent wish of your kind heart come true ✦",
  letter: {
    title: "A Letter from the Heart",
    greeting: "Happy Birthday,",
    paragraphs: [
      "I wanted to make something a little different for your special day. Some people become an indelible part of our story, and the memories they leave behind continue to mean something profound.",
      "“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”",
      "I hope this new year of your life brings you deep peace, boundless happiness, wonderful opportunities, and countless reasons to smile from your heart.",
      "No expectations, no pressure, and nothing left unsaid — just a sincere wish that life treats you kindly, wherever your path may lead.",
    ],
    closing: "With quiet gratitude and warmth,",
    sender: "Take care of yourself, always ♡",
  },
  memories: [
    {
      id: "1",
      title: "A Radiant Smile",
      date: "Captured in Time",
      caption: "A genuine glimpse of happiness, holding light in every gentle glance.",
      image: "/images/photo-1.jpg",
    },
    {
      id: "2",
      title: "Grace & Serenity",
      date: "Treasured Chapter",
      caption: "An effortless warmth and calm that remains truly unforgettable.",
      image: "/images/photo-2.jpg",
    },
    {
      id: "3",
      title: "Timeless Moments",
      date: "Always Cherished",
      caption: "Some memories don't fade; they stay softly etched in the heart forever.",
      image: "/images/photo-3.jpg",
    },
    {
      id: "4",
      title: "Gentle Reflections",
      date: "A Beautiful Story",
      caption: "The quiet moments of laughter and understanding that time preserves with dignity.",
      image: "/images/photo-4.jpg",
    },
  ],
  playlist: [
    {
      id: "s1",
      title: "The Last Letter",
      artist: "Maan Panu",
      src: "/audio/the-last-letter.m4a",
      cover: "/images/photo-1.jpg",
      duration: "3:42",
    },
    {
      id: "s2",
      title: "ONLY",
      artist: "Lee Hi",
      src: "/music/song3.mp3",
      cover: "/covers/song3.jpg",
      duration: "2:50",
    },
    {
      id: "s3",
      title: "Some",
      artist: "Soyu & Junggigo",
      src: "/music/song1.mp3",
      cover: "/covers/song1.jpg",
      duration: "3:29",
    },
  ],
  wishes: [
    "May your days be illuminated by genuine smiles and quiet peace.",
    "May all the silent dreams your kind heart secretly holds come true one by one.",
    "May life treat you gently, with endless kindness and warm blessings.",
    "May you always find tranquility in quiet moments and courage in new chapters.",
    "May you always be surrounded by people who cherish the goodness in you.",
  ],
  finalWishQuote: "“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”",
  interactiveStars: {
    title: "Find the Stars ✦",
    instruction: "Tap on all glowing stars floating around to reveal a message",
    starCount: 5,
    completedTitle: "You Found Them All ♡",
    hiddenMessage:
      "No matter how vast the universe is, your brightness and gentle spirit will always shine. Keep smiling and shining bright!",
  },
  finalSurprise: {
    waitLine1: "Wait...",
    waitLine2: "There's one more thing.",
    headline: "Happy Birthday",
    subline: "May this year be the gentlest, brightest, and most peaceful chapter of your journey.",
    replayButton: "Replay Experience ↻",
  },
};
