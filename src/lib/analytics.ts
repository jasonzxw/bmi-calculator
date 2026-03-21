// GA4 event tracking helper
// All events are typed to prevent typos and ensure consistency

type EventName =
  | "calculate"
  | "save_image"
  | "language_switch"
  | "unit_switch"
  | "goal_select"
  | "activity_select"
  | "reset";

interface EventParams {
  calculate: {
    gender: string;
    age: number;
    bmi: number;
    bmi_category: string;
    goal: string;
    activity_level: string;
    unit_system: string;
  };
  save_image: { bmi_category: string };
  language_switch: { locale: string };
  unit_switch: { unit_system: string };
  goal_select: { goal: string };
  activity_select: { activity_level: string };
  reset: Record<string, never>;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent<T extends EventName>(
  name: T,
  params: EventParams[T]
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
