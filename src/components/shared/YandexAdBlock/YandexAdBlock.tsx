import { useEffect } from 'react';

interface YandexAdBlockProps {
  blockId: string; // Яндекс блок ID
}

const YandexAdBlock: React.FC<YandexAdBlockProps> = ({ blockId }) => {
  const isHasId = !!blockId;

  useEffect(() => {
    if (isHasId) {
      const renderYandexAd = () => {
        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            blockId: blockId,
            renderTo: `yandex_rtb_${blockId}`,
          });
        });
      };

      renderYandexAd();

      // setTimeout для улучшения стабильности
      const timeoutId = setTimeout(renderYandexAd, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [blockId, isHasId]);

  if (!isHasId) return null;

  return <div id={`yandex_rtb_${blockId}`} />;
};

export default YandexAdBlock;
