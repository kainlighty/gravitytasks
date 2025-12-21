import React, { memo, useRef, useState } from 'react'
import TagManagerProps from './types'
import { Button, Flex, Icon, Popup, TextInput } from "@gravity-ui/uikit";
import { Plus } from "@gravity-ui/icons";
import TagsLabels from "@/components/TagsLabels";
import './TagManager.scss'

export const TagManager = memo((props: TagManagerProps) => {
    const { tags, onUpdate } = props;
    const [popupOpen, setPopupOpen] = useState(false);
    const [newTag, setNewTag] = useState('');
    const btnRef = useRef<HTMLButtonElement>(null);

    const addTag = () => {
        const val = newTag.trim();
        if (val && !tags.includes(val)) onUpdate([...tags, val]);
        setNewTag('');
        setPopupOpen(false);
    };

    return (
      <div className="tag-manager">
          <TagsLabels tags={tags} onCloseClick={(tag) => onUpdate(tags.filter(t => t !== tag))}/>
          <Button
            ref={btnRef}
            view="flat-secondary"
            size="xs"
            onClick={() => setPopupOpen(true)}
            className="tag-manager__add-btn"
          >
              <Icon data={Plus} size={14}/>
          </Button>
          <Popup
            anchorElement={btnRef.current}
            open={popupOpen}
            onOpenChange={setPopupOpen}
          >
              <Flex
                direction="column"
                gap={2}
                style={{ padding: 8, minWidth: 200 }}
              >
                  <TextInput
                    value={newTag}
                    onUpdate={setNewTag}
                    placeholder="Введите название тега"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            addTag()
                        }
                        if (e.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                  />
                  <Button onClick={addTag}>Добавить</Button>
              </Flex>
          </Popup>
      </div>
    );
});