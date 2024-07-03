'use client';
import { Button } from '@/components/ui/button';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from '@/app/context/globalProvider';
import styled from 'styled-components';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
  }

const TaskItem = ({ title, description, date, isCompleted, id }: Props) => {

    const { theme, deleteTask, updateTask } = useGlobalState();

  return (

    <TaskItemStyled theme={theme}>
        <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted?  <Button className="completed" onClick={() => {
          const task = {
            id,
            isCompleted: !isCompleted,
          };
          updateTask(task);
        }}>Completed</Button> : <Button className="incomplete" onClick={() => {
          const task = {
            id,
            isCompleted: !isCompleted,
          };
          updateTask(task);
        }}>Incomplete</Button>}
       <Button className="edit"><Pencil1Icon /></Button>
       <Button className="delete" onClick={() => {
        deleteTask(id)
       }}><TrashIcon /></Button>

      </div>
      </TaskItemStyled>
  )
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem
