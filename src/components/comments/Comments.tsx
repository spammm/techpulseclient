import { Suspense, useState } from 'react';
import { AddCommentForm } from './AddCommentForm';
import { IComment } from '@/types/comment';
import CommentsList from './CommentsList';

import styles from './Comments.module.scss';

interface CommentsProps {
  postId: number;
  initialComments?: IComment[];
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  initialComments = [],
}) => {
  const [newComment, setNewComment] = useState<IComment | undefined>(undefined);
  const handleNewComment = (comment: IComment) => {
    setNewComment(comment);
  };

  return (
    <>
      <AddCommentForm postId={postId} onAddComment={handleNewComment} />
      <Suspense
        fallback={
          <div className={styles.commentsLoader}>Загрузка комментариев...</div>
        }
      >
        <CommentsList
          postId={postId}
          newComment={newComment}
          initialComments={initialComments}
        />
      </Suspense>
    </>
  );
};

export { Comments };
