import { Routes, Route } from 'react-router-dom';
import { isUserLoggedIn } from './app/AuthSlice';
import { useSelector } from 'react-redux';
import RequireAuth from './hooks/RequireAuth.jsx';

// pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Welcome from './pages/Welcome';
import ForgotPassword from './pages/ForgotPassword';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (

    <Routes>
      <Route index path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/unauthorized' element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
        <Route path='/welcome' element={<Welcome />} />
      </Route>

    </Routes >

  )
}

export default App