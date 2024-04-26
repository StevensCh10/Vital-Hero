import HomeBloodcenter from './pages/bloodcenter/HomeBloodcenter/HomeBloodcenter'
import ForgotPassword from './pages/donor/ForgotPassword/ForgotPassword'
import ChangePassword from './pages/donor/ChangePassword/ChangePassword'
import DonationFormType from './pages/donor/DonationForm/DonationForm'
import DonationSteps from './pages/donor/DonationSteps/DonationSteps'
import Bloodcenters from './pages/donor/Bloodcenters/Bloodcenters'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import ScreeningType from './pages/donor/Screening/Screening'
import HomeDoctor from './pages/doctor/HomeDoctor/HomeDoctor'
import AnalyzeTheRole from './pages/AnalyzeTheRole'
import Donations from './pages/donor/Donations/Donations'
import HomeDonor from './pages/donor/HomeDonor/HomeDonor'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Footer from './components/Footer/Footer'
import Profile from './pages/donor/Profile/Profile'
import Review from './pages/Review/Review'
import Login from './pages/Login/Login'
import './App.css'
import Schedules from './pages/bloodcenter/Schedules/Schedules'

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
          <Route path='/schedules' element={<RequireAuth><Schedules/></RequireAuth>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
