import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


function EditResume() {


    // This will return the parameter
    // By doing so we will get the dynamic id of the resume
    const params = useParams();

    useEffect(()=>{
         console.log(params.resumeId)
    },[])
    // We want only once to execute uesEffect when this component is called/get load and so we use []
  return (
    <div>
      EditResume
    </div>
  )
}

export default EditResume
