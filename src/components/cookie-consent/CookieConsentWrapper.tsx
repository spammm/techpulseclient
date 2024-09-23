import { Suspense } from 'react';
import CookieConsent from './CookieConsent';

export const CookieConsentWrapper = () => (
  <Suspense fallback={null}>
    <CookieConsent />
  </Suspense>
);

export default CookieConsentWrapper;
