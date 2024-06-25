// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainPage from './components/MainPage';
import ProfileEditForm from './components/ProfileEditForm'; 
import TransactionsPage from './components/TransactionsPage';
import TransfersPage from './components/TransfersPage';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/profile/edit" element={<ProfileEditForm />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/transfers" element={<TransfersPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
