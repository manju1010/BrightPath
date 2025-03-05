import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const StudentMarks = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">SEMESTER RESULTS</h1>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[...Array(8)].map((_, index) => (
            <NavLink
              key={index + 1}
              to={`/semester-${1}`}
              className="block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              SEMESTER {index + 1}
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">IAT RESULTS</h1>
        <ul className="flex flex-wrap justify-center gap-4">
          {[1, 2].map((num) => (
            <NavLink
              key={num}
              to={`/iat-${num}`}
              className="block py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              IAT {num}
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">UNIT TEST RESULTS</h1>
        <ul className="flex flex-wrap justify-center gap-4">
          <NavLink
            to="/"
            className="block py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            UNIT 1
          </NavLink>
          <NavLink
            to="/attendence"
            className="block py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            UNIT 2
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default StudentMarks;



