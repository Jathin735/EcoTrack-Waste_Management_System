import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SchedulePickup = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/pickups', { pickupDate, pickupTime, location });
      setMessage('Pickup Scheduled Successfully!');
      setIsError(false);
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to schedule pickup');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Schedule Waste Pickup</h2>

        {message && (
          <p className={`mb-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
        )}

        <label className="block mb-2">Select Date</label>
        <input
          type="date"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          required
        />

        <label className="block mb-2">Select Time</label>
        <input
          type="time"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          required
        />

        <label className="block mb-2">Location</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Schedule Pickup
        </button>
      </form>
    </div>
  );
};

export default SchedulePickup;