import UserCard from '@/components/shared/UserCard'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateUserForm from '@/components/shared/CreateUserForm'
import { getAllUsers } from '@/actions/user'

const page = async () => {

  const users = await getAllUsers()

  return (
    <div className=' h-screen w-10/12 mx-auto p-11  ' >
      <div className="flex items-center justify-between ">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} >  <UserRoundPlus size={"16"} className='mr-1.5' /> Create User </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
              <DialogDescription>
                create user with name and email
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <CreateUserForm/>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="my-10  ">

        <div className="text-2xl mb-4 font-semibold">
          All Users
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 ">

          {
            users && users?.map((val, idx) => {
              return (
                <div className="" key={idx} >
                  <UserCard val={val} />
                </div>
              )
            })
          }
          
          {
            users?.length === 0 && <div className=""> No Users Found </div>
          }

        </div>
      </div>


    </div>
  )
}

export default page