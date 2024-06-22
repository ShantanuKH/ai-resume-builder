import React from 'react'

function SkillsP({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}>
                Skills
            </h2>

            <hr className='border-[1.5px] my-3 '
                style={{
                    borderColor: resumeInfo?.themeColor
                }} />
            <div>

                <div className='grid grid-cols-2 gap-2 my-2 '>
            {resumeInfo?.skills.map((skills,index)=>(
                <div key={index} className='flex items-center justify-between'>
                    <h2 className='text-xs'>{skills?.name}</h2>
                    <div className='h-2 bg-gray-200 w-[120px]'>

                        {/* We are taking the inout in as apercent and then we are displaying bar as a width so that it should presnt like its a progress bar */}
                            <div className='h-2'
                            style={{backgroundColor:resumeInfo?.themeColor,
                            width:skills?.rating+'%'}}>
                                 
                                </div>
                    </div>


               </div>

               
            ))}
            </div>
            </div>
        </div>
    )
}

export default SkillsP
