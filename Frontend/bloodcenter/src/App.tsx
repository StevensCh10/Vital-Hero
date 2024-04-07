import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import Home from './pages/Home/Home'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/> 
        <Route path="/login" element={<RequireAuth><Login/></RequireAuth>}/>
      </Routes>
    </>
  )
}

export default App
