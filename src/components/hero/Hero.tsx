import clsx from 'clsx';
import styles from './Hero.module.scss';

interface HeroProps {
  backgroundImage?: string;
  title: string;
  text: string;
  button?: JSX.Element | null;
  backgroundImageAlt?: string;
}

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  title,
  text,
  button = null,
  backgroundImageAlt = '',
}) => {
  return (
    <section
      className={styles.hero}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
            }
          : {}
      }
      aria-labelledby="hero-title"
    >
      {backgroundImage && backgroundImageAlt && (
        <span className={styles.visually_hidden}>{backgroundImageAlt}</span>
      )}
      <div className={clsx(styles.hero_content, 'content-container')}>
        <h1 id="hero-title" className={styles.hero_title}>
          {title}
        </h1>
        <p className={styles.hero_text}>{text}</p>
        {button && <div className={styles.hero_button}>{button}</div>}
      </div>
    </section>
  );
};
