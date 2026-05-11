import Head from 'next/head';
import Link from 'next/link';

import styles from '@/styles/LegalPage.module.scss';

const CookiesPage = () => (
  <>
    <Head>
      <title>Политика использования cookie | TechPulse</title>
      <meta
        name="description"
        content="Информация о файлах cookie и аналогичных технологиях на сайте TechPulse."
      />
    </Head>
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Политика использования cookie</h1>
          <p>Редакция от 11 мая 2026 года.</p>
        </header>

        <div className={styles.content}>
          <section>
            <h2>1. Что такое cookie</h2>
            <p>
              Cookie — это небольшие фрагменты данных, которые сайт сохраняет в
              браузере пользователя. Они помогают поддерживать работу сайта,
              запоминать технические настройки, анализировать посещаемость и
              показывать релевантные материалы.
            </p>
          </section>

          <section>
            <h2>2. Какие cookie используются</h2>
            <ul>
              <li>
                необходимые cookie: авторизация, сессия, безопасность и
                корректная работа интерфейса;
              </li>
              <li>
                аналитические cookie: оценка посещаемости, источников переходов
                и взаимодействия с материалами;
              </li>
              <li>
                рекламные cookie: показ рекламы и оценка ее эффективности;
              </li>
              <li>
                функциональные cookie: работа социальных кнопок и сторонних
                виджетов.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Сторонние сервисы</h2>
            <p>
              Сайт может использовать Яндекс Метрику, Яндекс Рекламную сеть,
              Uptolike и сервисы социальной авторизации. Такие сервисы могут
              устанавливать собственные cookie и получать технические данные о
              посещении сайта.
            </p>
          </section>

          <section>
            <h2>4. Управление cookie</h2>
            <p>
              Необходимые cookie нужны для базовой работы сайта. Аналитические,
              рекламные и функциональные cookie подключаются только после
              нажатия кнопки «Согласен» в баннере cookie.
            </p>
            <p>
              Пользователь может отказаться от необязательных cookie в баннере,
              а также удалить cookie и данные локального хранилища сайта в
              настройках браузера.
            </p>
          </section>

          <section>
            <h2>5. Связанные документы</h2>
            <ul>
              <li>
                <Link href="/privacy">
                  Политика обработки персональных данных
                </Link>
              </li>
              <li>
                <Link href="/personal-data-consent">
                  Согласие на обработку персональных данных
                </Link>
              </li>
              <li>
                <Link href="/user-agreement">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  </>
);

export default CookiesPage;
