import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { updateClientProfile } from '@/api/clientApi';
import type { IUser } from '@/types/user';

export const useAuthButton = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const openProfileModal = () => {
    setProfileModalOpen(true);
    setMenuOpen(false);
  };
  const closeProfileModal = () => setProfileModalOpen(false);

  const handleLogout = () => signOut();
  const handleSignIn = () => signIn();

  const handleSaveProfile = async (user: Partial<IUser>) => {
    if (!session?.user?.id) {
      console.error('Пользователь не авторизован');
      return;
    }

    try {
      const updatedUser = await updateClientProfile(session.user.id, user);
      console.log('Профиль успешно обновлен:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      throw error;
    }
  };

  return {
    session,
    isMenuOpen,
    isProfileModalOpen,
    toggleMenu,
    openProfileModal,
    closeProfileModal,
    handleLogout,
    handleSignIn,
    handleSaveProfile,
  };
};
