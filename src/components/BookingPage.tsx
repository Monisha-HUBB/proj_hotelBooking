// import { useEffect, useState } from 'react';
// import { fetchBookings } from '../api/api';
// import Header from './common/Header';
// import Footer from './common/Footer';
// import './BookingPage.css';

// function BookingPage() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings()
//       .then(response => setBookings(response.data))
//       .catch(() => alert('Error fetching bookings'));
//   }, []);

//   const backgroundImageUrl = process.env.PUBLIC_URL + '/pexels-heyho-6782467.jpg';

//   return (
//     <div className="booking-page" style={{
//     backgroundImage: `url(${backgroundImageUrl})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundAttachment: 'fixed',
//     minHeight: '100vh',
//     overflowY: 'auto',
//     display: 'flex',
//     flexDirection: 'column',
//   }}>
//   <Header />
//   <div className="booking-container">
//     <h2 className="booking-title">Booking History</h2>

//     {bookings.length === 0 ? (
//       <div className="no-bookings">No bookings found.</div>
//     ) : (
//       <div className="booking-grid">
//         {bookings.map((booking: any) => (
//           <div key={booking.id} className="booking-card">
//             <h3 className="booking-hotel">{booking.hotelName}</h3>
//             <p style={{margin: 0}}><strong>Booking Date:</strong> {booking.bookingDate}</p>
//             <p style={{margin: 0}}><strong>Location:</strong> {booking.location}</p>
//             <p style={{margin: 0}}><strong>Price:</strong> ₹{booking.price}</p>
//             <span className={`booking-status ${booking.status.toLowerCase() === 'confirmed' ? 'status-confirmed' : 'status-cancelled'}`}>
//               {booking.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
//   <Footer />
// </div>

//   );
// }

// export default BookingPage;


import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL, fetchBookings } from '../api/api';
import Header from './common/Header';
import Footer from './common/Footer';
import './BookingPage.css';

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const { search } = useLocation();
  console.log("bookings", bookings)

  // Extract query params from URL
  const params = new URLSearchParams(search);
  const hotelName = params.get('hotelName');
  const location = params.get('location');
  const amount = params.get('amount');
const navigate = useNavigate();

const selectedRooms: any = params.get('selectedRooms') || 1;

  
  const handleBack = async () => {
      navigate(`/search`);
  }
const userEmail = localStorage.getItem('email');

useEffect(() => {
  if (hotelName && location && amount && userEmail) {
    const bookingDate = new Date().toISOString().split('T')[0];

    // Save Booking
fetch(`${API_BASE_URL}/booking/book`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: userEmail,
    hotelName: hotelName,
    location: location,
    price: Number(amount) / 100 / selectedRooms,
    status: 'Confirmed',
    bookingDate: bookingDate,
    numberOfRooms: selectedRooms
  }),
})
      .then(() => {
    // Save Payment
    return fetch(`${API_BASE_URL}/payments/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: 0,
        paymentMode: 'Stripe-Online',
        paymentStatus: 'Paid',
        amount: Number(amount) / 100,
        email: userEmail
      }),
    });
  })
      .then(() => {
        loadBookings(); // Refresh bookings
      })
      .catch(() => {
        alert('Error saving booking or payment');
      });
  } else {
    loadBookings(); // Load existing bookings
  }
}, [hotelName, location, amount, userEmail]);


  const loadBookings = () => {
  if (!userEmail) {
    alert('User not logged in');
    return;
  }

  fetch(`${API_BASE_URL}/booking/user/${userEmail}`)
    .then(response => response.json())
    .then(data => setBookings(data))
    .catch(() => alert('Error fetching bookings'));
};


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
        {/* <button onClick={handleBack}>Go to Dashboard</button> */}

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
                <p style={{ margin: 0 }}><strong>Booking Date:</strong> {booking.bookingDate}</p>
                <p style={{ margin: 0 }}><strong>Location:</strong> {booking.location}</p>
                <p style={{ margin: 0 }}><strong>Price:</strong> ₹{booking.price}</p>
                <span className={`booking-status ${booking.status.toLowerCase() === 'confirmed' ? 'status-confirmed' : 'status-cancelled'}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BookingPage;
