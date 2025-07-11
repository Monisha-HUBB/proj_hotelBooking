import { useEffect, useState } from 'react';
import Header from './common/Header';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    totalPayments: 0
  });

   const navigate = useNavigate();

  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [showBookings, setShowBookings] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const [bookingSearchTerm, setBookingSearchTerm] = useState('');
  const [paymentSearchTerm, setPaymentSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsResponse = await axios.get(`${API_BASE_URL}/admin/stats`);
      setStats(statsResponse.data);

      const usersResponse = await axios.get(`${API_BASE_URL}/users/all`);
      setUsers(usersResponse.data);

      const bookingsResponse = await axios.get(`${API_BASE_URL}/booking/all`);
      setBookings(bookingsResponse.data);

      const paymentsResponse = await axios.get(`${API_BASE_URL}/payments/all`);
      setPayments(paymentsResponse.data);
    } catch (error) {
      alert('Error loading dashboard data');
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    (booking.hotelName || '').toLowerCase().includes(bookingSearchTerm.toLowerCase()) ||
    (booking.email || '').toLowerCase().includes(bookingSearchTerm.toLowerCase()) ||
    (booking.location || '').toLowerCase().includes(bookingSearchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter((payment) =>
    (payment.email || '').toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
    (payment.paymentMode || '').toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
    (payment.paymentStatus || '').toLowerCase().includes(paymentSearchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user: any) =>
    (user.email || '').toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (user.role || '').toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleLogout = () => {
  localStorage.removeItem('token'); // Clear JWT
  localStorage.removeItem('email'); // If you stored user info
  navigate('/'); // Redirect to login or home
};

  return (
    <div className="admin-dashboard">
      <Header />
      <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', marginRight: '10px' }}>
           <button onClick={handleLogout} style={{ borderRadius: '8px', padding: '8px', background: 'black', border: 0, color: 'white' }}>
            Log Out
          </button>
        </div>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-cards">

          {/* Users Card */}
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
            <button onClick={() => setShowUsers(!showUsers)} className="view-bookings-button">
              {showUsers ? 'Hide User Details' : 'Click to View User Details'}
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Total Hotels</h3>
            <p>{stats.totalHotels}</p>
          </div>

          {/* Bookings Card */}
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
            <button onClick={() => setShowBookings(!showBookings)} className="view-bookings-button">
              {showBookings ? 'Hide Booking Details' : 'Click to View Booking Details'}
            </button>
          </div>

          {/* Payments Card */}
          <div className="dashboard-card">
            <h3>Total Payments</h3>
            <p>{stats.totalPayments}</p>
            <button onClick={() => setShowPayments(!showPayments)} className="view-bookings-button">
              {showPayments ? 'Hide Payment Details' : 'Click to View Payment Details'}
            </button>
          </div>
        </div>

        {/* Users Section */}
        {showUsers && (
          <>
            <h3>User Details</h3>
            <input
              type="text"
              placeholder="Search users (email, role)"
              className="booking-search"
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
            />
            <div className="dashboard-table scrollable-table">
              {filteredUsers.length === 0 ? (
                <p>No users found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user: any) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Booking Section */}
        {showBookings && (
          <>
            <h3>Booking Details</h3>
            <input
              type="text"
              placeholder="Search bookings (hotel, email, location)"
              className="booking-search"
              value={bookingSearchTerm}
              onChange={(e) => setBookingSearchTerm(e.target.value)}
            />
            <div className="dashboard-table scrollable-table">
              {filteredBookings.length === 0 ? (
                <p>No bookings found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Hotel Name</th>
                      <th>User Email</th>
                      <th>Location</th>
                      <th>Booking Date</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking: any) => (
                      <tr key={booking.id}>
                        <td>{booking.hotelName}</td>
                        <td>{booking.email}</td>
                        <td>{booking.location}</td>
                        <td>{booking.bookingDate}</td>
                        <td>₹{booking.price}</td>
                        <td>{booking.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Payment Section */}
        {showPayments && (
          <>
            <h3>Payment Details</h3>
            <input
              type="text"
              placeholder="Search payments (email, mode, status)"
              className="booking-search"
              value={paymentSearchTerm}
              onChange={(e) => setPaymentSearchTerm(e.target.value)}
            />
            <div className="dashboard-table scrollable-table">
              {filteredPayments.length === 0 ? (
                <p>No payments found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>User Email</th>
                      <th>Amount</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment: any) => (
                      <tr key={payment.id}>
                        <td>{payment.email}</td>
                        <td>₹{payment.amount}</td>
                        <td>{payment.paymentMode}</td>
                        <td>{payment.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
