import React from 'react'
import './TasksListHeader.scss'
import type { TasksListHeaderProps } from './types'
import { ActionTooltip, Button, Icon, Text } from "@gravity-ui/uikit";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { useTaskStore } from "@/store/useTaskStore";

export default function TasksListHeader(props: TasksListHeaderProps) {
    const { onOpenAddForm } = props;

    const clearAll = useTaskStore(s => s.deleteAllTasks);

    return (
      <header className="tasks-list__header">
          <Text variant="subheader-3">Список задач</Text>
          <div className="tasks-list__actions">
              <Button
                view="flat"
                onClick={onOpenAddForm}
              >
                  <Icon data={Plus}/> Добавить
              </Button>
              <ActionTooltip
                title="Удалить все"
              >
                  <Button
                    view="outlined-danger"
                    onClick={clearAll}
                  >
                      <Icon data={TrashBin}/>
                  </Button>
              </ActionTooltip>
          </div>
      </header>
    );
}