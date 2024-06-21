import React from 'react'
import AddResume from './components/AddResume'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Create your perfect resume effortlessly with AI Resume Builder, featuring smart customization, An intuitive user interface to help you land your next job role.</p>

      {/* We want to show in grid style and so we use this */}
      <div className='grid 
      grid-cols-2 
      md:cols-3 
      lg:grid-cols-5
      mt-12'>
        <AddResume/>
      </div>
    </div>
  )
}

export default Dashboard
