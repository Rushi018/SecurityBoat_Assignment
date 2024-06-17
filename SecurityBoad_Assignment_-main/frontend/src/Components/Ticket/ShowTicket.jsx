import axios from 'axios';
import React, { useState } from 'react';
const url = `https://securityboat-assignment-lw1p.onrender.com/api/booked/tickets`



function GetTickets() {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [tickets, setTickets] = useState({ email: "", movie: "", seat: "", time: "", totalPrice: "" });
    const [show, setShow] = useState(false)
    const [error , setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, { email }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            const ticketData = response.data
            console.log(ticketData);

            setTickets({ ...tickets, email: ticketData.email, movie: ticketData.movie, seat: (ticketData.seat).length, time: ticketData.bookingTime, totalPrice: ticketData.totalPrice })
            setShow(true)
            setEmail("")
            
        } catch (err) {
            console.log(err)
            setError('your ticket is not booked')
        }
    };

    return (
        <div className='container mt-4'style={{ width: '25rem' , background:'#EEF7FF', borderRadius:'10px'}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4">
                    <h1 className="fw-bold mb-0 fs-2">View Tickets</h1>
                </div>
                <div className="modal-body p-5 pt-0" >
                {error && <small className="text-danger" style={{fontSize:'16px'}}>{error}</small>}
                    {show === false ? <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                required
                            />
                            <label htmlFor="floatingInput">Enter Email Address</label>
                        </div>

                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Get Tickets</button>

                    </form> : <div className="mt-4">
                        <h2 className="fs-4 fw-bold mb-3">Tickets</h2>
                        <div className="list-group">

                            <div className="list-group-item list-group-item-action ">
                                <h5 className="mb-1 mt-2" style={{fontSize:'20px'}}>Movie: {tickets.movie}</h5>
                                <p className="mb-1 mt-2" style={{fontSize:'20px'}}>Email: {tickets.email}</p>
                                <p className="mb-1 mt-2" style={{fontSize:'20px'}}>Seats: {tickets.seat}</p>
                                <hr />
                                <smalzl className="text-muted" style={{fontSize:'25px', }}>Total Price: {tickets.totalPrice}</smalzl>
                            </div>
                           

                        </div>
                    </div>}




                </div>
            </div>
        </div>
    );
}
export default GetTickets;
