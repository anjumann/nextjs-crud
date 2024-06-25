"use server"
import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTodoItem = async (data: {
  title: string;
  description?: string;
  userId: string;
}) => {
  const { title, userId, description } = data;

  try {
    const res = await client.toDo.create({
      data: {
        title,
        description,
        userId,
      },
    });
    console.log("todo created. ", res);
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const updateToDoItem = async (data: {
    title?: string;
    description?: string;
    id: string;
    isCompleted?: boolean;
  }) => {
    const { title, description, id, isCompleted } = data;
  
    try {
      const res = await client.toDo.update({
        where: { id: id },
        data: {
          isCompleted,
          title,
          description,
        },
      });
      revalidatePath('/')
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  
export const deleteTodoItem = async (data: { id: string }) => {
    const { id } = data;
  
    try {
      const deletedToDo = await client.toDo.delete({
        where: { id: id },
      });
      revalidatePath('/')
  
      return deletedToDo;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getTodoById = async (data: { id: string }) => {
    try {
      const toDo = await client.toDo.findUnique({
        where: { id: data.id },
      });
      return toDo;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getTodosByUserId = async (data: { userId: string }) => {
    try {
      const toDos = await client.toDo.findMany({
        where: { userId: data.userId },
      });
      return toDos;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getAllTodos = async () => {
    try {
      const toDos = await client.toDo.findMany();
      return toDos;
    } catch (error) {
      console.log(error);
    }
  };