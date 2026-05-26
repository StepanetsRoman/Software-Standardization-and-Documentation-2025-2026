/**
 * Утиліти згоди на cookies та категорій обробки (GDPR-сумісна модель преференцій).
 * Дані зберігаються в `localStorage` лише для керування згодою; гра та історія використовують окремі ключі згідно з політиками.
 * @module cookieConsent
 */

export const COOKIE_CONSENT_STORAGE_KEY = "trivia-quiz-cookie-consent-v1";
export const COOKIE_CONSENT_VERSION = 1;

/**
 * Дозволені категорії cookies (marketing зарезервовано майбутніми інтеграціями).
 *
 * @typedef {Object} CookieCategories
 * @property {boolean} necessary — технічно необхідні (завжди true після збереження)
 * @property {boolean} analytics — аналітика (опційно)
 * @property {boolean} marketing — маркетинг (опційно)
 */

/**
 * @typedef {"pending" | "accepted" | "rejected" | "custom"} ConsentResolution
 */

/**
 * @typedef {Object} CookieConsentState
 * @property {number} version
 * @property {string} updatedAt — ISO-8601
 * @property {ConsentResolution} resolution
 * @property {CookieCategories} categories
 */

/**
 * @returns {CookieCategories}
 */
export function createDefaultCategories() {
  return {
    necessary: true,
    analytics: false,
    marketing: false
  };
}

/**
 * @param {unknown} raw
 * @returns {raw is CookieConsentState}
 */
function isConsentState(raw) {
  if (!raw || typeof raw !== "object") return false;
  const o = /** @type {Record<string, unknown>} */ (raw);
  return (
    typeof o.version === "number" &&
    typeof o.updatedAt === "string" &&
    typeof o.resolution === "string" &&
    o.categories &&
    typeof o.categories === "object"
  );
}

/**
 * Зчитує збережену згоду з localStorage.
 *
 * @returns {CookieConsentState | null}
 */
export function loadCookieConsent() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isConsentState(parsed)) return null;
    return /** @type {CookieConsentState} */ (parsed);
  } catch {
    return null;
  }
}

/**
 * Зберігає згоду користувача.
 *
 * @param {Omit<CookieConsentState, "version" | "updatedAt"> & Partial<Pick<CookieConsentState, "version" | "updatedAt">>} input
 * @returns {CookieConsentState}
 */
export function saveCookieConsent(input) {
  const state = {
    version: input.version ?? COOKIE_CONSENT_VERSION,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
    resolution: input.resolution,
    categories: {
      necessary: true,
      analytics: Boolean(input.categories?.analytics),
      marketing: Boolean(input.categories?.marketing)
    }
  };
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
  }
  return state;
}

/**
 * Чи потрібно показувати банер (немає збереженого рішення або застаріла версія).
 *
 * @returns {boolean}
 */
export function shouldShowCookieBanner() {
  const existing = loadCookieConsent();
  if (!existing) return true;
  if (existing.version !== COOKIE_CONSENT_VERSION) return true;
  return existing.resolution === "pending";
}

/**
 * Повна згода на всі опційні категорії.
 *
 * @returns {CookieConsentState}
 */
export function acceptAllCookieCategories() {
  return saveCookieConsent({
    resolution: "accepted",
    categories: { necessary: true, analytics: true, marketing: true }
  });
}

/**
 * Лише необхідні cookies (опційні відхилено).
 *
 * @returns {CookieConsentState}
 */
export function rejectOptionalCookieCategories() {
  return saveCookieConsent({
    resolution: "rejected",
    categories: createDefaultCategories()
  });
}

/**
 * Користувацька конфігурація категорій.
 *
 * @param {Pick<CookieCategories, "analytics" | "marketing">} partial
 * @returns {CookieConsentState}
 */
export function saveCustomCookieCategories(partial) {
  return saveCookieConsent({
    resolution: "custom",
    categories: {
      necessary: true,
      analytics: Boolean(partial.analytics),
      marketing: Boolean(partial.marketing)
    }
  });
}

/**
 * Ставить прапорець для перевірки зовнішніх інтеграцій (наприклад, аналітики).
 *
 * @returns {boolean}
 */
export function isAnalyticsAllowed() {
  const c = loadCookieConsent();
  return Boolean(c?.categories.analytics);
}
