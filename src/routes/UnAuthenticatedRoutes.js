import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Authentication/Login';
function UnAuthenticatedRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
    </Routes>
  )
}

export default UnAuthenticatedRoutes