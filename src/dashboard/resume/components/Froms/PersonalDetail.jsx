import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoX } from '@/context/ResumeInfoX'

import React, { useContext } from 'react'

function PersonalDetail() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoX)


    /* On input Change the name and the value will be targeted (as we are taking it from the user) and resumeInfo will be get updated with the latest user info keeping the previous info same using 
    " 
    const {name,value}=e.target;
    setResumeInfo({
        ...resumeInfo,
        [name]:value
    })

    ...resumeInfo -> This will keep the previous info same

    [name]:value -> This will replace old value with the latest value
    "
   */ 
    const handleInputChange = (e) => {
        
        const {name,value}=e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave = (e) => {
        e.preventDefault();
    };
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p >Let's start with some basic details</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    {/* First Name */}
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name='firstName' required onChange={handleInputChange} />
                    </div>


                    {/* Last Name */}
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name='lastName' required onChange={handleInputChange} />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name='phone' required onChange={handleInputChange} />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name='email' required onChange={handleInputChange} />
                    </div>


                    {/* Job Title */}
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name='jobTitle' required onChange={handleInputChange} />
                    </div>

                    {/* Address */}
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name='address' required onChange={handleInputChange} />
                    </div>



                </div>

                <div className='mt-10 flex justify-end'>
                    <Button type='submit'>Save</Button>
                </div>
            </form>


        </div>
    )
}

export default PersonalDetail
