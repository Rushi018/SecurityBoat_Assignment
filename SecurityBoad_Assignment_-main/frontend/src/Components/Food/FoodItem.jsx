import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import foodBanner from '../../assets/cake.png'
const url = 'https://securityboat-assignment-lw1p.onrender.com/api/view/menu'

function FoodOrder() {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {

      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          throw new Error('No token found.');
        }

        const response = await axios.get(url);
        console.log(response.data)
        setMenu(response.data);

      } catch (err) {
        console.error('Error fetching menu:');
        setError('An error occurred. Please Login your account.');
      }
    };

    fetchMenu();
  }, [url]);

  return (
    <>
    <div className='container' style={{backgroundImage:`url(${foodBanner})` ,backgroundSize:'cover', height:'70vh'}}></div>
    <div className="container mt-4" >
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {menu.length > 0 ? (
          menu.map((item, index) => (
            <div key={index} className="col">
              <Link to='/order' style={{ cursor: 'pointer', textDecoration: "none" }}>
                <div className="card shadow-sm">
                  {item.imageUrl && (
                    <img src={item.imageUrl} className="bd-placeholder-img card-img-top" width="100%" height="225" alt={item.name} />
                  )}
                  <div className="card-body">
                    <h4 className="card-title">{item.name}</h4>
                    <h5 className="card-text">price: ₹{item.price}</h5>
                  </div>
                </div>
              </Link>
            </div>

          ))
        ) : (
          !error && <div className="text-center">Loading...</div>
        )}

      </div>

    </div >
    </>
  );
}

export default FoodOrder;
