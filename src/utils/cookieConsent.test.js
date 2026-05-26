import { describe, it, expect, beforeEach } from "vitest";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  loadCookieConsent,
  saveCookieConsent,
  rejectOptionalCookieCategories,
  acceptAllCookieCategories,
  saveCustomCookieCategories
} from "./cookieConsent.js";

describe("cookieConsent", () => {
  beforeEach(() => {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  });

  it("зберігає та завантажує згоду", () => {
    saveCookieConsent({
      resolution: "accepted",
      categories: { necessary: true, analytics: true, marketing: false }
    });
    const loaded = loadCookieConsent();
    expect(loaded?.resolution).toBe("accepted");
    expect(loaded?.categories.analytics).toBe(true);
    expect(loaded?.categories.necessary).toBe(true);
  });

  it("acceptAll вмикає опційні категорії", () => {
    const s = acceptAllCookieCategories();
    expect(s.categories.analytics).toBe(true);
    expect(s.categories.marketing).toBe(true);
  });

  it("rejectOptional вимикає опційні категорії", () => {
    const s = rejectOptionalCookieCategories();
    expect(s.resolution).toBe("rejected");
    expect(s.categories.analytics).toBe(false);
  });

  it("custom зберігає вибрані перемикачі", () => {
    const s = saveCustomCookieCategories({ analytics: true, marketing: false });
    expect(s.resolution).toBe("custom");
    expect(s.categories.analytics).toBe(true);
    expect(s.categories.marketing).toBe(false);
  });
});
