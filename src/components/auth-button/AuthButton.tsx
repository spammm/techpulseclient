import clsx from 'clsx';
import { ProfileModal } from '../profile-modal';
import { useAuthButton } from './useAuthButton';
import { DropdownMenu } from './DropdownMenu';
import styles from './AuthButton.module.scss';

export const AuthButton: React.FC = () => {
  const {
    session,
    isMenuOpen,
    isProfileModalOpen,
    toggleMenu,
    openProfileModal,
    closeProfileModal,
    handleLogout,
    handleSignIn,
    handleSaveProfile,
  } = useAuthButton();

  if (!session) {
    return (
      <div className={styles.authButton}>
        <button
          onClick={handleSignIn}
          className={styles.loginButton}
          role="menuitem"
        >
          Войти
        </button>
      </div>
    );
  }

  const userName = session.user?.firstName || session.user?.email || 'User';

  return (
    <div className={styles.authButton}>
      <div className={styles.profileButton}>
        <button
          onClick={toggleMenu}
          className={clsx(styles.menuButton, { [styles.menuOpen]: isMenuOpen })}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-controls="auth-menu"
          role="button"
        >
          {userName.slice(0, 10)}
        </button>

        {isMenuOpen && (
          <DropdownMenu
            onProfileClick={openProfileModal}
            onLogoutClick={handleLogout}
          />
        )}

        {isProfileModalOpen && (
          <ProfileModal
            user={session.user}
            onClose={closeProfileModal}
            onSave={handleSaveProfile}
          />
        )}
      </div>
    </div>
  );
};
