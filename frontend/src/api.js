import axios from 'axios';

const API_URL = 'https://localhost:7202/api'; // Backend API URL'si

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Users`, userData, {
            withCredentials: true
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
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }   
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const updateUser = async (userId, userDto) => {
    try {
        const response = await axios.put(`${API_URL}/Users/${userId}`, userDto, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Kullanıcı güncelleme hatası:', error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/Users/${userId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Kullanıcı silme hatası:', error);
        throw error;
    }
};

const getTransactionsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/Transactions/User/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions by user ID:', error);
        throw error;
    }
};

const updateTransaction = async (transactionId, transactionDto) => {
    try {
        const response = await axios.put(`${API_URL}/Transactions/${transactionId}`, transactionDto, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Transaction update error:', error);
        throw error;
    }
};

const addTransaction = async (transactionData) => {
    try {
        const response = await axios.post(`${API_URL}/Transactions`, transactionData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};

const deleteTransaction = async (transactionId) => {
    try {
        const response = await axios.delete(`${API_URL}/Transactions/${transactionId}`);
        return response.data;
    } catch (error) {
        throw Error(`Error deleting transaction: ${error}`);
    }
};

const getTransfersByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/Transfers/User/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transfers by user ID:', error);
        throw error;
    }
};

const deleteTransfer = async (transferId) => {
    try {
        const response = await axios.delete(`${API_URL}/Transfers/${transferId}`);
        return response.data;
    } catch (error) {
        throw Error(`Error deleting transfer: ${error}`);
    }
};

const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/Users/username/${username}`);
        console.log('User found:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user by username '${username}':`, error);
        throw error;
    }
};

const addTransfer = async (transferData) => {
    try {
        const response = await axios.post(`${API_URL}/Transfers`, transferData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding transfer:', error);
        throw error;
    }
};

const updateTransfer = async (transferId, updatedTransferData) => {
    try {
        const response = await axios.put(`${API_URL}/Transfers/${transferId}`, updatedTransferData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
        } else {
            console.error('Request Error:', error.message);
        }
        throw error;
    }
};



export {
    registerUser,
    loginUser,
    updateUser,
    getUserById,
    deleteUser,
    getTransactionsByUserId,
    updateTransaction,
    addTransaction,
    deleteTransaction,
    getTransfersByUserId,
    deleteTransfer,
    getUserByUsername,
    addTransfer,
    updateTransfer
};
