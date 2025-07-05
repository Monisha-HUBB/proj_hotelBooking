import './HotelCard.css';

interface HotelCardProps {
  index: number; // ✅ Add index
  name: string;
  location: string;
  pricePerNight: number;
  description: string;
  onBook: () => void;
  selectedRooms: number;
  onRoomsChange: (index: number, rooms: number) => void; // ✅ Pass index also
}

function HotelCard({ index, name, location, pricePerNight, description, onBook, selectedRooms, onRoomsChange }: HotelCardProps) {
  return (
    <div className="hotel-card">
      <div className="hotel-details">
        <h3 className="hotel-title">{name}</h3>
        <p className="hotel-location">Location: {location}</p>
        <p className="hotel-location">Details: </p>
        <p className="hotel-location" style={{ color: 'orange' }}>{description}</p>
      </div>

      <div className="hotel-action">
        <input
          type="number"
          min="1"
          value={selectedRooms}
          onChange={(e) => onRoomsChange(index, Number(e.target.value))} // ✅ Pass index here
          className="border p-2 rounded w-20 mb-4"
        />
        <div><p className="hotel-price">₹{pricePerNight} per night</p></div>
        <div><button onClick={onBook} className="book-button">
          Book Now
        </button></div>
      </div>
    </div>
  );
}

export default HotelCard;
