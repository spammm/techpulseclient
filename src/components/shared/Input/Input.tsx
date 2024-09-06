import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'search' | 'white';
}

export const Input: React.FC<InputProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <input
      className={clsx(styles.input, styles[variant], className)}
      {...props}
    />
  );
};
