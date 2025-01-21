import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AttendanceManagement from './components/AttendanceManagement';
import Login from './pages/Login';
import StudentDetails from './pages/StudentDetails';
import StudentMarks from './pages/StudentMarks';
import StudentAdmin from './pages/StudentAdmin';
import AdminPanel from './pages/AdminPanel';
import SideBar from './components/SideBar';
import Attendance from './pages/Attendance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';

const App = () => {
  const { aToken } = useContext(AdminContext);
  console.log("aToken:", aToken);

  return (
    <>
      <ToastContainer />
      {aToken ? (
        <div className="bg-[#F8F9FD]">
          {/* Authenticated Routes */}
          <Routes>
            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="/studentAdmin" element={<StudentAdmin />} />
            <Route path="/studentDetails" element={<StudentDetails />} />
            <Route path="/studentMarks" element={<StudentMarks />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="*" element={<Navigate to="/adminPanel" />} />
          </Routes>
        </div>
      ) : (
        // Non-authenticated Routes
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
