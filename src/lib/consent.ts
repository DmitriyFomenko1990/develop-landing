export const CONSENT_KEY = "oknemoff-cookie-consent";
export const METRIKA_ID = 112576002;

export type ConsentChoice = "accepted" | "denied";

export function readConsent(): ConsentChoice | "" {
  if (typeof window === "undefined") {
    return "";
  }
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "denied" ? value : "";
}

export function writeConsent(choice: ConsentChoice) {
  window.localStorage.setItem(CONSENT_KEY, choice);
}
