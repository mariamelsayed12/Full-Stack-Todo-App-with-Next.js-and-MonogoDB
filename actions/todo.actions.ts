'use server'
import { ITodos } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient()

export const getUserTodoListAction = async ({userId}:{userId:string |null}) => {
    const todos = await prisma.todo.findMany({
        where:{
            user_id:userId as string
        },
        orderBy:{
        createdAt:"desc"
    }})
    return todos
}

export const createTodoListAction = async ({title ,body,completed,userId}:{title:string,body?:string |undefined,completed:boolean,userId:string|null}) => {
    await prisma.todo.create(
        {data:
            {
                title,
                body,
                completed,
                user_id:userId as string
            }
            
        }
    )
    // to update data after create
    revalidatePath('/')
    
}

export const updateTodoListAction = async ({title,body,completed,id }:ITodos) => {
    await prisma.todo.updateMany({
        where:{
            id,
        },
        data:{
            title,
            body,
            completed,
            
        }
    })
    revalidatePath('/')
}

export const deleteTodoListAction = async ({id}:{id:string}) => {
    await prisma.todo.delete({
        where:{
            id,
        }
    }
    )
    // For Update data after delete
    revalidatePath('/')
}
