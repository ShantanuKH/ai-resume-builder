import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {


  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);

  // This is use to get the user resume list
  useEffect (()=>{
    user&&GetResumeList()
  },[user])
  // We want to acces the info only when the users data is available or changed 

  const GetResumeList=()=>{
    GlobalApi.GetUsersResume(user?.primaryEmailAddress?.emailAddress).then(resp=>{
      // console.log(resp.data);
      
      setResumeList(resp.data.data);
    })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Create your perfect resume effortlessly with AI Resume Builder, featuring smart customization, An intuitive user interface to help you land your next job role.</p>

      {/* We want to show in grid style and so we use this */}
      <div className='grid 
      grid-cols-2 
      md:cols-3 
      lg:grid-cols-5
      gap-5
      mt-12'>
        <AddResume/>
        {/* "resumeList.length>0&&resumeList" this e added as it needs some time to load and so we compare that if resume list is not equal to resumelist and lenght more than 0  */}
        {resumeList.length>0&&resumeList.map((resume,index)=>(

          <ResumeCardItem resume={resume} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
