"use server";

import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createUser = async (data: { name: string; email: string }) => {
  try {
    const res = await client.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    console.log("user created ", res.id);
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(
      `Error creating user \n name: ${data.name} email: ${data.email}`
    );
    console.log(error);
  }
};

export const updateUser = async () => {
  // TODO
  // Create a Function to update user
  return {
    msg: "user updated",
  };
};

export const getAllUsers = async () => {
  try {
    const res = await client.user.findMany({
      select: {
        todos: true,
        email: true,
        id: true,
        name: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
