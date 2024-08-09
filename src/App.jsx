import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Users/>}></Route>
      <Route path='/create' element={<CreateUser/>}></Route>
      <Route path='/update/:userId' element={<UpdateUser/>}></Route>
    </Routes>
    
    </BrowserRouter>
  
  )
}

export default App
