import React, { useState } from "react";
import axios from "axios";

const RollNumber = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/upload-student-record", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error uploading file.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Upload Excel File</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default RollNumber;
