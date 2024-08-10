import { Route, Routes } from 'react-router-dom'

import HomePage from './page/home/HomePage'
import LoginPage from './page/auth/login/LoginPage'
import SignUpPage from './page/auth/signup/SignUpPage'
import NotificationPage from './page/notification/NotificationPage'
import ProfilePage from './page/profile/ProfilePage'

import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'

function App() {

  
  return (
		<div className='flex max-w-6xl mx-auto'>
      {/* Common component, because is not wrapped with Routes */}
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/notifications' element={<NotificationPage />}/>
        <Route path='/profile/:username' element={<ProfilePage />}/>
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App
