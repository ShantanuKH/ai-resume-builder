import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Dashboard from './dashboard/index.jsx'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// We are adding route to our application using react=router-dom 
const router = createBrowserRouter([
  
  {
    path:'/',
    element:<App/>,

    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      }

    ]


},
{
  path:'/home',
  element:<Home/>
      },
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },

])


// So that without login user should not be able to move on another page, User will be directed to the sign in page instead
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}/>
    </ClerkProvider>
    
  </React.StrictMode>,
)
