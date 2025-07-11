import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';
import Header from './common/Header';
import './BookingPage.css';

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const hotelName = params.get('hotelName');
  const location = params.get('location');
  const amount = params.get('amount');
  const selectedRooms: any = params.get('selectedRooms') || 1;
  const userEmail = localStorage.getItem('email');

  const handleBack = () => {
    navigate('/search');
  };

  useEffect(() => {
    const fetchBookings = () => {
      if (!userEmail) {
        alert('User not logged in');
        return;
      }

      fetch(`${API_BASE_URL}/booking/user/${userEmail}`)
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(() => alert('Error fetching bookings'));
    };

    if (hotelName && location && amount && userEmail) {
      const bookingDate = new Date().toISOString().split('T')[0];

      fetch(`${API_BASE_URL}/booking/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          hotelName,
          location,
          price: Number(amount) / 100 / selectedRooms,
          status: 'Confirmed',
          bookingDate,
          numberOfRooms: selectedRooms,
        }),
      })
        .then(() => {
          return fetch(`${API_BASE_URL}/payments/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: 0,
              paymentMode: 'Stripe-Online',
              paymentStatus: 'Paid',
              amount: Number(amount) / 100,
              email: userEmail,
            }),
          });
        })
        .then(fetchBookings)
        .catch(() => {
          alert('Error saving booking or payment');
        });
    } else {
      fetchBookings();
    }
  }, [hotelName, location, amount, userEmail, selectedRooms]);

  const backgroundImageUrl = process.env.PUBLIC_URL + '/pexels-heyho-6782467.jpg';

  return (
    <div className="booking-page" style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      <div className="booking-container">
        <div style={{ display: 'flex', justifyContent: 'end', padding: '10px' }}>
          <button onClick={handleBack} style={{ borderRadius: '8px', padding: '8px', background: 'black', border: 0, color: 'white' }}>
            Go to Dashboard
          </button>
        </div>

        <h2 className="booking-title">Booking History</h2>

        {bookings.length === 0 ? (
          <div className="no-bookings">No bookings found.</div>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking: any) => (
              <div key={booking.id} className="booking-card">
                <h3 className="booking-hotel">{booking.hotelName}</h3>
                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Price:</strong> ₹{booking.price}</p>
                <span className={`booking-status ${booking.status.toLowerCase() === 'confirmed' ? 'status-confirmed' : 'status-cancelled'}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
