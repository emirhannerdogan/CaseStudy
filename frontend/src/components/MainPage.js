
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserById } from '../api';
import '../css/MainPage.css'; 

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (location.state && location.state.userData) {
          setUserData(location.state.userData);
        } else if (userData && userData.userId) {
          const user = await getUserById(userData.userId);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [location.state, userData]);

  const handleEditProfile = () => {
    navigate('/profile/edit', { state: { userData } });
  };

  const handleViewTransactions = async () => {
    try {
      if (!userData || !userData.userId) {
        console.error('User data or userId is missing.');
        return;
      }

      navigate('/transactions', { state: { userId: userData.userId } });
    } catch (error) {
      console.error('Error navigating to transactions:', error);
    }
  };

  const handleViewTransfers = () => {
    try {
      if (!userData || !userData.userId) {
        console.error('User data or userId is missing.');
        return;
      }

      navigate('/transfers', { state: { userId: userData.userId } });
    } catch (error) {
      console.error('Error navigating to transactions:', error);
    };
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="main-page-container">
      <h2>Welcome to Main Page</h2>
      {userData ? (
        <div className="user-info">
          <p>Username: {userData.username}</p>
          <div className="button-container">
            <button onClick={handleEditProfile}>Profil Düzenle</button>
            <button onClick={handleViewTransactions}>Transactionları Görüntüle</button>
            <button onClick={handleViewTransfers}>Transferleri Görüntüle</button>
            <button onClick={handleLogout}>Hesaptan Çık</button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default MainPage;
