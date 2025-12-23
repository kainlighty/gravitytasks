import React from 'react'
import type { TaskCardProps } from './types';
import clsx from "clsx";
import './TaskCard.scss'

export const TaskCard = (props: TaskCardProps) => {
    const {
        className,
        children,
    } = props

    return (
      <div className={clsx("task-card", className)}>
          {children}
      </div>
    );
}