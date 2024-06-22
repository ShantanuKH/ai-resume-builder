import React from 'react'

function SummaryP({resumeInfo}) {
  return (
   <p className='text-xs'>
      {resumeInfo?.summery}
   </p>
  )
}

export default SummaryP
