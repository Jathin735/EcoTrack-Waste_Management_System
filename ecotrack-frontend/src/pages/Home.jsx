import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Home = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        setReports(response.data);
      } catch (error) {
        alert('Failed to fetch reports');
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Waste Reports</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3">Description</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-b">
                <td className="p-3">{report.description}</td>
                <td className="p-3">{report.location}</td>
                <td className={`p-3 ${report.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {report.status}
                </td>
                <td className="p-3">{new Date(report.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
