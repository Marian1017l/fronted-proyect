import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import VerifyCodePhone from './components/Auth/VerifyCodePhone';
import HomeAdmin from './components/Information/HomeAdmin';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verifyPhone" element={<VerifyCodePhone />} />
      <Route path="/homeAdmin" element={<HomeAdmin />} />
    </Routes>
  );
};

export default AppRoutes;