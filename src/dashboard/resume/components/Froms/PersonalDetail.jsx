import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoX } from '@/context/ResumeInfoX'
import { LoaderCircle } from 'lucide-react'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi';

import { toast } from "sonner"


function PersonalDetail({enabledNext}) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoX)



    const params=useParams();


    useEffect(()=>{
        console.log(params)
    },[])

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

    const [formData,setFormData] =useState();
    const [loading,setLoading] =useState(false);
    


    const handleInputChange = (e) => {
        enabledNext(false)
        const {name,value}=e.target;
        // Only the field available in the form field will be saved to the database
        setFormData({
            ...formData,
            [name]:value
        })
        
       
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true);

        // data saved to database
        const data={
            data:formData
        }

        // To send data to database
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
                console.log(resp);
                enabledNext(true);
                setLoading(false);
                toast("Details updated !")

                
        },(error)=>{
            setLoading(false);
        }
        )
        
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
                        <Input name='firstName'
                        defaultValue=
                        {resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>


                    {/* Last Name */}
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name='lastName' defaultValue=
                        {resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name='phone' defaultValue=
                        {resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name='email' defaultValue=
                        {resumeInfo?.email} required onChange={handleInputChange} />
                    </div>


                    {/* Job Title */}
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name='jobTitle' defaultValue=
                        {resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>

                    {/* Address */}
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name='address' defaultValue=
                        {resumeInfo?.address} required onChange={handleInputChange} />
                    </div>



                </div>

                <div className='mt-10 flex justify-end'>
                    <Button type='submit'
                    disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                        </Button>
                </div>
            </form>


        </div>
    )
}

export default PersonalDetail
