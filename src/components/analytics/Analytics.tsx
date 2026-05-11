import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_EVENT,
  hasCookieConsent,
} from '@/components/cookie-consent/consentStorage';

// Google analytics is temporarily disabled until the legal basis for use in Russia is confirmed.
// const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG;

const YandexMetrika = dynamic(() => import('./YandexMetrika'), { ssr: false });
const YandexRTB = dynamic(() => import('./YandexRTB'), {
  ssr: false,
});

export const Analytics = () => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsAllowed(hasCookieConsent());

    const allowAnalytics = () => setIsAllowed(true);
    window.addEventListener(COOKIE_CONSENT_EVENT, allowAnalytics);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, allowAnalytics);
    };
  }, []);

  if (!isAllowed) return null;

  return (
    <>
      {/* {googleTagId && <GoogleTagManager gtmId={googleTagId} />} */}
      <YandexMetrika />
      <YandexRTB />
    </>
  );
};

export default Analytics;
