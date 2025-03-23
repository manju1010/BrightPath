import { useState } from "react";
import axios from "axios";

const OnlineLearningDetails = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/admin/upload-online", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus(response.data.message);
    } catch (error) {
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Upload Student Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default OnlineLearningDetails;
