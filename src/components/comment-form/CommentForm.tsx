import { addCommentToPost } from '@/api/commentsApi';
import React, { useState } from 'react';

export const CommentForm: React.FC<{ postId: number }> = ({ postId }) => {
  const [commentText, setCommentText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentData = {
      text: commentText,
      published: false,
    };
    const newComment = await addCommentToPost(postId, commentData);
    console.log('Comment added:', newComment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
