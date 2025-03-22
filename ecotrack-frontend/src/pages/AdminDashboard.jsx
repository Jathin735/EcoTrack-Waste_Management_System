import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsResponse = await axios.get('/admin/reports');
        const pickupsResponse = await axios.get('/admin/pickups');
        setReports(reportsResponse.data);
        setPickups(pickupsResponse.data);
      } catch (error) {
        alert('Failed to load admin data');
      }
    };
    fetchData();
  }, []);

  const updateReportStatus = async (id, status) => {
    try {
      await axios.put(`/admin/reports/${id}`, { status });
      setReports((prev) => prev.map((report) =>
        report._id === id ? { ...report, status } : report
      ));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <h3 className="text-xl mb-4">Waste Reports</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Description</th>
            <th className="p-3">Location</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="border-b">
              <td className="p-3">{report.description}</td>
              <td className="p-3">{report.location}</td>
              <td className="p-3">{report.status}</td>
              <td className="p-3">
                {report.status !== 'Resolved' && (
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() => updateReportStatus(report._id, 'Resolved')}
                  >
                    Mark as Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl mt-8 mb-4">Scheduled Pickups</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Location</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {pickups.map((pickup) => (
            <tr key={pickup._id} className="border-b">
              <td className="p-3">{pickup.location}</td>
              <td className="p-3">{pickup.pickupDate}</td>
              <td className="p-3">{pickup.pickupTime}</td>
              <td className={`p-3 ${pickup.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                {pickup.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
