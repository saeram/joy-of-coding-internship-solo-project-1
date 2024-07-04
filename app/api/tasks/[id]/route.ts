import prisma from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
    { params }: { params: { id: string } }
){
    try {
        
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
        const task = await prisma.task.delete({
            where: {
                id,
            }
        })

        return NextResponse.json(task);

    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 })
    }
}
export async function PUT(req: Request,
    { params }: { params: { id: string }}
) {

    try {
        const { title, description, date, completed, important } = await req.json();
        const { userId } = auth();
        const { id } = params;


        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
            }
            if (!title || !description || !date) {
            return NextResponse.json({
              error: "Missing required fields",
              status: 400,
            });
          }
          if (title.length < 2) {
            return NextResponse.json({
              error: "Title must be at least 2 character long",
              status: 400,
            });
          }
          const task = await prisma.task.update({
            where: {
                id
            },
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,

            },
          })
        
        return NextResponse.json(task);
    } catch (error) {
        console.log('ERROR UPDATING TASK:', error);
        return NextResponse.json({ error: "Error updating task", status: 500})
    }
    }