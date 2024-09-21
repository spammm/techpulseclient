import { useState, useEffect, useCallback } from 'react';
import { IComment } from '@/types/comment';
import { getCommentsForPost } from '@/api/commentsApi';

import styles from './CommentsList.module.scss';

interface CommentsListProps {
  postId: number;
  newComment?: IComment;
  initialComments?: IComment[];
}

const CommentsList: React.FC<CommentsListProps> = ({
  postId,
  newComment,
  initialComments = [],
}) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadComments = useCallback(async () => {
    try {
      const newComments = await getCommentsForPost(postId, page);
      if (newComments.length < 10) {
        setHasMore(false);
      }
      setComments((prev) => {
        const uniqueComments = newComments.filter(
          (comment) =>
            !prev.some((existingComment) => existingComment.id === comment.id)
        );
        return [...prev, ...uniqueComments];
      });
    } catch (error) {
      console.error('Ошибка загрузки комментариев:', error);
    }
  }, [postId, page]);

  useEffect(() => {
    if (newComment) {
      setComments((prev) => {
        if (!prev.some((comment) => comment.id === newComment.id)) {
          return [newComment, ...prev];
        }
        return prev;
      });
    }
  }, [newComment]);

  useEffect(() => {
    loadComments();
  }, [loadComments, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (!comments.length) {
    return <div className={styles.commentsList}>Комментариев пока нет</div>;
  }

  return (
    <div className={styles.commentsList}>
      <h3>Комментарии</h3>
      {comments.map((comment) => (
        <article key={comment.id} className={styles.comment}>
          <p itemProp="text">{comment.content}</p>
          <p>
            <time
              itemProp="dateCreated"
              dateTime={new Date(comment.createdAt).toISOString()}
            >
              {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>{' '}
            от{' '}
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">
                {comment.user.publicAlias || comment.user.firstName || 'Вас'}
              </span>
            </span>
          </p>
        </article>
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          className={styles.loadMoreButton}
          aria-label="Загрузить еще комментарии"
        >
          Загрузить еще
        </button>
      )}
    </div>
  );
};

export default CommentsList;
