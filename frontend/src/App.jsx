import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Mark from './pages/Mark';
import Attedence from './pages/Attedence';

import Login from './pages/Login';
import userData from "./data/data"; // Ensure only one import for userData
import SemesterResult from './pages/SemesterResult';
import Announcement from './pages/Announcement';
import Feedback from './pages/Feedback';
import { ParentContext } from './context/ParentContext';
import StudentMarks from './components/StudentMarks';
import Semester1 from './results/Semester1';

const App = () => {
  const { pToken } = useContext(ParentContext); // Context for authentication
  console.log("pToken:", pToken);

  return (
    <>
    
    
      {pToken ? (
        // Authenticated Routes
        <div className=" mx-4 sm:mx-[10%]">
          <Navbar />
          <div>
          <Routes>
            <Route path="/home" element={<Home user={userData} />} />
            <Route path="/mark" element={<Mark />} />
            <Route path="/attendence" element={<Attedence />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/semesterResult" element={<SemesterResult />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/student-marks" element={<StudentMarks />} />
            <Route path="/semester-1" element={<Semester1 />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          </div>
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
