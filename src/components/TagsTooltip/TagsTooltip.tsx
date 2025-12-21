import React, { memo } from 'react'
import './TagsTooltip.scss'
import TagsTooltipProps from './types'
import { Label, Tooltip } from "@gravity-ui/uikit";
import TagsLabels from "@/components/TagsLabels";

export const TagsTooltip = memo((props: TagsTooltipProps) => {
    const { tags, count } = props;
    return (
      <Tooltip content={<TagsLabels tags={tags}/>}>
          <Label className="task-item__tag-counter" theme="unknown">+{count}</Label>
      </Tooltip>
    );
})