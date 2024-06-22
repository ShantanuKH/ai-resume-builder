import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    // <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
    // This will return resume randomId

    // the b elow will return the id in the strapi whixh will be more easy to use
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div  className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-lg shadow-primary '>
                <Notebook/>
        </div>
        <h2 className='text-center my-1 text-lg font-semibold'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
