import React, { useState } from 'react'
import PersonalDetail from './Froms/PersonalDetail'
import { ArrowLeft, ArrowRight, LayoutGridIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summary from './Froms/Summary';

function FormSection() {

  // For the clicked next button we have to maintain the index
  // Initially the activeformindex will be 1
  const [activeFormIndex, setActiveFormIndex] = useState(2);

  const [enableNext,setEnableNext] = useState(false)


  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className=" flex gap-2"><LayoutGridIcon />Theme</Button>
        <div className='flex gap-2 items-center '>

          {/* This is the condition that when the index is 2 or say when the user will go to the next page then only they will be able to see the back button */}
          {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}><ArrowLeft /></Button>}

          {/* Next Button */}
          <Button 
          disabled={!enableNext}
          className="flex    justify-between" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >Next<ArrowRight /></Button>

        </div>
      </div>
      {/* When active index 1 then user will be on personal detail page and if on index 2 then on summary and so on */}
      {activeFormIndex==1?<PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==2?<Summary enabledNext={(v)=>setEnableNext(v)}/>:null}
      {/* 
      experience
      educatinla detail
      skills  */}
         </div>
  )
}

export default FormSection
