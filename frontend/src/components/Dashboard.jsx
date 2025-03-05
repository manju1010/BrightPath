import React, { useState, useEffect, useContext } from "react";
import { ParentContext } from "../context/ParentContext"; // Import context

const Dashboard = () => {
  const { backendUrl, pToken } = useContext(ParentContext); // Use context for URL & token
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!pToken) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/parent/student-attendance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            dtoken: pToken, // Use token from context
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        if (data.success && data.attendance) {
          const updatedData = data.attendance.map((record) => ({
            date: record.date,
            status: record.absent ? "Absent" : "Present", // Correctly map "absent" field
          }));

          setAttendanceData(updatedData);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Fetch Error:", err); // Debugging log
        setError("Error fetching attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [backendUrl, pToken]); // Runs when backendUrl or pToken changes

  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Attendance Report</h1>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((record, index) => (
              <tr key={index} className={`border-t ${record.status === "Absent" ? "bg-red-100" : ""}`}>
                <td className="px-4 py-2">{record.date}</td>
                <td className={`px-4 py-2 font-bold ${record.status === "Present" ? "text-green-500" : "text-red-500"}`}>
                  {record.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
