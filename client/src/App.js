import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Error, UserLogin, UserSignup, AdminLogin, AdminSignup, PropertyDetails, AdminProperties, EditProperty } from './pages'
import Globe from './pages/GlobeLocations'
import PaymentSuccessful from './components/Success'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-signup' element={<AdminSignup />} />
        <Route path='/globe' element={<Globe />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/properties' element={<AdminProperties />} />
        <Route path='/editProperty/:id' element={<EditProperty />} />
        <Route path='/success' element={<PaymentSuccessful />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App