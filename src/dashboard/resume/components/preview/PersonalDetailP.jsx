import React from 'react'

function PersonalDetailP({ resumeInfo }) {
    return (
        <div>
            <h2 className='font-bold text-xl text-center'
                style={{
                    color: resumeInfo?.themeColor
                }}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>

            <h2 className='font-medium text-sm text-center'>{resumeInfo?.jobTitle}</h2>

            <h2 className='font-normal text-xs text-center' style={{
                color: resumeInfo?.themeColor
            }}>{resumeInfo?.address}</h2>


            <div className='text-right'> 
                <h2 className='font-normal text-xs'>{resumeInfo?.phone}</h2>
                <h2 className='font-normal text-xs mt-1'>{resumeInfo?.email}</h2>
            </div>
            <hr className='border-[1.5px] my-3 '
             style={{
                borderColor: resumeInfo?.themeColor
            }}/>
        </div>




    )
}

export default PersonalDetailP
