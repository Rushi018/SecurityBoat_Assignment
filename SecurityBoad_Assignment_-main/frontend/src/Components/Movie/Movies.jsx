import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import imageBanner from '../../assets/kingdom.jpg'

const url = 'https://securityboat-assignment-lw1p.onrender.com/api/get/movies'

function Movies() {

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);

        setMovies(response.data.findMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
    {/* <Banner/> */}
    <div className="container">
      <div className="container mt-4" style={{ borderRadius: '10px' }}>
        <h2>Released movie</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-2">
          {movies.slice(0, 8).map((movie) => (
            <div key={movie._id} className="col">

              <Link to="/ticket" className="card shadow-sm " style={{ cursor: 'pointer', textDecoration: "none" }}>
                <img src={movie.poster} className="bd-placeholder-img card-img-top" width="100%" height="350" alt={movie.title} style={{ fontWeight: 'bolder' }} />
              </Link>

            </div>
          ))}
        </div>

      </div>
      <div className="container mt-4" style={{ borderRadius: '10px' }}>

        <h3>Upcomming Movies</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-2 ">
          {movies.slice(8, 16).map((movie) => (
            <div key={movie._id} className="col">
              <Link to="/ticket" className="card shadow-sm " style={{ cursor: 'pointer', textDecoration: "none" }}>
                <img src={movie.poster} className="bd-placeholder-img card-img-top" width="100%" height="350" alt={movie.title} style={{ fontWeight: 'bolder' }} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
  );
}

export default Movies;
