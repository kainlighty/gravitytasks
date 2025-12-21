import React, { useState } from 'react'
import './CommentEditor.scss'
import CommentEditorProps from './types'
import { Button, DropdownMenu, TextArea } from "@gravity-ui/uikit";

// TODO: Потом впилить https://gravity-ui.com/ru/libraries/markdown-editor

export default function CommentEditor(props: CommentEditorProps) {
    const { onSend, onClearAll, hasComments } = props

    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async() => {
        const text = commentText.trim();
        if (!text) return;

        setLoading(true);
        try {
            await onSend(text);
            setCommentText("");
        } finally {
            setLoading(false);
        }
    };

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