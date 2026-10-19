export type ExperienceStep =
  | "intro"        // Step 1: Cinematic intro screen
  | "lockscreen"   // Step 2 & 3: iPhone lock screen & passcode 0712 keypad
  | "universe"     // Step 4: 3D romantic universe centerpiece (glass heart & petals)
  | "gallery"      // Step 5 & 6: Personal photo reveals with 3D tilt & hindi quote
  | "letter"       // Step 7: Romantic letter unfolding & interactive candle
  | "finale";      // Step 8: Final birthday scene, wishes, and replay

export interface SoundEffects {
  playTap: () => void;
  playUnlock: () => void;
  playError: () => void;
  playChime: () => void;
  playCandleBlow: () => void;
}
