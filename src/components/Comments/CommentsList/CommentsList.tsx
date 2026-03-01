import React, { memo } from 'react'
import type { CommentsListProps } from './types'
import './CommentsList.scss'
import Comment from "@/components/Comments/Comment";

export const CommentsList = (props: CommentsListProps) => {
    const { comments, onDelete } = props

    return (
      <div className="comments__list">
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              className="comments__item"
              comment={comment}
              handleDeleteComment={onDelete}
            />
          ))}
      </div>
    );
}

export default memo(CommentsList);