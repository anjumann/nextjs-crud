"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2Icon } from "lucide-react"

export default function Component() {

  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish project proposal", completed: false },
    { id: 2, text: "Schedule meeting with client", completed: false },
    { id: 3, text: "Buy groceries", completed: true },
  ])


  const [newTask, setNewTask] = useState("")


  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const handleToggleTask = (id : number ) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id : number ) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
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
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between rounded-md px-4 py-2 transition-colors ${
                task.completed
                  ? "bg-muted text-muted-foreground line-through"
                  : "bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  className="mr-2"
                  onCheckedChange={() => handleToggleTask(task.id)}
                />
                <label htmlFor={`task-${task.id}`} className="text-sm font-medium">
                  {task.text}
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
