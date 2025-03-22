import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const ReportWaste = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !location || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    try {
      await axios.post('/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Waste report submitted successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit report');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Report Waste Accumulation</h2>

        <label className="block mb-2">Description</label>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Describe the waste issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="block mb-2">Location</label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label className="block mb-2">Upload Waste Image</label>
        <div
          {...getRootProps()}
          className={`w-full p-4 border-2 border-dashed rounded mb-4 cursor-pointer ${
            isDragActive ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {image ? (
            <p>📸 {image.name}</p>
          ) : isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportWaste;
