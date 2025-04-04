import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>🌎 EcoTrack - Smart Waste Management System</p>
        <p>&copy; {new Date().getFullYear()} EcoTrack. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
