import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
  

function AddResume() {

    // We took dialogbox from the shadcn 
    // We want that when we click on the component the the dialog shoud be open and so we just set here the opening of dialog box to false initially and we made this true on Onclick method
    const [openDialog, setOpenDialog]=useState(false)
    const [resumeTitle,setResumeTitle]=useState();
    // We can get user information using the below code (When user will login)
    const{user}= useUser();

    // As it will need time to send data to the database so,
    const [loading,setLoading] = useState(false);

    const onCreate=()=>{
        // To create unique id for each resume we used uuid library
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
            }
        }

        GlobalApi.CreateNewResume(data).then(resp=>{console.log(resp);
            if(resp){
                setLoading(false);
            }
        }, (error)=>{
            setLoading(false);
        }
        )
    }


  return (
    <div>
      <div className='
      p-14 
      py-24 
      border 
      items-center 
      flex 
      justify-center 
      bg-secondary
      rounded-lg
      h-[280px]
      hover:scale-105
      transition-all
      hover:shadow-lg
      cursor-pointer 
      border-dashed
      '
      onClick={()=>
      setOpenDialog(true)}>
        {/* This is from lucide react..this is installed as we add shadcn */}
        <PlusSquare />
      </div>

            <Dialog open={openDialog}>
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <p>Enter the name for your new resume</p>
            <DialogDescription>
                <Input className="mt-1 mb-2" placeholder="Ex. Mobile App Developer"

                // This will save whatever we type in the input 
                onChange={(e)=>setResumeTitle(e.target.value)}/>
            </DialogDescription>

                <div className='flex justify-end gap-3'>
                    {/* The ghost will remove the background of the button */}
                    <Button onClick={()=>setOpenDialog(false)}  variant="ghost">Cancel</Button>
                    <Button 
                    // This will disable untill and unless there is no title in the input box
                    disabled={!resumeTitle || loading }
                    
                    // This will call onCreaate method when we click on Create button
                    onClick={()=>onCreate()}>
                        {loading?
                        <Loader2 className='animate-spin'/>:'Create'}
                        </Button>
                </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume
