import { ResumeInfoX } from '@/context/ResumeInfoX';
import React, { useContext } from 'react'
import PersonalDetailP from './preview/PersonalDetailP';
import SummaryP from './preview/SummaryP';
import ProffesionalExperienceP from './preview/ProffesionalExperienceP';
import EducationP from './preview/EducationP';
import SkillsP from './preview/SkillsP';

function ResumeSection() {

        const {resumeInfo,setResumeInfo}=useContext(ResumeInfoX);


  return (
    <div className='shadow-lg h-full pt-12 pb-10 pl-6 pr-6 border-t-[10px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}>
      <PersonalDetailP resumeInfo={resumeInfo}/>
      <SummaryP resumeInfo={resumeInfo}/>
      <ProffesionalExperienceP resumeInfo={resumeInfo}/>
      <EducationP resumeInfo={resumeInfo}/>
      <SkillsP resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumeSection
