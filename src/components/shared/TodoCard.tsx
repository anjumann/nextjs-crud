import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"


const TodoCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle> taskname </CardTitle>
            </CardHeader>
            <CardContent>
                <p> description </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between " >
                <Button variant="outline" >
                    Edit
                </Button>
                <Button variant="destructive" >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TodoCard