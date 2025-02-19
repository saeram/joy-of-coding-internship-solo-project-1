import prisma from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const { userId } = auth();
        if(!userId){
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        
        }
        
        const { title, description, date, completed, important } = await req.json();
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
          const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,

            },
          });

          console.log("Task Created: ", task)
          return NextResponse.json(task);
    } catch (error) {
        console.log('ERROR CREATING TASK:', error);
        return NextResponse.json({ error: "Error creating task", status: 500})
    }
}


export async function GET(req: Request){
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            }
        });
        return NextResponse.json(tasks);

    } catch (error) {
        console.log('ERROR GETTING TASK:', error);
        return NextResponse.json({ error: "Error getting task", status: 500})
    }
}

export async function PUT(req: Request) {

try {
    const { userId } = auth();
    const { isCompleted, isImportant, id } = await req.json();
    
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
    const task = await prisma.task.update({
        where: {
            id,
        },
        data: {
            isCompleted,
            isImportant,
        },
    });
    return NextResponse.json(task);
    } catch (error) {
        console.log('ERROR UPDATING TASK:', error);
        return NextResponse.json({ error: "Error updating task", status: 500})
    }
}