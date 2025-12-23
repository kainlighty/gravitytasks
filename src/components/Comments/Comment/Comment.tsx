import React from 'react'
import type { CommentProps } from './types'
import { Button, Icon } from "@gravity-ui/uikit";
import { TrashBin } from "@gravity-ui/icons";
import clsx from "clsx";
import './Comment.scss'

export default function Comment(props: CommentProps) {
    const {
        className,
        comment,
        handleDeleteComment
    } = props;

    return (
      <div className={clsx("task-comment", className)} id={comment.id}>
          <span className="task-comment__text">{comment.text}</span>
          <Button
            className="task-comment__delete"
            view="flat-danger"
            size="s"
            aria-label="Удалить"
            onClick={() => handleDeleteComment(comment.id)}
          >
              <Icon data={TrashBin}/>
          </Button>
      </div>
    );
}