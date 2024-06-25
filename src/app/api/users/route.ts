
import { getAllUsers, createUser  } from "@/actions/user";


export async function GET(request: Request) {

  try {
    const res = await getAllUsers();
    return Response.json(res, {
        status : 200
    });
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}


export async function POST(request: Request) {
  const req = (await request.json()) as {
    name: string;
    email: string;
  };

  const { name, email } = req;

  try {
    const res = await createUser({
      name,
      email,
    });
    return Response.json(res, {
        status : 201
    } );
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}
