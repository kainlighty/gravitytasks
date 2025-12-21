import React, { memo } from 'react'
import { useTaskStore } from "@/store/useTaskStore";
import { ActionTooltip, Button, Icon } from "@gravity-ui/uikit";
import clsx from "clsx";
import { DiamondExclamationFill, SquareCheck, TrashBin, Xmark } from "@gravity-ui/icons";
import EditableSidebarTitle from "@/components/EditableSidebarTitle";
import './SidebarHeader.scss'

export const SidebarHeader = memo(() => {
    const task = useTaskStore(s =>
      s.selectedTaskId ? s.tasks.find(t => t.id === s.selectedTaskId)! : null
    );
    const updateTask = useTaskStore(s => s.updateTask);
    const deleteTask = useTaskStore(s => s.deleteTask);
    const selectTask = useTaskStore(s => s.selectTask);

    if (!task) return null;

    return (
      <header className="task-sidebar__header">
          <div className="task-sidebar__title-row">
              <ActionTooltip title={task.important ? 'Снять приоритет' : 'Сделать приоритетной'}>
                  <Button view="flat" onClick={() => updateTask(task.id, { important: !task.important })}>
                      <Icon
                        className={clsx(
                          "task-sidebar__title-icon",
                          task.important && "task-sidebar__title-icon--important"
                        )}
                        data={DiamondExclamationFill}
                        size={20}
                      />
                  </Button>
              </ActionTooltip>

              <EditableSidebarTitle initialValue={task.name} onSave={(name) => updateTask(task.id, { name })}/>
          </div>

          <div className="task-sidebar__actions">
              {!task.completed && (
                <Button view="flat-success" onClick={() => updateTask(task.id, { completed: true })}>
                    <Icon data={SquareCheck} size={18}/>
                </Button>
              )}
              <Button view="flat-danger" onClick={() => deleteTask(task.id)}>
                  <Icon data={TrashBin} size={18}/>
              </Button>
              <div className="task-sidebar__separator">|</div>
              <Button view="flat-secondary" onClick={() => selectTask(null)}>
                  <Icon data={Xmark} size={20}/>
              </Button>
          </div>
      </header>
    );
})