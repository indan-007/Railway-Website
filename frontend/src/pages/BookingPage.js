import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '' }]);
  const [classCode, setClassCode] = useState('CC');

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: '' }]);
  };

  const handlePassengerChange = (index, event) => {
    const values = [...passengers];
    values[index][event.target.name] = event.target.value;
    setPassengers(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/book', { trainId, classCode, passengers })
      .then(response => {
        navigate(`/confirmation/${response.data.pnr}`);
      })
      .catch(error => console.error('Error booking ticket:', error));
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl text-white">
      <h1 className="text-3xl font-bold mb-6">Book Ticket</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
        {passengers.map((passenger, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={passenger.name}
              onChange={event => handlePassengerChange(index, event)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passenger.age}
              onChange={event => handlePassengerChange(index, event)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/80"
              required
            />
            <select
              name="gender"
              value={passenger.gender}
              onChange={event => handlePassengerChange(index, event)}
              className="border-2 border-white/50 bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/80"
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddPassenger} className="text-yellow-300 font-semibold mb-6">
          + Add Passenger
        </button>

        <div className="mb-6">
          <label htmlFor="class" className="block font-semibold mb-1">Class</label>
          <select id="class" value={classCode} onChange={e => setClassCode(e.target.value)} className="border-2 border-white/50 bg-white/20 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-white/80">
            <option value="CC">AC Chair Car</option>
            <option value="EC">Executive Chair Car</option>
            <option value="3A">AC 3 Tier</option>
            <option value="2A">AC 2 Tier</option>
            <option value="1A">AC First Class</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
