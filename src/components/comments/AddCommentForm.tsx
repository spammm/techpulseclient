import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addCommentToPost } from '@/api/commentsApi';
import { IComment } from '@/types/comment';

import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  postId: number;
  onAddComment?: (comment: IComment) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onAddComment,
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastCommentTime = localStorage.getItem(`lastCommentTime_${postId}`);
    if (lastCommentTime) {
      const timePassed = Date.now() - Number(lastCommentTime);
      const timeLeft = 600000 - timePassed; // 600000 мс = 10 минут
      if (timeLeft > 0) {
        setTimeLeft(Math.ceil(timeLeft / 1000)); // переводим время в секунды
      }
    }
  }, [postId]);

  // Форматируем оставшееся время: "X минут" или "Меньше минуты"
  const formatTimeLeft = (seconds: number) => {
    if (seconds > 60) {
      const minutes = Math.floor(seconds / 60);
      return `Осталось ${minutes} минут`;
    }
    return 'Осталось меньше минуты';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) {
      setError('Комментарий не может быть пустым.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newComment = await addCommentToPost(postId, {
        content: comment,
        user: session?.user,
      });

      localStorage.setItem(`lastCommentTime_${postId}`, Date.now().toString());

      setComment('');
      setTimeLeft(600); // Таймер на 10 минут после отправки комментария

      if (newComment && onAddComment) {
        onAddComment(newComment);
      }
    } catch (error) {
      setError('Ошибка при отправке комментария.');
      console.log('Ошибка при отправке комментария.', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return <p>Вы должны быть авторизованы, чтобы оставлять комментарии.</p>;
  }

  if (timeLeft > 0) {
    return (
      <p>
        Комментарии можно оставлять не чаще, чем раз в 10 минут.{' '}
        {formatTimeLeft(timeLeft)}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addCommentForm}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Напишите комментарий..."
        className={styles.commentInput}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить комментарий'}
      </button>
    </form>
  );
};

export { AddCommentForm };
