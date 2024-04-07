import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/> 
        <Route path="/login" element={<RequireAuth><Login/></RequireAuth>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
