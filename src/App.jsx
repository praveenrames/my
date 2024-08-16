import './App.css'
import { Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import PublicRoutes  from './Components/PublicRoutes.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import EditProfile from './Components/EditProfile.jsx';

function App() {
  return (
    <>
      <Routes>
         {/* public routes */}
         <Route element={<PublicRoutes />}>
         <Route path='/' element={<LandingPage />} />
         <Route path='/signup' element={<SignupPage />} />
         <Route path='/login' element={<LoginPage />} />
         </Route>

         {/* Protected routes */}
         <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/:id' element={<Dashboard />} />
          <Route path='/profile' element={<EditProfile />} />
         </Route>
      </Routes>
    </>
  )
}

export default App;
