import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import '../css/RegisterForm.css';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                username,
                password,
                email
            };
            await registerUser(userData);
            navigate.push('/login');
        } catch (error) {
            console.error('Kullanıcı kaydı sırasında bir hata oluştu:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Kullanıcı Adı:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Şifre:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button type="submit">Kayıt Ol</button>
            </form>
            <p><a href="/">Hesabınız varsa giriş yapabilirsiniz</a></p>
        </div>
    );
};

export default RegisterForm;
