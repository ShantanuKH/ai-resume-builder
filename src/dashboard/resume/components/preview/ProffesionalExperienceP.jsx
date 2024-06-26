import React from 'react'

function ProffesionalExperienceP({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'

        /*  We used this as we want ot give dynamic colors
          style={{
                color:resumeInfo?.themeColor
            }}
       */

        style={{
          color: resumeInfo?.themeColor
        }}>
        Proffesional Experience
      </h2>
      
      <hr className='border-[1.5px] my-3 '
        style={{
          borderColor: resumeInfo?.themeColor
        }} />

      {/* To show the proffesional experience */}

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-semibold'style={{color:resumeInfo?.themeColor}}>{experience?.title}</h2>

          <h2 className='text-xs flex justify-between'>{experience?.companyName},
            {experience?.city},
            {experience?.state}
            <span>{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
          </h2>
          {/* <p className='text-xs my-2'>{experience?.workSummary}</p> */}

          {/* To show rich text on the page*/}
          <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience.workSummery}}/>
        </div>
      ))}
    </div>

  )
}

export default ProffesionalExperienceP
