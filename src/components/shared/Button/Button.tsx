import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import MenuIcon from './menu-icon.svg';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'menu';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
      {variant === 'menu' && <MenuIcon className={styles.menuIcon} />}
    </button>
  );
};
