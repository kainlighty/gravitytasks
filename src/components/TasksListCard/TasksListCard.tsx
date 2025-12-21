import React, { memo, useCallback, useMemo } from 'react'
import TasksListCardProps from './types'
import { ActionTooltip, Button, Icon, List, Text } from "@gravity-ui/uikit";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { Task } from "@/types/Task";
import { useTaskStore } from "@/store/useTaskStore";
import TaskItem from "@/components/TaskItem";
import './TasksListCard.scss'

export const TasksListCard = memo((props: TasksListCardProps) => {
    const { onOpenAddForm } = props;

    const tasks = useTaskStore(s => s.tasks);
    const selectedTaskId = useTaskStore(s => s.selectedTaskId);
    const selectTask = useTaskStore(s => s.selectTask);
    const clearAll = useTaskStore(s => s.deleteAllTasks);

    const selectedItemIndex = useMemo(() => {
        if (!selectedTaskId) return undefined;
        return tasks.findIndex(t => t.id === selectedTaskId);
    }, [tasks, selectedTaskId]);

    const handleItemClick = useCallback((task: Task) => {
        selectTask(task.id);
    }, [selectTask]);

    const renderItem = useCallback((task: Task) => (
      <TaskItem task={task}/>
    ), []);

    return (
      <div className="task-card tasks-list">
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
                    title="Очистить всё"
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
          <List
            className="tasks-list__items"
            itemsHeight={300}
            itemHeight={36}
            items={tasks}
            virtualized
            selectedItemIndex={selectedItemIndex}
            onItemClick={handleItemClick}
            filterPlaceholder="Найти задачу"
            renderItem={renderItem}
          />
      </div>
    );
})