import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://securityboat-assignment-lw1p.onrender.com/api/user/signup', { name, email, password });

            if(response.email == email){
                console.log("already signup user");
            }

            setSuccessMessage('Signup successful! Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
        } catch (err) {
            console.log(err);
            setError('User already signup this account',);
        }
    };

    return (
        <div className='container mt-4' style={{  width: '24rem' , background:'#EEF7FF'}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4">
                    <h1 className="fw-bold mb-0 fs-2">Signup</h1>
                </div>

                <div className="modal-body p-5 pt-0 mt-4">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="floatingName"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingName">Name</label>
                        </div>

                        <div className="form-floating mb-3 mt-4 ">
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

                        <div className="form-floating mb-3 mt-4">
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button className="w-100 mb-2 mt-4 btn btn-lg rounded-3 btn-primary" type="submit">Signup</button>
                        {error && <small className="text-danger" style={{fontSize:'16px' , fontWeight:'500'}}>{error}</small>}
                        {successMessage && <small className="text-success" style={{fontSize:'20px',fontWeight:'500'}}>{successMessage}</small>}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
