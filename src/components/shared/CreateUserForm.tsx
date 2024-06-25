"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from '@/actions/user'
// import { toast } from '../ui/use-toast'
import { DialogClose } from '@radix-ui/react-dialog'
import { LoaderIcon } from 'lucide-react'
import { useToast } from '../ui/use-toast'


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(
        {
            message: "Enter corrent Email "
        }
    ),
})

const CreateUserForm = () => {

    const { toast } = useToast()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true)
        try {
            const res = await createUser(values)
            form.reset({
                name: "",
                email: ""
            })
            if (res) {
                toast({
                    title: "User Created ",
                })
            } else {
                toast({
                    title: "Something went wrong! ",
                    variant: "destructive",
                    duration : 3000
                })

            }


        } catch (error) {
            toast({
                title: "Something went wrong! ",
                variant: "destructive"
            })
        }
        setLoading(false)

    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your Name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="xyz@mail.com" type='email'  {...field} />
                                </FormControl>
                                <FormDescription>
                                    Email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <div className="flex items-center justify-between">
                        <DialogClose asChild >
                            <Button disabled={loading} variant={"outline"} > Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading} > {loading && <LoaderIcon size="16" className='mr-2 animate-spin' />}Submit</Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default CreateUserForm