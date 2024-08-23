import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.scss';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={clsx(styles.mainContainer, className)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };
