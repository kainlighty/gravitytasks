import React, { memo } from 'react'
import { useTaskStore } from "@/store/useTaskStore";
import SidebarHeader from "@/components/SidebarHeader";
import SidebarInfo from "@/components/SidebarInfo";
import './TaskSidebarCard.scss'
import SidebarTabs from "@/components/SidebarTabs";
import TaskCard from "@/components/TaskCard";

export const TaskSidebarCard = memo(() => {
    const selectedTaskId = useTaskStore(s => s.selectedTaskId);
    const task = useTaskStore(s =>
      s.selectedTaskId ? s.tasks.find(t => t.id === selectedTaskId) ?? null : null
    );

    if (!task) return null;

    return (
      <TaskCard className="task-sidebar">
          <SidebarHeader/>

          <main className="task-sidebar__content">
              <SidebarInfo/>
              <SidebarTabs taskId={task.id}/>
          </main>
      </TaskCard>
    );
})