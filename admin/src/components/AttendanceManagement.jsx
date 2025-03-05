import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState("CSE");
  const [selectedSection, setSelectedSection] = useState("A");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const sampleData = [
      { id: "111622102093", name: "Rahul S", department: "CSE", section: "A", isAbsent: false },
      { id: "111622102094", name: "Harry Potter", department: "ECE", section: "B", isAbsent: false },
      { id: "111622102095", name: "John C", department: "CSE", section: "A", isAbsent: false },
      { id: "12345", name: "John C", department: "CSE", section: "A", isAbsent: false },
    ];
    setAttendanceData(sampleData);
    setFilteredData(sampleData);
  }, []);

  const handleSearch = () => {
    const filtered = attendanceData.filter(
      (student) =>
        student.department === selectedDepartment &&
        student.section === selectedSection &&
        student.id.endsWith(searchQuery)
    );
    setFilteredData(filtered);
  };

  const markAbsent = async (studentId) => {
    const student = attendanceData.find((s) => s.id === studentId);
    if (!student) return;

    const attendanceRecord = {
      regno: student.id,
      grade: student.department,
      section: student.section,
      date: selectedDate.toISOString().split("T")[0],
      absent: true,
    };
    console.log(attendanceRecord);

    try {
      console.log(attendanceRecord);
      const response = await fetch("http://localhost:4000/api/admin/attendance-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceRecord),
      });

      if (response.ok) {
        const updatedData = attendanceData.map((s) =>
          s.id === studentId ? { ...s, isAbsent: true } : s
        );
        setAttendanceData(updatedData);
        setFilteredData(updatedData);
      } else {
        console.error("Failed to post attendance record");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Attendance Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Search Student:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter last 3 digits"
            className="border border-gray-300 rounded px-2 py-1"
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full text-center text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-6 py-2">Name</th>
              <th className="border border-gray-300 px-6 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {!student.isAbsent ? (
                    <button
                      onClick={() => markAbsent(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Mark Absent
                    </button>
                  ) : (
                    <span className="text-green-500 font-bold">✔ Recorded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManagement;
