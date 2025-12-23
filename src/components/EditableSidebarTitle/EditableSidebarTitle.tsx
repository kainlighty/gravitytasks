import React, { memo, useEffect, useState } from 'react'
import EditableSidebarTitleProps from './types'
import './EditableSidebarTitle.scss'
import { DelayedTextInput } from "@gravity-ui/components";

export const EditableSidebarTitle = memo((props: EditableSidebarTitleProps) => {
    const { initialValue, onSave } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSave = () => {
        const trimmed = value.trim();
        if (trimmed && trimmed !== initialValue) {
            onSave(trimmed);
        }
        setIsEdit(false);
    }

    const handleReset = () => {
        setValue(initialValue)
        setIsEdit(false);
    }

    const handlePressKey = (key: string) => {
        if(key === 'Enter') {
            handleSave()
        }

        if(key === 'Escape') {
            handleReset()
        }
    }

    if (isEdit) {
        return (
          <div className="task-sidebar__title-edit">
              <DelayedTextInput
                delay={150}
                value={value}
                onUpdate={setValue}
                onBlur={handleSave}
                onKeyDown={e => handlePressKey(e.key)}
                autoFocus
              />
          </div>
        );
    }

    return (
      <span className="task-sidebar__title-text"
            onDoubleClick={() => setIsEdit(true)}
      >
            {initialValue}
        </span>
    );
})