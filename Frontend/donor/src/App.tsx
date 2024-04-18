import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Bloodcenters from './pages/Bloodcenters/Bloodcenters'
import Donations from './pages/Donations/Donations'
import Profile from './pages/Profile/Profile'
import DonationFormType from './pages/DonationForm/DonationForm'
import ScreeningType from './pages/Screening/Screening'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import './App.css'
import Footer from './components/Footer/Footer'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import DonationSteps from './pages/DonationSteps/DonationSteps'
import Review from './pages/Review/Review'

const App = () => {

  return (
    <div className='container'>
      <div className='app'>
        <Routes>
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
          <Route path="/login" element={<RequireAuth><Login/></RequireAuth>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/donation-form' element={<RequireAuth><DonationFormType/></RequireAuth>}/>
          <Route path='/screening' element={<RequireAuth><ScreeningType/></RequireAuth>}/>
          <Route path='/bloodcenters' element={<RequireAuth><Bloodcenters/></RequireAuth>}/>
          <Route path='/donations' element={<RequireAuth><Donations/></RequireAuth>}/>
          <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path='/change-password' element={<RequireAuth><ChangePassword/></RequireAuth>}/>
          <Route path='/donation-steps' element={<RequireAuth><DonationSteps/></RequireAuth>}/>
          <Route path='/review' element={<RequireAuth><Review/></RequireAuth>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
