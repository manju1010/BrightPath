import React, { useState } from "react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🎓 Student Semester Results",
      message: "Your semester results have been published. Check the portal for details.",
      time: "Posted: 2 hours ago",
      borderColor: "border-blue-500",
    },
    {
      id: 2,
      title: "🎭 Cultural Fest Announcement",
      message: "Join us for the annual cultural festival on April 15th. Register now!",
      time: "Posted: 1 day ago",
      borderColor: "border-yellow-500",
    },
    {
      id: 3,
      title: "💼 Placement Drive Alert",
      message: "Top MNCs are visiting the campus for placements. Apply before March 30.",
      time: "Posted: 3 days ago",
      borderColor: "border-green-500",
    },
  ]);

  const [newNotification, setNewNotification] = useState("");

  const handleAddNotification = () => {
    if (newNotification.trim() === "") return;
    const newEntry = {
      id: notifications.length + 1,
      title: "📢 New Notification",
      message: newNotification,
      time: "Just now",
      borderColor: "border-gray-500",
    };
    setNotifications([newEntry, ...notifications]);
    setNewNotification("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      
      <div className="w-3/5 flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter notification message"
          className="flex-1 p-2 border rounded"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
        />
        <button
          onClick={handleAddNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      
      <div className="w-3/5 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 border-l-4 ${notification.borderColor} rounded shadow`}
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-gray-600">{notification.message}</p>
            <div className="text-sm text-gray-500 mt-2">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
