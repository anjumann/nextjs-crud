import { createTodoItem, deleteTodoItem, getAllTodos, updateToDoItem } from "@/actions/todo";

export async function GET() {
  try {
    const res = await getAllTodos();

    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}

export async function POST(request: Request) {
  const req = (await request.json()) as {
    title: string;
    userId: string;
  };

  const { title, userId } = req;

  try {
    const res = await createTodoItem({
      title,
      userId,
    });

    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}

export async function DELETE(request: Request) {
  const req = (await request.json()) as {
    userId: string;
  };

  const { userId } = req;

  try {
    const res = await deleteTodoItem({
      id: userId,
    });

    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}

export async function PUT(request: Request) {
  const req = (await request.json()) as {
    id: string;
    isCompleted?: boolean;
    title?: string;
    description?: string;
  };

  const { id, isCompleted, description, title } = req;

  try {
    const res = await updateToDoItem({
      id: id,
      isCompleted,
      title,
      description,
    });

    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}
