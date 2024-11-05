import styles from './AuthButton.module.scss';

export const DropdownMenu: React.FC<{
  onProfileClick: () => void;
  onLogoutClick: () => void;
}> = ({ onProfileClick, onLogoutClick }) => (
  <ul className={styles.dropdownMenu} role="menu" id="auth-menu">
    <li role="menuitem">
      <button onClick={onProfileClick}>Профиль</button>
    </li>
    <li role="menuitem">
      <button onClick={onLogoutClick}>Выйти</button>
    </li>
  </ul>
);
