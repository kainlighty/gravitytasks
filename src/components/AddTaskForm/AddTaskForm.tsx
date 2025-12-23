import React from 'react'
import AddTaskFormProps from './types'
import { configure, DFDialog } from '@gravity-ui/dialog-fields';
// @ts-expect-error: Так надо
import { DFDialogProps } from "@gravity-ui/dialog-fields/types/src/dialog/Dialog/Dialog";
import { Task } from "@/types/Task";
import './AddTaskForm.scss'

configure({
    lang: 'ru'
})

export type FormValues = Pick<
  Task,
  "name" | "deadline" | "important" | "tags" | "description"
>;

const fields: DFDialogProps['fields'] = [
    {
        name: 'name',
        type: 'text',
        caption: 'Название',
        initialValue: '',
        required: true
    },
    {
        name: 'deadline',
        type: 'text',
        caption: 'Дедлайн',
        initialValue: ''
    },
    {
        name: 'tags',
        type: 'multi-text',
        caption: 'Теги',
        initialValue: []
    },
    {
        name: 'important',
        type: 'checkbox',
        initialValue: false,
        extras: {
            content: 'Приоритетная задача',
        }
    },
    {
        name: 'description',
        type: 'textarea',
        caption: 'Описание',
        initialValue: ''
    },
]

export default function AddTaskForm(props: AddTaskFormProps) {
    const {
        isOpen = false,
        onAdd,
        onClose
    } = props

    const stopEnterSubmit = React.useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        const t = e.target as HTMLElement;

        if (t instanceof HTMLTextAreaElement) return;
        if (t instanceof HTMLButtonElement) return;

        e.preventDefault();
    }, []);

    return (
      <div onKeyDown={stopEnterSubmit}>
          <DFDialog<FormValues>
            visible={isOpen}
            headerProps={{
                title: 'Новая задача',
            }}
            modal={true}
            // @ts-expect-error: потом
            onAdd={(form) => {
                const values = form.getState().values
                const normalizedTags = values.tags?.map((t: any) => t.name) ?? []

                return onAdd({
                    ...values,
                    tags: normalizedTags,
                })
            }}
            onClose={onClose}
            fields={fields}
            size="l"
          />
      </div>
    );
}