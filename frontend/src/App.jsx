import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './page/home/HomePage'
import LoginPage from './page/auth/login/LoginPage'
import SignUpPage from './page/auth/signup/SignUpPage'
import NotificationPage from './page/notification/NotificationPage'
import ProfilePage from './page/profile/ProfilePage'

import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {

  const { data:authUser, isLoading, error, isError } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later (bax tsta3malha mn ba3d f profile odakxi lakhor )
    queryKey: ["authUser"],
    queryFn: async () => {
      try{
        const res = await fetch('api/auth/me');
        const data = await res.json(); 

        if(data.error) return null ;
        if(!res.ok) throw new Error(data.error || "Something went wrong");

        console.log("authUser is here: ", data)
        return data;
      }
      catch(error) {
        throw new Error(error);
      }
    },
    retry: false 
  })

  if(isLoading) {
    return (
      <div className="flex justify-center items-center h-screen  ">
        <LoadingSpinner size='lg' />
      </div>
    )
  }


  return (
		<div className='flex max-w-6xl mx-auto'>
      {/* Common component, because is not wrapped with Routes */}
      { authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to={"/login"} /> }/>
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to={"/"} />}/>
        <Route path='/signup' element={ !authUser ?  <SignUpPage /> : <Navigate to={"/"} />}/>
        <Route path='/notifications' element={ authUser ? <NotificationPage /> : <Navigate to={"/login"} />}/>
        <Route path='/profile/:username' element={ authUser ? <ProfilePage /> : <Navigate to={"/login"} />}/>
      </Routes>
      { authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
