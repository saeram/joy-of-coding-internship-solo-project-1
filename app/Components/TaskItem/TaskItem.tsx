'use client';
import { Button } from '@/components/ui/button';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react'

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
  }

const TaskItem = ({ title, description, date, isCompleted, id }: Props) => {
  return (
    <div>
        <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{date}</p>
      <div className="task-footer">
        {isCompleted?  <Button className="completed">Completed</Button> : <Button className="incomplete">Incomplete</Button>}
       <Button className="edit"><Pencil1Icon /></Button>
       <Button className="delete"><TrashIcon /></Button>

      </div>
    </div>
  )
}

export default TaskItem
