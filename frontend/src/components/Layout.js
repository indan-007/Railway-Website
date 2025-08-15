import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/30 backdrop-blur-md shadow-lg sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-white">Railway Booking</NavLink>
          <div className="space-x-6 text-white">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-yellow-200"}>Home</NavLink>
            <NavLink to="/bookings" className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-yellow-200"}>My Bookings</NavLink>
            <NavLink to="/pnr-status" className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-yellow-200"}>PNR Status</NavLink>
            <NavLink to="/admin" className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-yellow-200"}>Admin</NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800/50 text-white text-center p-4">
        <p>&copy; 2024 Railway Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
