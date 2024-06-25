import { getTodoById } from "@/actions/todo";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(params);
  try {
    const res = await getTodoById({
      id,
    });
    console.log(res);
    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}
