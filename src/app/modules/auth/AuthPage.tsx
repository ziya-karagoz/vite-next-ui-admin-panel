import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Registration from './registration/Registration'
import ForgotPassword from './forgot-password/ForgotPassword'
import ResendVerification from './resend-verification/ResendVerification'
import ResetPassword from './reset-password/ResetPassword'




const AuthPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='resend-verification' element={<ResendVerification />} />
      <Route path='reset-password/:token' element={<ResetPassword />} />
      <Route path='*' element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
