"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import axios from "axios";
import { useGlobalState } from "@/app/context/globalProvider";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";

const CreateContent = ({ task }: { task?: Task }) => {
  const router = useRouter();

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(
    task ? String(task.description) : ""
  );
  const [date, setDate] = useState(task ? task.date : "");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { allTasks, closeModal } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      allTasks();
      closeModal();
      toast.success("Task created successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const handleEdit = (id: string) => async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.put(`/api/tasks/${id}`, task);
      closeModal;
      allTasks();
      router.push("/");
      toast.success("Task updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <CreateContentStyled
        onSubmit={task ? handleEdit(task.id) : handleSubmit}>
        <h1>{task ? "Update the task" : "Create a Task"}</h1>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange("title")}
            placeholder="title.."
          />
        </div>
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={handleChange("description")}
            name="description"
            id="description"
            rows={4}
            placeholder="description.."></textarea>
        </div>
        <div className="input-control">
          <label htmlFor="date">Date</label>
          <input
            value={date}
            onChange={handleChange("date")}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="completed">Toggle Completed</label>
          <input
            value={completed.toString()}
            onChange={handleChange("completed")}
            type="checkbox"
            name="completed"
            id="completed"
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="important">Toggle Important</label>
          <input
            value={important.toString()}
            onChange={handleChange("important")}
            type="checkbox"
            name="important"
            id="important"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="text-slate-50 bg-[#e09a6c] p-6 rounded-xl hover:bg-slate-400">
            {task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </CreateContentStyled>
    </>
  );
};
const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: #f8fafc;

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: #0a0a0a;
      color: #dee3e2;
      border-radius: 0.5rem;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
