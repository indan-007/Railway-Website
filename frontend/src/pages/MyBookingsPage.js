import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl text-white">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.pnr} className="bg-white/20 p-4 rounded-lg shadow-md">
              <p className="font-bold">PNR: <span className="font-mono bg-yellow-400 text-blue-900 px-2 py-1 rounded">{booking.pnr}</span></p>
              <p>Train ID: {booking.trainId}</p>
              <p>Status: <span className="font-semibold text-green-300">{booking.status}</span></p>
              <p>Passengers: {booking.passengers.map(p => p.name).join(', ')}</p>
            </div>
          ))
        ) : (
          <p className="text-center">You have no bookings.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
