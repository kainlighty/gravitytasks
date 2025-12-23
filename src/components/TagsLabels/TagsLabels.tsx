import React, { memo } from 'react'
import './TagsLabels.scss'
import TagsLabelsProps from './types'
import { Flex, Label } from "@gravity-ui/uikit";

export const TagsLabels = memo((props: TagsLabelsProps) => {
    const { tags, onCloseClick } = props;

    if (tags.length === 0) return null;

    return (
      <Flex className="tags-list" direction="row" gap={1}>
          {tags.map((tag) => (
            <Label
              key={tag}
              className="tags-list__item"
              theme="unknown"
              type={onCloseClick ? "close" : undefined}
              onCloseClick={() => onCloseClick?.(tag)}
            >
                {tag}
            </Label>
          ))}
      </Flex>
    );
});