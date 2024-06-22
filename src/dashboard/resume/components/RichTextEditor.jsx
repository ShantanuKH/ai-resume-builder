import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import React, { useState } from 'react';
import { BtnBold, BtnItalic, BtnLink, BtnNumberedList, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';

function RichTextEditor({ onRichTextEditorChange }) {
    const [value, setValue] = useState('');

    return (
        <div>
            <div className='flex justify-between items-end my-4 mx-2'>
                <label className='text-xs'>
                    Summary
                </label>
                <Button variant="outline" size="sm" className="flex gap-2 border-primary text-primary"><Brain className='h-4 w-5 '/> Generate with AI</Button>
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
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
