import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Only .xlsx files are allowed!");
      setFile(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message || "File uploaded successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4">Upload Excel File</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept=".xlsx" 
        className="mb-4 p-2 border cursor-pointer file:border-none file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:mr-2"
      />
      <button 
        onClick={handleUpload} 
        disabled={uploading} 
        className={`px-4 py-2 rounded transition-all duration-200 ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {message && <p className={`mt-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
    </div>
  );
};

export default FileUpload;
