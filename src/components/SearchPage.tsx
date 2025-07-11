import { useState } from 'react';
import { searchHotels } from '../api/api';
import Header from './common/Header';
import HotelCard from './common/HotelCard';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults | 1 Room');
  const [hotels, setHotels] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!location) {
      alert('Please enter a location');
      return;
    }
    const response = await searchHotels(location);
    const updatedHotels = response.data.map((hotel: any) => ({ ...hotel, selectedRooms: 1 }));
    setHotels(updatedHotels);
  };

  const handleRoomChange = (index: number, rooms: number) => {
    const updatedHotels = [...hotels];
    updatedHotels[index].selectedRooms = rooms;
    setHotels(updatedHotels);
  };

  const handleMyBooking = async () => {
    navigate(`/bookings`);
  }

 const handleBook = (hotel: any) => {
  navigate(`/payment`, { state: { ...hotel, selectedRooms: hotel.selectedRooms } });
};

const handleLogout = () => {
  localStorage.removeItem('token'); // Clear JWT
  localStorage.removeItem('email'); // If you stored user info
  navigate('/'); // Redirect to login or home
};

  const backgroundImageUrl = process.env.PUBLIC_URL + '/search-page.jpg';

  return (
    <div style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      <div className="search-container">
        <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', marginRight: '10px' }}>
          <button onClick={handleMyBooking} style={{ borderRadius: '8px', padding: '8px', background: 'black', border: 0, color: 'white' }}>
            My Bookings
          </button>
           <button onClick={handleLogout} style={{ borderRadius: '8px', padding: '8px', background: 'black', border: 0, color: 'white' }}>
            Log Out
          </button>
        </div>

        <div className="search-box">
          <div className="search-input">
            <label>Where to</label>
            <input
              type="text"
              placeholder="e.g. - Area, Landmark or Property Name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="search-input">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="search-input">
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="search-input">
            <label>Guests & Rooms</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="2 Adults | 1 Room">2 Adults | 1 Room</option>
              <option value="1 Adult | 1 Room">1 Adult | 1 Room</option>
              <option value="3 Adults | 2 Rooms">3 Adults | 2 Rooms</option>
            </select>
          </div>
          <div className="search-button-wrapper">
            <button className="search-button" onClick={handleSearch}>
              SEARCH
            </button>
          </div>
        </div>

        <div className="results">
          {hotels.map((hotel: any, index: number) => (
            <HotelCard
              key={hotel.id}
              index={index} // ✅ Pass index here
              name={hotel.name}
              location={hotel.location}
              pricePerNight={hotel.pricePerNight}
              description={hotel.description}
              selectedRooms={hotel.selectedRooms}
              onRoomsChange={handleRoomChange}
              onBook={() => handleBook(hotel)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
