import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './Users'
import UpdateUser from './UpdateUser'
import CreateUsers from './CreateUsers'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Users />}> </Route>
      <Route path='/updateuser/:id' element={<UpdateUser />}></Route>
      <Route path='/createuser' element={<CreateUsers />}></Route>
        
     
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
