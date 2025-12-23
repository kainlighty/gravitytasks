import React, { memo } from 'react'
import type { TaskItemProps } from './types'
import { useTaskStore } from "@/store/useTaskStore";
import { Button, Checkbox, Icon, Label, Text } from "@gravity-ui/uikit";
import { DiamondExclamationFill, TrashBin } from "@gravity-ui/icons";
import TagsTooltip from "@/components/TagsTooltip";
import './TaskItem.scss'

export const TaskItem = memo((props: TaskItemProps) => {
    const { task } = props;
    const { id, completed, important, name, deadline, tags = [] } = task;

    const updateTask = useTaskStore(s => s.updateTask);
    const deleteTask = useTaskStore(s => s.deleteTask);

    const checkboxName = `task${id}Complete`

    return (
      <div className="task-item">
          <Checkbox
            className="task-item__checkbox"
            name={checkboxName}
            size="l"
            checked={completed}
            onUpdate={(val) => updateTask(id, { completed: val })}
          />
          <div className="task-item__content">
              {important && (
                <Icon className="task-item__icon task-item__icon--important" data={DiamondExclamationFill}/>
              )}
              <Text className="task-item__info" variant="body-2">
                  <span className="task-item__title">{name}</span>
                  {deadline && <span className="task-item__deadline">{deadline}</span>}
              </Text>
          </div>
          {tags.length > 0 && (
            <div className="task-item__tags">
                <Label theme="clear" size="s">{tags[0]}</Label>
                {tags.length > 1 && <TagsTooltip tags={tags} count={tags.length - 1}/>}
            </div>
          )}
          <Button
            className="task-item__delete-btn"
            view="flat-secondary"
            size="s"
            onClick={(e) => {
                e.stopPropagation();
                deleteTask(id);
            }}
          >
              <Icon data={TrashBin}/>
          </Button>
      </div>
    );
})