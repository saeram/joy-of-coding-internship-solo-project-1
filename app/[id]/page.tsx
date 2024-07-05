import React from "react";

import prisma from "../utils/db";
import { notFound } from "next/navigation";
import Modal from "../Components/Modals/Modal";
import CreateContent from "../Components/Modals/CreateContent";

interface Props {
  params: { id: string };
}

const EditContentPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });
  if (!task) notFound();
  return <Modal content={<CreateContent task={task} />} />;
};

export default EditContentPage;
