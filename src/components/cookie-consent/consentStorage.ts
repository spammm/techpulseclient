export const COOKIE_CONSENT_KEY = 'cookieConsent';
export const COOKIE_CONSENT_EVENT = 'cookieConsentAccepted';
export const COOKIE_CONSENT_VERSION = '2026-05-11';

type CookieConsentStatus = 'accepted' | 'rejected' | null;

export const getCookieConsentStatus = (): CookieConsentStatus => {
  try {
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consent) return null;

    const parsedConsent = JSON.parse(consent) as {
      accepted?: boolean;
      rejected?: boolean;
      version?: string;
    };

    if (parsedConsent.version !== COOKIE_CONSENT_VERSION) return null;
    if (parsedConsent.accepted) return 'accepted';
    if (parsedConsent.rejected) return 'rejected';

    return null;
  } catch {
    return null;
  }
};

export const hasCookieConsent = () => {
  return getCookieConsentStatus() === 'accepted';
};

export const saveCookieConsent = () => {
  window.localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({
      accepted: true,
      version: COOKIE_CONSENT_VERSION,
      acceptedAt: new Date().toISOString(),
    }),
  );
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
};

export const rejectCookieConsent = () => {
  window.localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({
      rejected: true,
      version: COOKIE_CONSENT_VERSION,
      rejectedAt: new Date().toISOString(),
    }),
  );
};
