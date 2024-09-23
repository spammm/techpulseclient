import React from 'react';
import Head from 'next/head';

import styles from './AboutPage.module.scss';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>О нас | TechPulse</title>
        <meta
          name="description"
          content="Узнайте больше о команде TechPulse и нашей миссии."
        />
      </Head>
      <div className={styles.aboutPage}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>О нас</h1>
          </header>
          <div className={styles.content}>
            <section className={styles.mission}>
              <h2>Наша миссия</h2>
              <p>
                Мы верим, что информация — это сила. Наша миссия — сделать
                информацию о технологиях доступной и понятной для всех.
                Независимо от того, являетесь ли вы IT-профессионалом,
                энтузиастом технологий или просто интересуетесь, как современные
                разработки влияют на вашу жизнь, TechPulse всегда готов
                предложить вам интересные и информативные материалы.
              </p>
            </section>
            <section className={styles.offerings}>
              <h2>Что мы предлагаем</h2>
              <ul>
                <li>Актуальные новости</li>
                <li>Аналитические обзоры</li>
                <li>Эксклюзивные интервью</li>
                <li>Обзоры гаджетов</li>
                <li>Гид по технологиям</li>
              </ul>
            </section>
            <section className={styles.team}>
              <h2>Наша команда</h2>
              <p>
                TechPulse — это команда профессионалов с глубоким пониманием
                технологий и страстью к тому, чтобы делиться своими знаниями с
                миром. Мы гордимся тем, что создаем контент, который помогает
                людям ориентироваться в мире технологий и использовать их в
                повседневной жизни.
              </p>
            </section>
            <section className={styles.contact}>
              <h2>Свяжитесь с нами</h2>
              <p>
                Если у вас есть вопросы, предложения или вы хотите сотрудничать
                с нами, напишите нам на email:{' '}
                <a href="mailto:info@tehpulse.ru">info@tehpulse.ru</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
