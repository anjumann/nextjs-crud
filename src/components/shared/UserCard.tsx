"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Trash2Icon } from "lucide-react"
import { createTodoItem, deleteTodoItem, updateToDoItem } from "@/actions/todo"
import { useToast } from "../ui/use-toast"
import { deleteUser } from "@/actions/user"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function UserCard(
  {
    val
  }: {
    val: {
      id: string;
      name: string;
      email: string;
      todos: {
        id: string;
        title: string;
        description: string | null;
        isCompleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
      }[]
    }
  }
) {

  const { id, email, name, todos } = val
  const { toast } = useToast()
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTask = async () => {
    setLoading(true)

    try {
      if (newTask.trim() !== "") {
        const data = {
          title: newTask,
          userId: id
        }
        const todo = await createTodoItem(data)
        if (todo) {
          toast({
            title: "Todo added"
          })
        }
        setNewTask("")
      }

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleToggleTask = async (id: string, isCompleted: boolean) => {
    setLoading(true)
    try {
      await updateToDoItem({
        isCompleted: !isCompleted,
        id: id
      })
    } catch (error) {
      console.log("error")
    }
    setLoading(false)

  }
  const handleDeleteTask = async (id: string) => {
    setLoading(true)
    try {
      const todo = await deleteTodoItem({
        id: id
      })

      if (todo) {
        toast({
          title: "Todo deleted"
        })
      } else {
        toast({
          title: "Something went wrong!!",
          variant: "destructive"
        })

      }

    } catch (error) {
      console.log("error")
    }
    setLoading(false)

  }

  const handleDeleteUser = async (id: string) => {

    setLoading(true)
    try {
      const todo = await deleteUser(id)

      if (todo) {
        toast({
          title: "Todo deleted"
        })
      } else {
        toast({
          title: "Something went wrong!!",
          variant: "destructive"
        })

      }

    } catch (error) {
      console.log("error")
    }
    setLoading(false)
  }


  return (
    <div className="">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-2 ">
          <h1 className="text-2xl font-bold mb-4"> {name} </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} size="icon" > <Trash2 size={"16"} /> </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> Are you sure ? </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete user {name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <DialogClose asChild >
                  <Button variant={"destructive"} onClick={() => handleDeleteUser(id)} > Delete </Button>
                </DialogClose>
                <DialogClose asChild >
                  <Button variant={"outline"} > Cancel </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 mr-2 rounded-md border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          />
          <Button onClick={handleAddTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {todos.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between rounded-md px-4 py-2 transition-colors ${task.isCompleted
                  ? "bg-muted text-muted-foreground line-through"
                  : "bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.isCompleted}
                  className="mr-2"
                  onCheckedChange={() => handleToggleTask(task.id, task.isCompleted)}
                />
                <label htmlFor={`task-${task.id}`} className="text-sm font-medium">
                  {task.title}
                </label>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTask(task.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
