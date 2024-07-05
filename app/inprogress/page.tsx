'use client';
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

const page = () => {
  const { incompleteTasks } = useGlobalState();
  return (
    <Tasks title="In Progress" tasks={incompleteTasks} />
  )
}

export default page