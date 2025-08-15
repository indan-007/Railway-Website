# Railway Ticket Booking Platform

A modern, responsive IRCTC-inspired railway reservation system. Users can search for trains, view schedules, select seats, and complete mock bookings with a generated PNR number. Includes an admin panel for managing trains, fares, and schedules.

## Features

- **Search Trains**: Select origin, destination, date, and travel class.
- **Search Results**: View available trains, timings, travel classes, and fares.
- **Booking Flow**: Fill passenger details, choose berth preference, and complete a mock payment.
- **PNR Status Checker**: Enter a PNR to see your booking status.
- **My Bookings Page**: View all your previous bookings.
- **Admin Panel**: Add or edit trains, schedules, and fares.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, `react-router-dom`, `axios`
- **Backend**: Node.js, Express, `cors`
- **Database**: Mock JSON files

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/railway-website.git
    cd railway-website
    ```

2.  **Set up the backend:**
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install the dependencies:
      ```bash
      npm install
      ```

3.  **Set up the frontend:**
    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Install the dependencies:
      ```bash
      npm install
      ```

### Running the Application

1.  **Start the backend server:**
    - In the `backend` directory, run:
      ```bash
      npm run dev
      ```
    - The server will start on `http://localhost:5000`.

2.  **Start the frontend development server:**
    - In the `frontend` directory, run:
      ```bash
      npm start
      ```
    - The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
/
├── backend/
│   ├── data/
│   │   ├── stations.json
│   │   ├── trains.json
│   │   └── bookings.json
│   ├── node_modules/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## License

This project is licensed under the MIT License.
