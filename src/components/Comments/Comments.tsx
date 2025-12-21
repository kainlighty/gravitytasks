import React, { memo, useCallback } from 'react';
import type { TaskComment } from '@/types/Task';
import { useToaster } from '@gravity-ui/uikit';
import CommentsList from '@/components/Comments/CommentsList';
import CommentEditor from '@/components/Comments/CommentEditor';
import { useTaskStore } from '@/store/useTaskStore';
import './Comments.scss';
import CommentsProps from "@/components/Comments/types";

const EMPTY_COMMENTS: TaskComment[] = [];

export const Comments = (props: CommentsProps) => {
    const { taskId } = props

    const toaster = useToaster();

    const comments = useTaskStore(
      useCallback(
        (s) => s.tasks.find((t) => t.id === taskId)?.comments ?? EMPTY_COMMENTS,
        [taskId],
      ),
    );

    const addComment = useTaskStore((s) => s.addComment);
    const deleteComment = useTaskStore((s) => s.deleteComment);
    const deleteAllComments = useTaskStore((s) => s.deleteAllComments);

    const handleSend = useCallback(
      async (text: string) => {
          try {
              await addComment(taskId, text);
          } catch (e) {
              console.error('Ошибка при добавлении:', e);
              toaster.add({name: 'comment-add-error', title: 'Ошибка при добавлении', theme: 'danger'});
              throw e;
          }
      },
      [addComment, taskId, toaster],
    );

    const handleDeleteComment = useCallback(
      async (commentId: string) => {
          try {
              await deleteComment(taskId, commentId);
          } catch (e) {
              toaster.add({
                  name: 'comment-delete-error',
                  title: 'Ошибка при удалении комментария',
                  theme: 'danger',
              });
          }
      },
      [deleteComment, taskId, toaster],
    );

    const handleClearAll = useCallback(
      async () => {
          if (!window.confirm('Удалить все комментарии?')) return;
          try {
              await deleteAllComments(taskId);
              toaster.add({name: 'comment-delete-success', title: 'Все комментарии удалены', theme: 'success'});
          } catch (e) {
              console.error('Ошибка при очистке:', e);
          }
      },
      [deleteAllComments, taskId, toaster],
    );

    return (
      <div className="task-sidebar__comments comments">
          <CommentsList comments={comments} onDelete={handleDeleteComment} />
          <CommentEditor onSend={handleSend} onClearAll={handleClearAll} hasComments={comments.length > 0} />
      </div>
    );
}

export default memo(Comments);