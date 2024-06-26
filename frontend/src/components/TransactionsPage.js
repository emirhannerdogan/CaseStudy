
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTransactionsByUserId, updateTransaction, deleteTransaction, addTransaction } from '../api';
import '../css/TransactionsPage.css';

const TransactionsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const userId = location.state && location.state.userId;
    const [editingTransactionId, setEditingTransactionId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        description: '',
        amount: ''
    });
    const [addingNewTransaction, setAddingNewTransaction] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (userId) {
                    const transactionsData = await getTransactionsByUserId(userId);
                    setTransactions(transactionsData);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [userId]);

    const handleEditTransaction = (transactionId, description, amount) => {
        setEditingTransactionId(transactionId);
        setEditFormData({ description, amount });
    };

    const handleCancelEdit = () => {
        setEditingTransactionId(null);
        setEditFormData({
            description: '',
            amount: ''
        });
    };

    const handleSaveEdit = async () => {
        try {
            await updateTransaction(editingTransactionId, editFormData);
            const updatedTransactions = await getTransactionsByUserId(userId);
            setTransactions(updatedTransactions);
            setEditingTransactionId(null);
            setEditFormData({
                description: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleAddNewTransaction = () => {
        setAddingNewTransaction(true);
    };

    const handleCancelAdd = () => {
        setAddingNewTransaction(false);
        setEditFormData({
            description: '',
            amount: ''
        });
    };

    const handleSaveNewTransaction = async () => {
        try {
            await addTransaction({
                userId,
                description: editFormData.description,
                amount: editFormData.amount
            });

            const updatedTransactions = await getTransactionsByUserId(userId);
            setTransactions(updatedTransactions);
            setAddingNewTransaction(false);
            setEditFormData({
                description: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error creating new transaction:', error);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
        if (confirmDelete) {
            try {
                await deleteTransaction(transactionId);
                const updatedTransactions = await getTransactionsByUserId(userId);
                setTransactions(updatedTransactions);
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };
    
    return (
        <div className="page-container">
            <h2>Transaction History</h2>
            <button onClick={handleAddNewTransaction}>Yeni Transaction Ekle</button>
            {addingNewTransaction && (
                <div className="transaction-container">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editFormData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={editFormData.amount}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveNewTransaction}>Kaydet</button>
                    <button onClick={handleCancelAdd}>İptal</button>
                </div>
            )}
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.transactionId} className="transaction-container">
                            {editingTransactionId === transaction.transactionId ? (
                                <div className="edit-container">
                                    <input
                                        type="text"
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="amount"
                                        value={editFormData.amount}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleSaveEdit}>Kaydet</button>
                                    <button onClick={handleCancelEdit}>İptal</button>
                                </div>
                            ) : (
                                <div>
                                    <p>Transaction ID: {transaction.transactionId}</p>
                                    <p>Description: {transaction.description}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    <button onClick={() => handleEditTransaction(transaction.transactionId, transaction.description, transaction.amount)}>Düzenle</button>
                                    <button onClick={() => handleDeleteTransaction(transaction.transactionId)}>Sil</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found for this user.</p>
            )}
            <button onClick={handleGoBack}>Geri Dön</button>
        </div>
    );
};

export default TransactionsPage;
