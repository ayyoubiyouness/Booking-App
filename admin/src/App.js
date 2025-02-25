import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'

import Single from './pages/single/Single'
import New from './pages/new/New'

import Login from './pages/login/Login'
import { userInputs, productInputs, roomInputs } from './formSource'
import { AuthContext } from './context/AuthContext'
import { hotelColumns, roomColumns, userColumns } from './datatablesource'
import NewHotel from './componenents/newHotel/NewHotel'
import NewRoom from './componenents/newRoom/NewRoom'
const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user)
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  console.log(userColumns)
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='users'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path=':userId' element={<ProtectedRoute>
                <Single />
              </ProtectedRoute>} />
              <Route path='new' element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>}
              />

            </Route>
            <Route path='hotels'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>
              } />
              <Route path=':hotelId' element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route  path='new' element={
                <ProtectedRoute>
                  <NewHotel  />
                </ProtectedRoute>
              } />

            </Route>

            <Route path='room'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              } />
              <Route path=':roomId' element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route  path='new' element={
                <ProtectedRoute>
                  <NewRoom  />
                </ProtectedRoute>
              } />

            </Route>

            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

