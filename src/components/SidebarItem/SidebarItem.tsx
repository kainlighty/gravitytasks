import React, { memo } from 'react'
import type { SidebarItemProps } from './types'
import clsx from "clsx";
import './SidebarItem.scss'

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { className, label, labelClassName, value = '–', valueClassName } = props;
    return (
      <div className={clsx("task-sidebar__item", className)}>
          <span className={clsx("task-sidebar__item-label", labelClassName)}>{label}</span>
          <span className={clsx("task-sidebar__item-value", valueClassName)}>{value}</span>
      </div>
    );
})