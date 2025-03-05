import React, { useState } from "react";
import axios from "axios";
import { Loader2, Search, AlertCircle } from "lucide-react"; // Importing icons from Lucide React

const SocialMediaPredict = () => {
  const [rollNo, setRollNo] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch prediction
  const fetchPrediction = async () => {
    if (!rollNo.trim()) {
      setError("Please enter a valid roll number.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null); // Reset previous data

    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/predict-socialmedia-dropout/${rollNo}`
      );
      console.log("API Response:", response.data);
      setPrediction(response.data);
    } catch (err) {
      setError("Failed to fetch prediction. Please check the roll number and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-lg transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          📊 Social Media Dropout Prediction
        </h1>

        {/* Input Section */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Search className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" size={20} />
        </div>

        {/* Fetch Button */}
        <button
          onClick={fetchPrediction}
          className="w-full px-4 py-2 flex items-center justify-center bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Get Prediction"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-3 flex items-center text-red-500">
            <AlertCircle className="mr-2" size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm transition-all duration-500 animate-fade-in">
            <p className="font-medium text-gray-700 dark:text-white">
              🧑 Name: {prediction.studentDetails?.name || "Unknown"}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              🎓 Roll No: {prediction.studentDetails?.rollno || "N/A"}
            </p>
            <p
              className={`font-bold mt-2 ${
                Number(prediction.prediction) === 1 ? "text-red-500" : "text-green-500"
              }`}
            >
              {Number(prediction.prediction) === 1 ? "⚠️ At Risk of Dropout" : "✅ Not at Risk"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaPredict;
