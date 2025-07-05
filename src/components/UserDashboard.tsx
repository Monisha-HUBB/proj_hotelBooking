import React from 'react';
import HotelList from './HotelList';
import Header from './common/Header';
import Footer from './common/Footer';

const UserDashboard = () => {
  // return (
  //   <div>
  //     <HotelList />
  //   </div>
  // );

    return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        <p>Manage hotels, bookings, and users here.</p>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
