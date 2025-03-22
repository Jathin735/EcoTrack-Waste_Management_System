import React from 'react';
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import SchedulePickup from './pages/SchedulePickup';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <Notification />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report-waste" element={<Report />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule-pickup" element={<SchedulePickup />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
