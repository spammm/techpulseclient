import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
import { ProfileModal } from '../profile-modal';
import { updateClientProfile } from '@/api/clientApi';
import { IUser } from '@/types/user';

import styles from './AuthButton.module.scss';

export const AuthButton: React.FC = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn();
  };

  const userName = session?.user?.firstName || session?.user?.email || 'User';

  const openProfileModal = () => {
    setProfileModalOpen(true);
    setMenuOpen(false);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const handleSaveProfile = async (user: Partial<IUser>) => {
    if (!session || !session.user || !session.user.id) {
      console.error('Пользователь не авторизован');
      return;
    }

    const userId = session.user.id;

    try {
      const updatedUser = await updateClientProfile(userId, user);
      console.log('Профиль успешно обновлен:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      throw error;
    }
  };

  return (
    <div className={styles.authButton}>
      {!session ? (
        <>
          <button onClick={handleSignIn} className={styles.loginButton}>
            Войти
          </button>
        </>
      ) : (
        <div className={styles.profileButton}>
          <button
            onClick={toggleMenu}
            className={clsx(styles.menuButton, {
              [styles.menuOpen]: isMenuOpen,
            })}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            {userName.slice(0, 10)}
          </button>
          {isMenuOpen && (
            <ul className={styles.dropdownMenu} role="menu">
              <li role="menuitem">
                <button onClick={openProfileModal}>Профиль</button>
              </li>
              <li role="menuitem">
                <button onClick={handleLogout}>Выйти</button>
              </li>
            </ul>
          )}

          {isProfileModalOpen && (
            <ProfileModal
              user={session.user}
              onClose={closeProfileModal}
              onSave={handleSaveProfile}
            />
          )}
        </div>
      )}
    </div>
  );
};
