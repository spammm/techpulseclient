import { GoogleTagManager } from '@next/third-parties/google';
import dynamic from 'next/dynamic';

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG;

const YandexMetrika = dynamic(() => import('./YandexMetrika'), { ssr: false });
const YandexRTB = dynamic(() => import('./YandexRTB'), {
  ssr: false,
});

export const Analytics = () => (
  <>
    {googleTagId && <GoogleTagManager gtmId={googleTagId} />}
    <YandexMetrika />
    <YandexRTB />
  </>
);

export default Analytics;
