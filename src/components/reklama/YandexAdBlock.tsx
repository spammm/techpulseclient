import { useEffect } from 'react';

interface YandexAdBlockProps {
  blockId: string; // Это уникальный блок ID, который предоставляет Яндекс
}

const YandexAdBlock: React.FC<YandexAdBlockProps> = ({ blockId }) => {
  useEffect(() => {
    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: blockId,
        renderTo: `yandex_rtb_${blockId}`,
      });
    });
  }, [blockId]);

  return <div id={`yandex_rtb_${blockId}`} />;
};

export default YandexAdBlock;
