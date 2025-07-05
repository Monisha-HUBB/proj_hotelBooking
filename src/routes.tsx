import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HotelList from './components/HotelList';
import BookingPage from './components/BookingPage';
import SearchPage from './components/SearchPage';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './pages/HomePage';
import Register from './components/Register';

function AppRoutes() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/hotels' element={<HotelList />} />
      <Route path='/bookings' element={<BookingPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/payment' element={<PaymentPage />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);
}

export default AppRoutes;
