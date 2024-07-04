'use client';

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import axios from "axios";
export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()


export const GlobalProvider = ({ children }) => {

  const [selectedTheme, setselectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  
  const [tasks, setTasks] = useState([])

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);
    toast.success("Task deleted");
    allTasks();
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong");
  }
};

const toggleTask = async (task) => {
  try {
    const res = await axios.put(`/api/tasks`, task);
    toast.success("Task updated");
    allTasks();
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    
  }

}

const updateTask = async (id) => {
  try {
    const res = await axios.put(`/api/tasks/${id}`);
    toast.success("Task updated");
    allTasks();
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    
  }

}
const completedTasks = tasks.filter((task) => task.isCompleted === true);
const importantTasks = tasks.filter((task) => task.isImportant === true);
const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    allTasks();
  }, []);

    return (
        <GlobalContext.Provider
         value={{
          theme,
          tasks,
          deleteTask,
          isLoading,
          completedTasks,
          importantTasks,
          incompleteTasks,
          toggleTask,
          modal,
          openModal,
          closeModal,
          allTasks,
          updateTask,
         }}>
        <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)