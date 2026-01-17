import React, { useCallback, useState } from 'react'
import type { CommentEditorProps } from './types'
import { Button, DropdownMenu, TextArea } from "@gravity-ui/uikit";
import './CommentEditor.scss'

// TODO: Потом впилить https://gravity-ui.com/ru/libraries/markdown-editor

export default function CommentEditor(props: CommentEditorProps) {
    const { onSend, onClearAll, hasComments } = props

    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = useCallback(async() => {
        const text = commentText.trim();
        if (!text) return;

        setLoading(true);
        try {
            await onSend(text);
            setCommentText("");
        } finally {
            setLoading(false);
        }
    }, [commentText, setLoading]);

    return (
      <div className="comments__editor">
          <TextArea
            className="comments__input"
            value={commentText}
            rows={5}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Введите текст комментария"
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="comments__actions">
              <Button
                view="action"
                width="max"
                onClick={handleSend}
                disabled={!commentText || loading}
                loading={loading}
              >
                  Отправить
              </Button>
              <DropdownMenu
                items={[
                    {
                        action: onClearAll,
                        text: 'Удалить все',
                        theme: 'danger',
                        disabled: !hasComments
                    },
                ]}
              />
          </div>
      </div>
    );
}