import SchedulingAndDonation from './pages/donor/schedulingAndDonation/SchedulingAndDonation'
import HomeBloodcenter from './pages/bloodcenter/HomeBloodcenter/HomeBloodcenter'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ChangePassword from './pages/donor/ChangePassword/ChangePassword'
import DonationFormType from './pages/donor/DonationForm/DonationForm'
import Bloodcenters from './pages/donor/Bloodcenters/Bloodcenters'
import Schedules from './pages/bloodcenter/Schedules/Schedules'
import ScreeningType from './pages/donor/Screening/Screening'
import HomeDoctor from './pages/doctor/HomeDoctor/HomeDoctor'
import Screenings from './pages/doctor/Screenings/Screenings'
import HomeDonor from './pages/donor/HomeDonor/HomeDonor'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import Profile from './pages/Profile/Profile'
import AnalyzeTheRole from './pages/AnalyzeTheRole'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Footer from './components/Footer/Footer'
import Review from './pages/Review/Review'
import Login from './pages/Login/Login'
import ValidateScreening from './pages/doctor/ValidateScreening/ValidateScreening'
import Feedback from './pages/Feedback/Feedback'
import RedefinePassword from './pages/redefinePassword/RedefinePassword'
import RegisterDoctor from './pages/RegisterDoctor/RegisterDoctor'


const App = () => {

  return (
    <div className="flex justify-center items-center m-0">
      <div className="lg:w-[80vw] md:w-[90vw] w-full flex flex-col">
        <Routes>
          <Route path="/" element={<RequireAuth><AnalyzeTheRole/></RequireAuth>}/>
          <Route path="/login" element={<RequireAuth><Login/></RequireAuth>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register-doctor' element={<RegisterDoctor/>}/>
          <Route path="/home-donor" element={<RequireAuth><HomeDonor/></RequireAuth>}/>
          <Route path="/home-doctor" element={<RequireAuth><HomeDoctor/></RequireAuth>}/>
          <Route path="/home-bloodcenter" element={<RequireAuth><HomeBloodcenter/></RequireAuth>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/donation-form' element={<RequireAuth><DonationFormType/></RequireAuth>}/>
          <Route path='/screening' element={<RequireAuth><ScreeningType/></RequireAuth>}/>
          <Route path='/bloodcenters' element={<RequireAuth><Bloodcenters/></RequireAuth>}/>
          <Route path='/scheduling-donation' element={<RequireAuth><SchedulingAndDonation/></RequireAuth>}/>
          <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path='/change-password' element={<RequireAuth><ChangePassword/></RequireAuth>}/>
          <Route path='/review' element={<RequireAuth><Review/></RequireAuth>}/>
          <Route path='/schedules' element={<RequireAuth><Schedules/></RequireAuth>}/>
          <Route path='/screenings' element={<RequireAuth><Screenings/></RequireAuth>}/>
          <Route path='/screenings/validate-screening' element={<RequireAuth><ValidateScreening/></RequireAuth>}/>
          <Route path='/feedback' element={<RequireAuth><Feedback/></RequireAuth>}/>
          <Route path='/forgot-password' element={<RequireAuth><ForgotPassword/></RequireAuth>}/>
          <Route path='/redefine-password' element={<RedefinePassword/>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
