import { Button } from '@/components/ui/button';
import { ResumeInfoX } from '@/context/ResumeInfoX';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIchatSession } from './../../../../service/AIMODEL';
import { toast } from 'sonner';


const PROMPT = 'position title: {positionTitle}, Depend on position title give me 6-8 bullet points for my resume, give me result in HTML format'
function RichTextEditor({ onRichTextEditorChange,index }) {
    const [value, setValue] = useState('');

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoX)
     
    const[loading,setLoading]=useState(false);
    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        if(!resumeInfo.experience[index].title){
            toast('Please add position title');
            return;
        }
        // To generate message from AI and put in rich
        const prompt=PROMPT.replace("{positionTitle}",resumeInfo.experience[index].title) ;
        const result = await AIchatSession.sendMessage(prompt);
        console.log(result.response.text());
        const resp=result.response.text()
        setValue(resp.replace('{"position_title": "Flutter Developer", "bullet_points": [','').replace(']',''));

        setLoading(false);

    }

    return (
        <div>
            <div className='flex justify-between items-end my-4 mx-2'>
                <label className='text-xs'>
                    Summary
                </label>
                <Button variant="outline" size="sm" className="flex gap-2 border-primary text-primary"
                onClick={GenerateSummeryFromAI}>{loading?
                <LoaderCircle className='animate-spin'/>:'Generate with AI'}<><Brain className='h-4 w-5 '/> </> </Button>
            </div>
            <EditorProvider>
                <Editor 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e); // Call the callback with the updated value
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <Separator />
                        <BtnNumberedList />
                        <Separator />
                        <BtnBulletList/>
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
