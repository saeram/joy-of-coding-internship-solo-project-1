'use client';
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Modal from "../Modals/Modal";


interface Props {
  title: string;
  tasks: any[];
}
const Tasks = ({ title, tasks }: Props) => {
  const { openModal, modal } = useGlobalState();

  return (
  <div className="relative p-4 size-full bg-slate-100 text-slate-700 rounded-xl overflow-y-auto">
    {modal && <Modal content={<CreateContent />} />}
    <h1 className="text-2xl font-bold m-2 pb-3">{title}</h1>
    <div className="tasks grid">
      {tasks.map((task) => (
       <TaskItem key={task.id}
       title={task.title}
       description={task.description}
       date={task.date}
       isCompleted={task.isCompleted}
       isImportant={task.isImportant}
       id={task.id}
       />
      ))}
      <Button className="flex items-center justify-center h-[15rem] border-dashed border-slate-600 border-2 rounded-xl hover:border-slate-400 hover:text-slate-400" onClick={openModal}>
        <PlusIcon />
        Add New Task
              </Button>
    </div>
    </div>
  );
};

export default Tasks;
