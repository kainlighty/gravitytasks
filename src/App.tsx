import { useEffect, useState } from "react";
import { settings } from '@gravity-ui/date-utils';
import { useTaskStore } from "@/store/useTaskStore";
import AddTaskForm from "@/components/AddTaskForm";
import TasksListCard from "@/components/TasksListCard";
import TaskSidebarCard from "@/components/TaskSidebarCard";

settings.loadLocale('ru').then(() => {
    settings.setLocale('ru');
});

export const App = () => {
    const fetchTasks = useTaskStore(s => s.fetchTasks);
    const addTask = useTaskStore(s => s.addTask);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchTasks()
        .then(t => console.log('tasks fetched'))
        .catch(console.error);
    }, [fetchTasks]);

    return (
      <>
          <div className="wrapper">
              <TasksListCard onOpenAddForm={() => setIsFormOpen(true)}/>
              <TaskSidebarCard/>
          </div>

          <AddTaskForm
            isOpen={isFormOpen}
            onAdd={addTask}
            onClose={() => setIsFormOpen(false)}
          />
      </>
    );
};

export default App;