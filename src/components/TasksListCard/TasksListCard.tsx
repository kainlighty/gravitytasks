import React, { memo, useCallback, useMemo } from 'react'
import type { TasksListCardProps } from './types'
import { List } from "@gravity-ui/uikit";
import type { Task } from "@/types/Task";
import { useTaskStore } from "@/store/useTaskStore";
import TaskItem from "@/components/TaskItem";
import TaskCard from "@/components/TaskCard";
import TasksListHeader from "@/TasksListHeader";
import './TasksListCard.scss'

export const TasksListCard = memo((props: TasksListCardProps) => {
    const { onOpenAddForm } = props;

    const tasks = useTaskStore(s => s.tasks);
    const selectedTaskId = useTaskStore(s => s.selectedTaskId);
    const selectTask = useTaskStore(s => s.selectTask);

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
      <TaskCard className="tasks-list">
          <TasksListHeader onOpenAddForm={onOpenAddForm}/>
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
      </TaskCard>
    );
})