import React from 'react'

import './index.scss'
import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Users from './pages/Users'
import Orders from './pages/Orders'

const App = () => {

  return <>
    <Routes>
      <Route path='/' element={<> <Navbar /> <Outlet /> </>}>
        <Route index element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='users' element={<Users />} />
        <Route path='orders' element={<Orders />} />
      </Route>
    </Routes>
  </>
}

export default App