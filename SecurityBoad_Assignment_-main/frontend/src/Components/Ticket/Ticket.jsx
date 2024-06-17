import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ticket() {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [number, setNumber] = useState('');
    const [movie, setMovie] = useState('');
    const [seat, setSeat] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const payload = { email, number, movie, seat: parseInt(seat) };
            console.log('Request payload:', payload);

            const response = await axios.post('https://securityboat-assignment-lw1p.onrender.com/api/booked/seat', payload);

            console.log('Response:', response.data);
            setSuccessMessage('Ticket booked successfully! Redirecting to home...');
            setTimeout(() => {
                navigate('/viewticket');
            }, 2000);

        } catch (error) {
            console.error('Error response:', error);
           setError("Ticket already sold..")
        }
    };

    return (
        <div className='container mt-4' style={{ width: '25rem' , background:'#EEF7FF', borderRadius:'10px'}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4">
                    <h1 className="fw-bold mb-0 fs-2">Book Ticket</h1>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="floatingEmail"
                                placeholder="name@example.com"
                                value={email}
                                required
                            />
                            <label htmlFor="floatingEmail">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className="form-control rounded-3"
                                id="floatingNumber"
                                placeholder="Enter your number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingNumber">Mobile number</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select 
                                className="form-select" 
                                id="floatingMovie" 
                                aria-label="Default select example" 
                                value={movie} 
                                onChange={(e) => setMovie(e.target.value)}
                                required
                            >
                                <option value="">Select Movie</option>
                                <option value="Hacker">Hacker</option>
                                <option value="Robot">Robot</option>
                                <option value="Mission Mangal">Mission Mangal</option>
                                <option value="3 Idiots">3 Idiots</option>
                            </select>
                            <label htmlFor="floatingMovie">Movie</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select 
                                className="form-select" 
                                id="floatingMovie" 
                                aria-label="Default select example" 
                                value={seat} 
                                onChange={(e) => setSeat(e.target.value)}
                                required
                            >
                                <option value="">Select Seat</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                            </select>
                            <label htmlFor="floatingMovie">Movie</label>
                        </div>

                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Book Ticket</button>
                        {error && <small className="text-danger" style={{fontSize:'16px'}}>{error}</small>}
                        {successMessage && <small className="text-success" style={{fontSize:'20px'}}>{successMessage}</small>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
