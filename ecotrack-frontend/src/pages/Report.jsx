import React, { useState } from 'react';
import axios from '../api/axios';

const Report = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    location: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('/reports', formDataToSend);
      setMessage(response.data.message || 'Report submitted successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Report Waste</h2>

        {message && <p className="mb-4 text-center text-gray-600">{message}</p>}

        <label className="block mb-2">Waste Type</label>
        <select name="wasteType" value={formData.wasteType} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded">
          <option value="">Select Waste Type</option>
          <option value="Plastic">Plastic</option>
          <option value="Organic">Organic</option>
          <option value="E-Waste">E-Waste</option>
        </select>

        <label className="block mb-2">Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" className="w-full p-2 mb-4 border border-gray-300 rounded" required />

        <label className="block mb-2">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the waste" className="w-full p-2 mb-4 border border-gray-300 rounded" required></textarea>

        <label className="block mb-2">Upload Image (Optional)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 mb-4 border border-gray-300 rounded" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default Report;
