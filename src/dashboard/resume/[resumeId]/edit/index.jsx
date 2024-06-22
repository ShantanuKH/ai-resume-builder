import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumeSection from '../../components/ResumeSection';
import dummy from '@/data/dummy';
import { ResumeInfoX } from '@/context/ResumeInfoX';


function EditResume() {


    // This will return the parameter
    // By doing so we will get the dynamic id of the resume
    const params = useParams();

    // By adding this the data will be accessble inside the form as well as resume section 
    const [resumeInfo,setResumeInfo]=useState();

    useEffect(()=>{
         setResumeInfo(dummy);
    },[])
    // We want only once to execute uesEffect when this component is called/get load and so we use []
  return (

    // What ever we write in the form section we have to send it to the ResumeSection and that is the reason we are wrapping in Provider
        <ResumeInfoX.Provider value={{resumeInfo,setResumeInfo}}>

        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
          {/* Two Sections, One for form and the other for displaying resume */}
          <FormSection/>

          <ResumeSection/>
        </div>
    </ResumeInfoX.Provider>
  )
}

export default EditResume
