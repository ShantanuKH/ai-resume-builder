import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoX } from '@/context/ResumeInfoX'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIchatSession } from './../../../../../service/AIMODEL'




const prompt = "Job Title: {jobTitle}, Depends on Job title give me summary for my resume within 4-5 lines in Json format with field experience level and summary with Experience level for freshers, mid level and experience"

function Summary({ enabledNext }) {
    // So that whatever we write will update in resume

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoX)
    const [loading, setLoading] = useState(false);

    const [summery, setSummery] = useState();
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])


    // To generate chat from google api
    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIchatSession.sendMessage(PROMPT)
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummeryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true);

        // data saved to database
        const data = {
            data: {
                summery: summery
            }
        }

        // To send data to database
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated !")


        }, (error) => {
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
                        <Button variant="ghost" className="border-primary text-primary flex gap-2" size="sm" type="button" onClick={GenerateSummeryFromAI}>
                            {loading ? <LoaderCircle className='animate-spin' /> : <Brain className='h-5 w-4' />}Generate with AI
                        </Button>
                    </div>

                    <div className='mt-5' required>
                        <Textarea onChange={(e) => setSummery(e.target.value)} />
                    </div>
                    <div className='mt-10 flex justify-end'>
                        <Button type='submit'
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>


            </div>


            {/* These are the suggestions that will only be available when ai generates the summary */}
            {/* { aiGeneratedSummeryList&& <div>

                <h2 className='font-bold text-lg'>Suggestions</h2>

                {aiGeneratedSummeryList.map((items,index)=>(
                    <div>
                        <h2 className='font-bold my-1'>Level: {items.experienceLevel}</h2>
                        <p>{items.summery}</p>
                        </div>
                ))}

            </div>} */}


        </div>
    )
}

export default Summary
