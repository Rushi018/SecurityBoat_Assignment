import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Movies from './Components/Movie/Movies';
import FoodOrder from './Components/Food/FoodItem';
import Ticket from './Components/Ticket/Ticket';
import OrderFood from './Components/Food/OrderFood';
import ShowTicket from './Components/Ticket/ShowTicket';

function App() {
  return (
    <div className='Container'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/ticket' element={<Ticket/> } />
          <Route path='/food' element={<FoodOrder />} />
          <Route path='/order' element={<OrderFood />} />
          <Route path='/viewticket' element={<ShowTicket/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App





