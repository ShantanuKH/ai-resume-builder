import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoX } from '@/context/ResumeInfoX';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIchatSession } from './../../../../../service/AIMODEL';

const prompt = "Job Title: {jobTitle}, Depends on Job title give me summary for my resume within 4-5 lines in Json format with field experience level and summary with Experience level for freshers, mid level and experience";

function Summary({ enabledNext }) {
    const [value, setValue] = useState('');
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoX);
    const [loading, setLoading] = useState(false);
    const [summery, setSummery] = useState('');
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState(null);

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        });
    }, [summery]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        try {
            const result = await AIchatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            const resp = JSON.parse(responseText);

            if (resp && resp.experience_levels) {
                setAiGeneratedSummeryList(resp.experience_levels);
            } else {
                toast.error("AI response did not contain valid experience levels");
            }
        } catch (error) {
            console.error("Error generating summary from AI:", error);
            toast.error("Failed to generate summary from AI");
        } finally {
            setLoading(false);
        }
    };

    const handleSummarySelection = (experienceLevel) => {
        setSummery(aiGeneratedSummeryList[experienceLevel].summary);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summery: summery
            }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated!");
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Create a compelling summary for your resume to catch employers' attention instantly.</p>

                <form onSubmit={onSave}>
                    <div className='flex justify-between items-center mt-2'>
                        <label className='text-sm'>Add Summary</label>
                        <Button variant="ghost" className="border-primary text-primary flex gap-2" size="sm" type="button" onClick={GenerateSummeryFromAI}>
                            {loading ? <LoaderCircle className='animate-spin' /> : <Brain className='h-5 w-4' />}Generate with AI
                        </Button>
                    </div>

                    <div className='mt-5'>
                        <Textarea value={summery} onChange={(e) => setSummery(e.target.value)} required />
                    </div>
                    <div className='mt-10 flex justify-end'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>

                {/* Suggestions based on AI generated summaries */}
                {aiGeneratedSummeryList && (
                    <div className='mt-5'>
                        <h2 className='font-bold text-lg'>Suggestions</h2>
                        {Object.entries(aiGeneratedSummeryList).map(([level, details]) => (
                            <div key={level} className='my-2'>
                                <h3 className='font-bold'>{level.charAt(0).toUpperCase() + level.slice(1)} Level</h3>
                                <p>{details.summary}</p>
                                <Button variant="outline" size="sm" onClick={() => handleSummarySelection(level)}>
                                    Use this summary
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Summary;
