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
      { id: "111622102069", name: "Keerthana A", department: "CSE", section: "A", isAbsent: false },
    ];

    fetchStudents(sampleData);
  }, [selectedDepartment, selectedSection]);

  const fetchStudents = async (sampleData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/students?department=${selectedDepartment}&section=${selectedSection}`
      );

      if (!response.ok) throw new Error("Failed to fetch students");

      const apiData = await response.json();
      const formattedData = apiData.map((student) => ({
        id: student.studentRegNo,
        name: student.studentName,
        department: student.department,
        section: student.section,
        isAbsent: false,
      }));

      const mergedData = [...formattedData, ...sampleData];
      setAttendanceData(mergedData);
      setFilteredData(mergedData);
    } catch (error) {
      console.error("Error fetching students:", error);
      setAttendanceData(sampleData); // Fallback to sample data if API fails
      setFilteredData(sampleData);
    }
  };

  const handleSearch = () => {
    const filtered = attendanceData.filter((student) =>
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

    try {
      const response = await fetch("http://localhost:4000/api/admin/attendance-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        <div>
          <label className="font-medium text-gray-700">Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          >
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by last 3 digits"
          className="border border-gray-300 rounded px-2 py-1 w-64"
        />
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
