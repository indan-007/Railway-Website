const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load mock data
let stations = [];
let trains = [];
let bookings = [];

const dataPath = path.join(__dirname, 'data');

try {
  stations = JSON.parse(fs.readFileSync(path.join(dataPath, 'stations.json'), 'utf-8'));
  trains = JSON.parse(fs.readFileSync(path.join(dataPath, 'trains.json'), 'utf-8'));
  bookings = JSON.parse(fs.readFileSync(path.join(dataPath, 'bookings.json'), 'utf-8'));
} catch (error) {
  console.error('Error reading mock data:', error);
}

// Helper function to save bookings
const saveBookings = () => {
  fs.writeFileSync(path.join(dataPath, 'bookings.json'), JSON.stringify(bookings, null, 2));
};

// Helper function to save trains
const saveTrains = () => {
  fs.writeFileSync(path.join(dataPath, 'trains.json'), JSON.stringify(trains, null, 2));
};

// --- API Routes ---

// Get all stations
app.get('/api/stations', (req, res) => {
  res.json(stations);
});

// Get all trains
app.get('/api/trains', (req, res) => {
  res.json(trains);
});

// Search for trains
app.post('/api/trains/search', (req, res) => {
  const { from, to, date } = req.body;
  const results = trains.filter(train => train.from === from && train.to === to);
  res.json(results);
});

// Book a ticket
app.post('/api/book', (req, res) => {
  const { trainId, classCode, passengers } = req.body;
  const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const newBooking = { pnr, trainId, classCode, passengers, status: 'CONFIRMED' };
  bookings.push(newBooking);
  saveBookings();
  res.status(201).json(newBooking);
});

// Get PNR status
app.get('/api/pnr/:pnr', (req, res) => {
  const { pnr } = req.params;
  const booking = bookings.find(b => b.pnr === pnr);
  if (booking) {
    const train = trains.find(t => t.id === booking.trainId);
    res.json({ ...booking, train });
  } else {
    res.status(404).json({ message: 'PNR not found' });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// --- Admin Routes ---

// Add a new train
app.post('/api/admin/trains', (req, res) => {
  const newTrain = { id: (trains.length + 1).toString(), ...req.body };
  trains.push(newTrain);
  saveTrains();
  res.status(201).json(newTrain);
});

// Update a train
app.put('/api/admin/trains/:id', (req, res) => {
  const { id } = req.params;
  const index = trains.findIndex(t => t.id === id);
  if (index !== -1) {
    trains[index] = { ...trains[index], ...req.body };
    saveTrains();
    res.json(trains[index]);
  } else {
    res.status(404).json({ message: 'Train not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
