import axios from 'axios';

const API_URL = 'https://localhost:7202/api'; // Backend API URL'si

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Users`, userData, {
            withCredentials: true // Kullanıcı kimlik bilgilerini göndermek için
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/Users/login`, {
            username: username,
            password: password
        }, {
            withCredentials: true   
        });
        console.log('Login Response:', response.data);
        return response.data; // Başarılı cevap alındığında veriyi döndür
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }   
};

export { registerUser, loginUser };
