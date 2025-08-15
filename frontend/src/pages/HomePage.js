import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [stations, setStations] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/stations')
      .then(response => setStations(response.data))
      .catch(error => console.error('Error fetching stations:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="text-center text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Railway Booking</h1>
      <p className="text-xl mb-8">Your one-stop solution for train ticket booking.</p>
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl inline-block">
        <form onSubmit={handleSubmit} className="flex space-x-4 items-end">
          <div>
            <label htmlFor="from" className="block text-left text-white font-semibold mb-1">From</label>
            <input
              list="from-stations"
              id="from"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80"
              placeholder="Origin"
              required
            />
            <datalist id="from-stations">
              {stations.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </datalist>
          </div>
          <div>
            <label htmlFor="to" className="block text-left text-white font-semibold mb-1">To</label>
            <input
              list="to-stations"
              id="to"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80"
              placeholder="Destination"
              required
            />
            <datalist id="to-stations">
              {stations.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </datalist>
          </div>
          <div>
            <label htmlFor="date" className="block text-left text-white font-semibold mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/80"
              required
            />
          </div>
          <button type="submit" className="bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300">Search Trains</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
