import React, { useState } from 'react';
import { loginUser } from '../api'; // Import your API function
import { useNavigate } from 'react-router-dom';
import '../css/LoginForm.css'; // Import CSS file

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser(username, password);
            console.log('Login Successful:', response);

            const userData = {
                userId: response.userId,
                username: response.username,
                password: response.passwordHash,
                email: response.email
            };

            navigate('/main', { state: { userData } });
        } catch (error) {
            console.error('Login Error:', error);
            setError('Hesap adı veya şifre yanlış');
        }
    };

    return (
        <div className="login-form-container">
            <h2>Giriş Yap</h2>
            <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin}>Giriş Yap</button>
            <p className="register-link">Hesabınız yoksa <a href="/register">hesap oluşturun</a></p>
        </div>
    );
};

export default LoginForm;
