import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import Main from '../Pages/Main';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
