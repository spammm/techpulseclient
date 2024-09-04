import Script from 'next/script';

const YandexRTB: React.FC = () => {
  return (
    <>
      <Script
        id="yandex-rtb-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.yaContextCb=window.yaContextCb||[];`,
        }}
      />
      <Script
        src="https://yandex.ru/ads/system/context.js"
        strategy="afterInteractive"
        async
      />
    </>
  );
};

export default YandexRTB;
