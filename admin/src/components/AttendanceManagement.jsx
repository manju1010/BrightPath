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

  const dummyStudents = [
    { studentRegNo: "CSE001", studentName: "John Doe", isAbsent: false },
    { studentRegNo: "CSE002", studentName: "Jane Smith", isAbsent: false },
    { studentRegNo: "CSE003", studentName: "Alice Johnson", isAbsent: false },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/students?department=${selectedDepartment}&section=${selectedSection}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setAttendanceData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setAttendanceData(dummyStudents);
        setFilteredData(dummyStudents);
      }
    };

    fetchStudents();
  }, [selectedDepartment, selectedSection]);

  const handleSearch = () => {
    const filtered = attendanceData.filter((student) =>
      student.studentRegNo.endsWith(searchQuery)
    );
    setFilteredData(filtered);
  };

  const markAbsent = async (studentRegNo) => {
    const student = attendanceData.find((s) => s.studentRegNo === studentRegNo);
    if (!student) return;

    const attendanceRecord = {
      regno: student.studentRegNo,
      grade: selectedDepartment,
      section: selectedSection,
      date: selectedDate.toISOString().split("T")[0],
      absent: true,
    };

    try {
      const response = await fetch("http://localhost:4000/api/admin/attendance-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceRecord),
      });

      if (response.ok) {
        const updatedData = attendanceData.map((s) =>
          s.studentRegNo === studentRegNo ? { ...s, isAbsent: true } : s
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
          <span className="font-medium text-gray-700">Department:</span>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Section:</span>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>

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
              <tr key={student.studentRegNo} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{student.studentRegNo}</td>
                <td className="border border-gray-300 px-4 py-2">{student.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {!student.isAbsent ? (
                    <button
                      onClick={() => markAbsent(student.studentRegNo)}
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