import React, { memo, useCallback, useEffect, useState } from 'react'
import type { EditableSidebarTitleProps } from './types'
import { DelayedTextInput } from "@gravity-ui/components";
import './EditableSidebarTitle.scss'

export const EditableSidebarTitle = memo((props: EditableSidebarTitleProps) => {
    const { initialValue, onSave } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSave = useCallback(() => {
        const trimmed = value.trim();
        if (trimmed && trimmed !== initialValue) {
            onSave(trimmed);
        }
        setIsEdit(false);
    }, [value, setIsEdit, initialValue]);

    const handleReset = useCallback(() => {
        setValue(initialValue)
        setIsEdit(false);
    }, [initialValue, setIsEdit]);

    if (isEdit) {
        return (
          <div className="task-sidebar__title-edit">
              <DelayedTextInput
                delay={150}
                value={value}
                onUpdate={setValue}
                onBlur={handleSave}
                onKeyDown={e => {
                    const key = e.key

                    if (key === 'Enter') {
                        handleSave()
                    }

                    if (key === 'Escape') {
                        handleReset()
                    }
                }}
                autoFocus
              />
          </div>
        );
    }

    return (
      <span
        className="task-sidebar__title-text"
        onDoubleClick={() => setIsEdit(true)}
      >
            {initialValue}
        </span>
    );
})