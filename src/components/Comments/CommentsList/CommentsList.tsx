import React from 'react'
import './CommentsList.scss'
import CommentsListProps from './types'
import Comment from "@/components/Comments/Comment";

export default function CommentsList(props: CommentsListProps) {
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