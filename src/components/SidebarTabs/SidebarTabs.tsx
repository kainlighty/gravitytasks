import React, { useState } from 'react'
import './SidebarTabs.scss'
import SidebarTabsProps from './types'
import { Tab, TabList, TabPanel, TabProvider } from "@gravity-ui/uikit";
import Comments from "@/components/Comments";

export const SidebarTabs = (props: SidebarTabsProps) => {
    const {taskId} = props

    const [activeTab, setActiveTab] = useState('comments');

    return (
      <div className="task-sidebar__tabs">
          <TabProvider value={activeTab} onUpdate={setActiveTab}>
              <TabList className="task-sidebar__tab-list">
                  <Tab value="comments">Комментарии</Tab>
                  <Tab value="history" disabled>История</Tab>
              </TabList>
              <TabPanel className="task-sidebar__tab-panel" value="comments">
                  <Comments taskId={taskId}/>
              </TabPanel>
              <TabPanel className="task-sidebar__tab-panel" value="history">
                  История изменений
              </TabPanel>
          </TabProvider>
      </div>
    );
}