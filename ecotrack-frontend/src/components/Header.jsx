import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-green-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🌿 EcoTrack</Link>
        <nav>
          <Link to="/" className="mx-4">Home</Link>
          <Link to="/report-waste" className="mx-4">Report Waste</Link>
          <Link to="/schedule-pickup" className="mx-4">Schedule Pickup</Link>
          {token ? (
            <>
              <Link to="/admin" className="mx-4">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-4">Login</Link>
              <Link to="/register" className="mx-4">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
