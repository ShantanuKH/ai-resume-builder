import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoX } from '@/context/ResumeInfoX'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function Summary({enabledNext}) {
    // So that whatever we write will update in resume

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoX)
    const[loading,setLoading]=useState(false);

    const [summery,setSummery]=useState();
    const params=useParams();

    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    })

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true);

        // data saved to database
        const data={
            data:{
                summery:summery
            }
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

   <div> 
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p >Create a compelling summary for your resume to catch employers' attention instantly.</p>

            <form onSubmit={onSave}>
                <div className='flex justify-between items-center mt-2'>
                <label className=' text-sm  ' >Add Summary</label>
                <Button variant="ghost" className="border-primary text-primary" size="sm">Generate with AI</Button>
                </div>

                <div className='mt-5' required>
                <Textarea onChange={(e)=>setSummery(e.target.value)} />
                </div>
                <div className='mt-10 flex justify-end'>
                    <Button type='submit'
                    disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                        </Button>
                </div>
            </form>

    
        </div>
        </div> )
}

export default Summary
