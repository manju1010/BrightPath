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
import DropoutPrediction from './components/DroupoutPrediction';
import SocialMediaPredict from './pages/SocialMediaPredict';
import Academic from './pages/Academic';
import StudentPrediction from './pages/StudentPrediction';
import Prediction from './pages/Prediction';
import { FaFileUpload } from 'react-icons/fa';
import FileUpload from './components/FileUpload';
import AddButton from './pages/AddButton';
import MarkExcelUpload from './pages/MarkExcelUpload';

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
            <Route path="/add-button" element={<AddButton />} />
            <Route path="/studentAdmin" element={<StudentAdmin />} />
            <Route path="/studentDetails" element={<StudentDetails />} />
            <Route path="/studentMarks" element={<StudentMarks />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/dropout-prediction" element={<DropoutPrediction />} />
            <Route path='/social-media-predict' element={<SocialMediaPredict /> } />
            <Route path='/academic-predict' element={<Academic /> } />
            <Route path='/student-predict' element={<StudentPrediction /> } />
            <Route path='/student-all-prediction' element={<Prediction /> } />
            <Route path='/upload-excel-file' element={<FileUpload /> } />
            <Route path='/upload-mark-excel-file' element={<MarkExcelUpload /> } />
           
          
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
