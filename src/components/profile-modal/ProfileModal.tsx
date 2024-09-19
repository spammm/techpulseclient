import { useState } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { IUser } from '@/types/user';
import { Input } from '../shared/Input';

import styles from './ProfileModal.module.scss';

interface IUpdateData {
  firstName: string;
  lastName?: string | undefined;
  publicAlias?: string | undefined;
  password?: string;
}

interface ProfileModalProps {
  user: Session['user'];
  onClose: () => void;
  onSave: (updateData: IUpdateData) => Promise<IUser | undefined>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const { update } = useSession();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [publicAlias, setPublicAlias] = useState(user?.publicAlias || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!firstName) {
      setErrorMessage('Имя не должно быть пустым.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают.');
      return;
    }

    const updateData: IUpdateData = { firstName, lastName, publicAlias };
    if (password) updateData.password = password;

    setIsSaving(true);
    setErrorMessage('');

    try {
      const updatedUser = await onSave(updateData);

      // Обновляем сессию после успешного сохранения данных
      if (updatedUser) {
        await update({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          publicAlias: updatedUser.publicAlias,
        });
      }

      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      setErrorMessage('Ошибка при сохранении данных.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Профиль пользователя</h2>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">Имя*</label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errorMessage.includes('Имя') ? styles.errorInput : ''}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Фамилия</label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Никнейм</label>
          <Input
            type="text"
            value={publicAlias}
            onChange={(e) => setPublicAlias(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email (нельзя изменить)</label>
          <Input type="email" value={user.email} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Новый пароль</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Подтвердите пароль</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errorMessage.includes('Пароли') ? styles.errorInput : ''}
          />
        </div>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Отмена
          </button>
          <button
            onClick={handleSave}
            className={styles.saveButton}
            disabled={!firstName || isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfileModal };
