import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('newReport', (data) => {
      setNotifications((prev) => [...prev, `📢 ${data.message}`]);
    });

    socket.on('newPickup', (data) => {
      setNotifications((prev) => [...prev, `🚛 ${data.message}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 w-80">
      {notifications.map((notification, index) => (
        <div key={index} className="bg-green-500 text-white p-3 my-2 rounded shadow">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default Notification;
