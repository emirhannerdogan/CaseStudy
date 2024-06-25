// App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainPage from './components/MainPage';

const App = () => {
    const [userData, setUserData] = useState(null); // Kullanıcı verilerini state olarak tut

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm setUserData={setUserData} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/main" element={<MainPage userData={userData} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
