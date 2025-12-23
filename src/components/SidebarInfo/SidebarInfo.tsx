import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTaskStore } from "@/store/useTaskStore";
import { dateTime } from "@gravity-ui/date-utils";
import { DatePicker } from "@gravity-ui/date-components";
import SidebarItem from "@/components/SidebarItem";
import TagManager from "@/components/TagManager";
import DelayedTextArea from "@/components/DelayedTextArea";
import './SidebarInfo.scss'

export const SidebarInfo = memo(() => {
    const selectedTaskId = useTaskStore(s => s.selectedTaskId);
    const task = useTaskStore(s =>
      s.tasks.find(t => t.id === selectedTaskId)
    );
    const updateTask = useTaskStore(s => s.updateTask);

    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setDescription(task.description ?? '');
        }
    }, [selectedTaskId]);

    const handleDescUpdate = useCallback((val: string) => {
          setDescription(val);


          const next = val.trimStart();
          const prev = (description ?? '');

          if (task && next !== prev) {
              updateTask(task.id, { description: next }).catch(console.error);
          }


          console.log(val)
      },
      [task?.description],
    );

    // const deadline = task.deadline ? dateTime({ input: task.deadline, format: 'DD.MM.YYYY' }) : undefined;

    if (!task) return null;

    const deadline = useMemo(() => {
        return task.deadline ? dateTime({ input: task.deadline, format: 'DD.MM.YYYY' }) : undefined
    }, [task.deadline])

    return (
      <div className="task-sidebar__info">
          <SidebarItem label="ID" value={task.id}/>
          <SidebarItem
            className="task-sidebar__item--deadline"
            label="Дедлайн"
            value={
                <DatePicker
                  view="clear"
                  size="s"
                  placeholder="—"
                  value={deadline}
                  onUpdate={(dt) => updateTask(task.id, { deadline: dt?.format('DD.MM.YYYY') ?? null })}
                  hasClear
                />
            }
          />
          <SidebarItem
            label="Теги"
            value={
                <TagManager
                  tags={task.tags ?? []}
                  onUpdate={(tags) => updateTask(task.id, { tags })}
                />
            }
          />
          <SidebarItem label="Обновлено" value={task.updatedAt}/>
          <SidebarItem label="Создано" value={task.createdAt}/>
          <SidebarItem
            className="task-sidebar__item--description"
            label="Описание"
            value={
                <DelayedTextArea
                  delay={400}
                  view="clear"
                  value={description}
                  onUpdate={handleDescUpdate}
                  autoFocus={false}
                  placeholder="—"
                  rows={3}
                  hasClear
                />
            }
          />
      </div>
    );
})