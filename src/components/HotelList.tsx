import { SetStateAction, useEffect, useState } from 'react';
import { fetchHotels } from '../api/api';
import HotelCard from './common/HotelCard';
import Header from './common/Header';
import Footer from './common/Footer';
import PaymentPage from './PaymentPage';
import { useNavigate } from 'react-router-dom';

function HotelList() {
  const [hotels, setHotels] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    fetchHotels().then((response: { data: SetStateAction<never[]>; }) => setHotels(response.data));
  }, []);

  const handleBook = (hotelId: number) => {
  navigate(`/payment/${hotelId}`); // You can pass hotelId if you want to display payment details
};

  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Hotels</h2>
        {hotels.map((hotel: any) => (
          <HotelCard
            key={hotel.id}
            name={hotel.name}
            location={hotel.location}
            pricePerNight={hotel.pricePerNight}
            onBook={() => handleBook(hotel.id)}
            description={hotel.description} selectedRooms={0} onRoomsChange={function (rooms: number): void {
              throw new Error('Function not implemented.');
            } } index={0}          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default HotelList;
