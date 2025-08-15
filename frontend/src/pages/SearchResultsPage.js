import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [trains, setTrains] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get('from');
    const to = params.get('to');
    const date = params.get('date');

    axios.post('http://localhost:5000/api/trains/search', { from, to, date })
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  }, [location.search]);

  return (
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Available Trains</h1>
      <div className="space-y-4">
        {trains.length > 0 ? (
          trains.map(train => (
            <div key={train.id} className="bg-white/20 p-4 rounded-lg shadow-md flex justify-between items-center text-white transition-transform transform hover:scale-105">
              <div>
                <h2 className="text-xl font-bold">{train.name} ({train.id})</h2>
                <p>{train.from} ({train.departure}) -> {train.to} ({train.arrival})</p>
                <p>Duration: {train.duration}</p>
              </div>
              <div className="text-right">
                <Link to={`/book/${train.id}`} className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No trains found for this route.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
