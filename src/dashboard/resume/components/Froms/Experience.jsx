import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { DeleteIcon } from 'lucide-react';
import { ResumeInfoX } from '@/context/ResumeInfoX';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
};

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);


    // Now to display it in the preview section 
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoX);

    
    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const addNewExperience = () => {
        setExperienceList([...experienceList, {...formField}]);
    };

    const removeExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    };
    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);

    }

    // Whenever the input is changed we diaplay it on preview section
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo, experience: experienceList
        })
    }, [experienceList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>+ Add your experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border rounded-lg p-3 my-5'>
                                {/* Title */}
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" value={item.title} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* Company name */}
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" value={item.companyName} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* City */}
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" value={item.city} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* State */}
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" value={item.state} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* Start date */}
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date" name="startDate" value={item.startDate} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date" name="endDate" value={item.endDate} onChange={(event) => handleChange(index, event)} />
                                </div>

                                {/* Work Summary */}
                                <div className='col-span-2'>
                                    <RichTextEditor 
                                    index={index}onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-10 flex justify-between'>
                    <div className='flex items-center gap-1'>
                        <Button variant="outline" className="text-primary" onClick={addNewExperience}>
                            + Add More Experience
                        </Button>
                        <Button variant="ghost" className="text-primary" onClick={removeExperience}>
                            <DeleteIcon />
                        </Button>
                    </div>

                    <Button>Save</Button>
                </div>
            </div>
        </div>
    );
}

export default Experience;
