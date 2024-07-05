'use client';

import { Pencil1Icon, StarFilledIcon, StarIcon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from '@/app/context/globalProvider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
  }

const TaskItem = ({ title, description, date, isCompleted, isImportant, id }: Props) => {

    const { deleteTask, toggleTask } = useGlobalState();
 
  return (

    <div className="bg-[#beccc5] rounded-xl shadow-lg p-5 flex flex-col gap-5 min-h-[15rem] max-h-[20rem] overflow-y-auto hover:bg-[#c7d6cf]">
        <h1 className="font-bold text-slate-600 text-xl">{title}</h1>
      <p>{description}</p>
      <p className="mt-5">{formatDate(date)}</p>
      <div className="flex items-center gap-3">
        {isCompleted?  (
          <Button size="lg" className='bg-slate-50 rounded-xl hover:bg-slate-300'
          onClick={() => {
          const task = {
            id,
            isCompleted: !isCompleted,
          };
          toggleTask(task);
        }}
        >Completed
        </Button>
         ) : (
         <Button 
         size="lg" className='bg-[#e09a6c] rounded-xl hover:bg-slate-300 text-slate-50'
          onClick={() => {
          const task = {
            id,
            isCompleted: !isCompleted,
          };
          toggleTask(task);
        }}
        >
          In Progress
          </Button>
          )}
       <Link href={`/${id}`}><Button><Pencil1Icon className='hover:text-slate-50'/></Button></Link>
       <Button onClick={() => {
        deleteTask(id)
       }}><TrashIcon className='hover:text-slate-50'/></Button>
       <Button onClick={() => {
        const task = {
          id,
          isImportant: !isImportant,
        };
        toggleTask(task);
       }}>{isImportant? <StarFilledIcon className="text-slate-50" /> : <StarIcon className='hover:text-slate-50'/>}</Button>

      </div>
      </div>
  )
}

export default TaskItem
