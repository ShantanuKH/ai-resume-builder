// Here now after installing axios we will create axios client 

import { data } from "autoprefixer";
import axios from "axios";


const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})



const CreateNewResume=(data)=>axiosClient.post('/users-resumes', data)
const GetUsersResume=(userEmail)=>axiosClient.get('/users-resumes?filters[userEmail][$eq]='+userEmail);
// "?filters[userEmail][$eql]='+userEmail" is very important that this will only show the data of the user who has signed in...This will take reference of the email id to know which user has signed in 


// To update the existing record

const UpdateResumeDetail=(id,data)=>axiosClient.put('/users-resumes/'+id,data)


export default{
    CreateNewResume,
    GetUsersResume,
    UpdateResumeDetail
}