import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserById, getUserByUsername, getTransfersByUserId, addTransfer, deleteTransfer} from '../api';

import '../css/TransfersPage.css';

const TransfersPage = () => {
    const location = useLocation();
    const { userId } = location.state;
    const [transfers, setTransfers] = useState([]);
    const [toUsername, setToUsername] = useState('');
    const [amount, setAmount] = useState(0);
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const transfersData = await getTransfersByUserId(userId);
                setTransfers(transfersData);
            } catch (error) {
                console.error('Error fetching transfers:', error);
            }
        };

        fetchTransfers();
    }, [userId]);

    const handleAddTransfer = async () => {
        try {
            const toUser = await getUserByUsername(toUsername);

            if (!toUser) {
               
                setUserNotFound(true);
                return;
            }

            const transferData = {
                fromUserId: userId,
                fromUserName: '',
                toUserId: toUser.userId,
                toUserName: '',
                amount: amount,
                transferDate: new Date().toISOString()
            };

            await addTransfer(transferData);
            setTransfers([...transfers, transferData]);
            setUserNotFound(false);
        } catch (error) {
            console.error('Error adding transfer:', error);
            window.alert('Kullanıcı bulunamadı!');
        }
    };

    const handleDeleteTransfer = async (transferId) => {
        try {
            await deleteTransfer(transferId);
            setTransfers(transfers.filter((transfer) => transfer.transferId !== transferId));
        } catch (error) {
            console.error('Error deleting transfer:', error);
        }
    };

    
    

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Transfers</h1>
            <input
                type="text"
                value={toUsername}
                onChange={(e) => setToUsername(e.target.value)}
                placeholder="To User Username"
            />
            {userNotFound && <p style={{ color: 'red' }}>Kullanıcı bulunamadı!</p>}
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={handleAddTransfer}>Add Transfer</button>
            <table className="transfers-table">
                <thead>
                    <tr>
                        <th>From User</th>
                        <th>To User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr key={transfer.transferId}>
                            <td>{transfer.fromUserName}</td>
                            <td>{transfer.toUserName}</td>
                            <td>{transfer.amount}</td>
                            <td>{new Date(transfer.transferDate).toLocaleDateString()}</td>
                            <td>
                                
                                <button onClick={() => handleDeleteTransfer(transfer.transferId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBack}>Back</button>
        </div>
    );
};

export default TransfersPage;
