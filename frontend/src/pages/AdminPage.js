import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({
    name: '', from: '', to: '', departure: '', arrival: '', duration: ''
  });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = () => {
    axios.get('http://localhost:5000/api/trains') // Assuming this endpoint exists
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrain({ ...newTrain, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/admin/trains', newTrain)
      .then(() => {
        fetchTrains();
        setNewTrain({ name: '', from: '', to: '', departure: '', arrival: '', duration: '' });
      })
      .catch(error => console.error('Error adding train:', error));
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="mb-8 bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Add New Train</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" value={newTrain.name} onChange={handleInputChange} placeholder="Train Name" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <input name="from" value={newTrain.from} onChange={handleInputChange} placeholder="From (Station Code)" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <input name="to" value={newTrain.to} onChange={handleInputChange} placeholder="To (Station Code)" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <input name="departure" value={newTrain.departure} onChange={handleInputChange} placeholder="Departure (HH:MM)" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <input name="arrival" value={newTrain.arrival} onChange={handleInputChange} placeholder="Arrival (HH:MM)" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <input name="duration" value={newTrain.duration} onChange={handleInputChange} placeholder="Duration" className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80" />
          <button type="submit" className="col-span-2 bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-600 transition-colors">Add Train</button>
        </form>
      </div>

      <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Existing Trains</h2>
        <div className="space-y-4">
          {trains.map(train => (
            <div key={train.id} className="bg-white/20 p-4 rounded-lg shadow-md">
              <p className="font-bold">{train.name} ({train.id})</p>
              <p>{train.from} -> {train.to}</p>
              {/* Add edit/delete functionality here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
