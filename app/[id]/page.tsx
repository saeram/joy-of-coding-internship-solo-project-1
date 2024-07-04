
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import axios from "axios";
import { useGlobalState } from "@/app/context/globalProvider";
import prisma from "../utils/db";
import EditContent from "../Components/Modals/EditContent";
import { notFound } from "next/navigation";
import Modal from "../Components/Modals/Modal";

interface Props {
    params: { id: string }
}

const EditContentPage = async ({ params }: Props) => {
    const task = await prisma.task.findUnique({
        where: { id: params.id }
    });
    if (!task)
        notFound();
    return (
        <>
        <Modal content={<EditContent task={task}/>}/>

        </>
        )
    }

    export default EditContentPage;
