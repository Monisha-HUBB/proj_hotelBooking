import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  
  const handleSearch = async () => {
     navigate(`/bookings`);
  }

  

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center" >
      <h1 style={{textAlign:'center', background: 'antiquewhite'}}>Welcome to Our Booking Service</h1>
      {/* <nav className="space-x-4"> */}
        {/* <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link> */}
        {/* <button> <Link to="/bookings" className="hover:underline">My Bookings</Link></button> */}


        
       
        {/* <Link to="/payment" className="hover:underline">Payment</Link>
        <Link to="/admin" className="hover:underline">Admin</Link> */}
      {/* </nav> */}
    </header>
  );
}

export default Header;
