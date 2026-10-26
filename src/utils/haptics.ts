/**
 * Mobile Haptic Feedback Utility
 * Gracefully vibrates supported mobile devices for tactile feedback.
 */
export type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "heartbeat"
  | "success"
  | "scratch"
  | "lantern";

export function triggerHaptic(type: HapticType = "light") {
  if (typeof window === "undefined") return;

  try {
    if (!("navigator" in window) || !navigator.vibrate) return;

    switch (type) {
      case "light":
        navigator.vibrate(12);
        break;
      case "medium":
        navigator.vibrate(30);
        break;
      case "heavy":
        navigator.vibrate(60);
        break;
      case "scratch":
        navigator.vibrate(8);
        break;
      case "heartbeat":
        // Classic lub-dub rhythm
        navigator.vibrate([35, 70, 40]);
        break;
      case "lantern":
        // Smooth ascension pulse
        navigator.vibrate([20, 60, 30, 80, 50]);
        break;
      case "success":
        // Celebratory flutter
        navigator.vibrate([25, 45, 30, 50, 40]);
        break;
    }
  } catch {
    // Silently continue if browser blocks or lacks permission
  }
}
