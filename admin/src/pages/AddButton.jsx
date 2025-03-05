import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();

  return (
    
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-gray-300 rounded-xl p-8 shadow-lg text-center bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Student Details Upload
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/studentDetails")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700"
          >
            Manual
          </button>

          <button
            onClick={() => navigate("/upload-excel-file")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105 hover:bg-green-700"
          >
            Automatic Excel-file Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
