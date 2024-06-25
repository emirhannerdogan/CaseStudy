import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../api';

const ProfileEditForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userId: '', 
        username: '',
        password: '',
        email: ''
    });

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            await updateUser(userData.userId, {
                username: userData.username,
                password: userData.password,
                email: userData.email
            });

            navigate('/main', { state: { userData } });
        } catch (error) {
            console.error('Profil güncelleme hatası:', error);
        }
    };

    const handleDeleteProfile = async () => {
        const confirmation = window.confirm('Hesabını silmek istediğinize emin misiniz?');

        if (confirmation) {
            try {
                await deleteUser(userData.userId);
                navigate('/');
            } catch (error) {
                console.error('Hesap silme hatası:', error);
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h2>Profil Düzenle</h2>
            <form onSubmit={handleUpdateProfile}>
                <label>Kullanıcı Adı:</label>
                <input type="text" name="username" value={userData.username || ''} onChange={handleChange} />
                <label>Şifre:</label>
                <input type="password" name="password" value={userData.password || ''} onChange={handleChange} />
                <label>Email:</label>
                <input type="email" name="email" value={userData.email || ''} onChange={handleChange} />
                <button type="submit">Kaydet</button>
                <button type="button" onClick={handleDeleteProfile}>Hesabı Sil</button>
                <button type="button" onClick={handleGoBack}>Geri Dön</button>
            </form>
        </div>
    );
};

export default ProfileEditForm;
