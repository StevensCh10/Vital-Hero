import HomeBloodcenter from './pages/HomeBloodcenter/HomeBloodcenter'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import DonationFormType from './pages/DonationForm/DonationForm'
import DonationSteps from './pages/DonationSteps/DonationSteps'
import Bloodcenters from './pages/Bloodcenters/Bloodcenters'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import ScreeningType from './pages/Screening/Screening'
import HomeDoctor from './pages/HomeDoctor/HomeDoctor'
import AnalyzeTheRole from './pages/AnalyzeTheRole'
import Donations from './pages/Donations/Donations'
import HomeDonor from './pages/HomeDonor/HomeDonor'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile/Profile'
import Review from './pages/Review/Review'
import Login from './pages/Login/Login'
import './App.css'

const App = () => {

  return (
    <div className='container'>
      <div className='app'>
        <Routes>
          <Route path="/" element={<RequireAuth><AnalyzeTheRole/></RequireAuth>}/>
          <Route path="/login" element={<RequireAuth><Login/></RequireAuth>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/home-donor" element={<RequireAuth><HomeDonor/></RequireAuth>}/>
          <Route path="/home-doctor" element={<RequireAuth><HomeDoctor/></RequireAuth>}/>
          <Route path="/home-bloodcenter" element={<RequireAuth><HomeBloodcenter/></RequireAuth>}/>
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
