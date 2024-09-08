import Link from 'next/link';
import { useEffect, useState } from 'react';

const Custom404: React.FC = () => {
  const [styles, setStyles] = useState<any>(null);

  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await import('../styles/404.module.scss');
      setStyles(loadedStyles);
    };
    loadStyles();
  }, []);

  if (!styles) return null;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.four0four} col-md-4 col-sm-12`}>
          <span className={styles.off}>4</span>
          <span className={styles.flicker2}>0</span>
          <span className={styles.flicker3}>4</span>
        </div>
        <div className={`${styles.notFound} col-lg-2 col-md-12`}>
          <span className={styles.flicker4}>С</span>
          <span className={styles.off}>т</span>
          <span>раница&nbsp;</span>
          <span>не&nbsp;</span>
          <span className={styles.off}>н</span>
          <span className={styles.flicker1}>а</span>
          <span className={styles.flicker3}>й</span>
          <span>д</span>
          <span className={styles.off}>е</span>
          <span className={styles.flicker4}>н</span>
          <span className={styles.flicker1}>а</span>
        </div>
        <div className={styles.fog0}></div>
        <div className={styles.fog1}></div>
        <div className={styles.fog2}></div>
        <div className={styles.fog3}></div>
        <div className={styles.fog4}></div>
      </div>
      <div className={styles.linkWrapper}>
        <Link href="/">Вернуться на главную</Link>
      </div>
    </div>
  );
};

export default Custom404;
