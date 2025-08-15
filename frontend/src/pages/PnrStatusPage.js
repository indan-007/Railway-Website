import React, { useState } from 'react';
import axios from 'axios';

const PnrStatusPage = () => {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setBooking(null);
    axios.get(`http://localhost:5000/api/pnr/${pnr}`)
      .then(response => setBooking(response.data))
      .catch(err => setError('PNR not found.'));
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl text-white">
      <h1 className="text-3xl font-bold mb-6">Check PNR Status</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-2">
        <input
          type="text"
          value={pnr}
          onChange={e => setPnr(e.target.value.toUpperCase())}
          placeholder="Enter PNR"
          className="border-2 border-white/50 bg-white/20 p-2 rounded-lg w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80"
        />
        <button type="submit" className="bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors">Check</button>
      </form>

      {error && <p className="text-red-300 bg-red-900/50 p-3 rounded-lg">{error}</p>}

      {booking && (
        <div className="bg-white/20 p-6 rounded-lg">
          <p className="text-xl mb-2">PNR: <span className="font-mono bg-yellow-400 text-blue-900 px-2 py-1 rounded">{booking.pnr}</span></p>
          <p>Status: <span className="font-bold text-green-300">{booking.status}</span></p>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">{booking.train.name} ({booking.train.id})</h2>
            <p>{booking.train.from} -> {booking.train.to}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Passengers</h3>
            <ul className="list-disc list-inside">
              {booking.passengers.map((p, i) => (
                <li key={i}>{p.name} (Age: {p.age}, Gender: {p.gender})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PnrStatusPage;
