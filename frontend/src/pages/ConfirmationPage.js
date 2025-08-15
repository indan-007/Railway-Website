import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmationPage = () => {
  const { pnr } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pnr/${pnr}`)
      .then(response => setBooking(response.data))
      .catch(error => console.error('Error fetching booking details:', error));
  }, [pnr]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-300 mb-4">Booking Confirmed!</h1>
        <p className="text-xl mb-4">Your ticket has been successfully booked.</p>
        <p className="text-2xl mb-6">PNR: <span className="font-mono bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg">{booking.pnr}</span></p>
        <p className="mb-8">Status: <span className="font-bold text-green-300">{booking.status}</span></p>
      </div>

      <div className="bg-white/20 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">{booking.train.name} ({booking.train.id})</h2>
        <p>{booking.train.from} -> {booking.train.to}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Passengers</h3>
        <ul className="list-disc list-inside bg-white/20 p-6 rounded-lg">
          {booking.passengers.map((p, i) => (
            <li key={i} className="mb-2">{p.name} (Age: {p.age}, Gender: {p.gender})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfirmationPage;
