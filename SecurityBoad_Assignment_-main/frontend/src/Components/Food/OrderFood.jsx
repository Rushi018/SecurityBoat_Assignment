import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const url = 'https://securityboat-assignment-lw1p.onrender.com/api/order/place'

const OrderFood = () => {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const payload = {
            user: email,
            items: [{ item, quantity }],
        };

        try {
            const response = await axios.post(url, payload);
            console.log('Response:', response.data);
            setSuccessMessage('Order placed successfully!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
            
        } catch (error) {
            console.error('Error response:', error);        
            setError('Something went wrong, please try again.')
        }
    };

    return (
        <div className='container mt-4' style={{ width: '24rem' }}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4">
                    <h1 className="fw-bold mb-0 fs-2">Order Food</h1>
                </div>
                <div className="modal-body p-5 pt-0">
                    <form className="" onSubmit={handleSubmit}>
                    
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select 
                                className="form-select" 
                                id="floatingMovie" 
                                aria-label="Default select example" 
                                value={item} 
                                onChange={(e) => setItem(e.target.value)}
                                required
                            >
                                <option value="">Select Food</option>
                                <option value="Cheeseburger">Cheeseburger</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Chocolate Milkshake">Chocolate Milkshake</option>
                                <option value="Caramel Popcorn">Caramel Popcorn</option>
                                <option value="Popcorn">Popcorn</option>
                                <option value="Iced Coffee">Iced Coffee</option>
                            </select>
                            <label htmlFor="floatingMovie">Movie</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control rounded-3"
                                id="floatingQuantity"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                min="1"
                            />
                            <label htmlFor="floatingQuantity">Quantity</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Order</button>
                        {error && <small className="text-danger" style={{fontSize:'20px'}}>{error}</small>}
                        {successMessage && <small className="text-success" style={{fontSize:'20px'}} >{successMessage}</small>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderFood;
