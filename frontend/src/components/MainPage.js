// MainPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
    const location = useLocation();
    const userData = location.state && location.state.userData;

    return (    
        <div>
            <h2>Welcome to Main Page</h2>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Password: {userData.password}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default MainPage;
