import clsx from 'clsx';
import { InfoCard } from './InfoCard';
import styles from './InfoCards.module.scss';

export const InfoCards: React.FC = () => {
  return (
    <section className={styles.infoCards} aria-label="Основные направления">
      <div className={clsx(styles.infoCardsList, 'content-container')}>
        <InfoCard
          title="Новинки техники"
          description="Самые свежие новости о последних гаджетах и технологических разработках."
          imageUrl="/img/cards/ingeneer.webp"
          tags={['гаджеты', 'технологии']}
        />
        <InfoCard
          title="Перспективные разработки"
          description="Обзор технологий, которые изменят наше будущее."
          imageUrl="/img/cards/notebook.webp"
          tags={['разработки', 'будущее']}
        />
        <InfoCard
          title="Аналитика и прогнозы"
          description="Экспертные мнения и прогнозы по развитию технологий."
          imageUrl="/img/cards/mozg.webp"
          tags={['аналитика', 'прогнозы']}
        />
        <InfoCard
          title="Интервью с экспертами"
          description="Интервью с лидерами индустрии о текущих трендах и будущем технологий."
          imageUrl="/img/cards/interview.webp"
          tags={['интервью', 'лидеры']}
        />
      </div>
    </section>
  );
};
