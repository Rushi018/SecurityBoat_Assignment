import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
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
            const response = await axios.post('https://securityboat-assignment-lw1p.onrender.com/api/user/login', { email, password });
            
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('email',email)
            console.log(response)

            setSuccessMessage(response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000); 
        } catch (err) {
            console.log(err)
            setError("invalid email and password..")
                
            }
    };

    return (
        <div className='container mt-4' style={{ width: '24rem' , borderRadius:'10px', background:'#EEF7FF'}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4">
                    <h1 className="fw-bold mb-0 fs-2">Login</h1>
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

                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>

                        {error && <small className="text-danger" style={{fontSize:'16px',fontWeight:'500'}}>{error}</small>}
                        {successMessage && <small className="text-success" style={{fontSize:'20px',fontWeight:'500'}}>{successMessage}</small>}

                        <hr className="my-4" />
                        <h2 className="fs-5 fw-bold mb-3">Create your Account</h2>

                        <Link to='/signup'><button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="button">Signup Account</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
