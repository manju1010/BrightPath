import { useState } from "react";
import axios from "axios";

const SocialMediaDetails = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/admin/upload-social-media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file. Check console for errors.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload Social Media Data (Excel)</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default SocialMediaDetails;
