import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navigate, Outlet} from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import Header from './components/ui/custom/Header'
import { Toaster } from './components/ui/sonner'

// import Header from './components/custom/Header'

function App() {
  const [count, setCount] = useState(0)

  // To check user is sign up or not
  const {user,isLoaded,isSignedIn}=useUser();


  // This will ensure that the user will stay on signin page unles  they signed up
  if(!isSignedIn && isLoaded)
  {
    return <Navigate to={'/auth/sign-in'} />
  }
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster />
    </>
  )
}

export default App
