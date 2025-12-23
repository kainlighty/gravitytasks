import React, { memo } from 'react'
import type { TagsTooltipProps } from './types'
import { Label, Tooltip } from "@gravity-ui/uikit";
import TagsLabels from "@/components/TagsLabels";
import './TagsTooltip.scss'

export const TagsTooltip = memo((props: TagsTooltipProps) => {
    const { tags, count } = props;
    return (
      <Tooltip
        openDelay={250}
        content={<TagsLabels tags={tags}/>}
      >
          <Label className="task-item__tag-counter" theme="unknown">+{count}</Label>
      </Tooltip>
    );
})