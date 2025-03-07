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
import Market from './pages/common/Market.jsx';
import ForgotPassword from './pages/ForgotPassword';
import Unauthorized from './pages/Unauthorized';

//layouts
import SidebarLayout from './layout/SidebarLayout.jsx';
import Products from './pages/common/Products.jsx';
import ProductDetails from './pages/common/ProductDetails.jsx';

function App() {
  return (

    <Routes>
      <Route index path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/unauthorized' element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles={[1]} />}>
        <Route path='/welcome' element={<Welcome />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[2]} />}>
        {/* <Route element={<SidebarLayout />}> */}
          <Route path='/markets' element={<Market />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='/product-details' element={<ProductDetails />} />
        {/* </Route> */}
      </Route>


      <Route element={<RequireAuth allowedRoles={[3]} />}>
        <Route element={<SidebarLayout />} >
          <Route path='/markets' element={<Market />} />
        </Route>
      </Route>

    </Routes >

  )
}

export default App
