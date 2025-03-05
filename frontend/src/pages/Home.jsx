import React, { useEffect, useState, useContext } from "react";
import profile_pic from "../assets/assets_frontend/profile_pic.png";
import { ParentContext } from "../context/ParentContext"; // Import context

const Home = () => {
  const { backendUrl, pToken } = useContext(ParentContext); // Use context for URL & token
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!pToken) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`${backendUrl}/parent/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            dtoken: pToken, // Use token from context
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch details");
        }

        setDetails(data.details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [backendUrl, pToken]); // Re-run if token or backend URL changes

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-primary rounded-lg px-6 md:px-10 lg:px-20 text-white p-5">
      <div className="flex flex-row items-center gap-6">
        {/* Profile Picture */}
        <div>
          <img className="rounded-full w-50 h-50" src={profile_pic} alt="Profile" />
        </div>

        {/* Parent & Student Details */}
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-medium leading-tight">{details.studentName}</p>
          <div className="flex flex-row gap-4">
            <p><span className="font-medium">Parent Email:</span> {details.parentEmail}</p>
            <p><span className="font-medium">Student Reg No:</span> {details.studentRegNo}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p><span className="font-medium">Department:</span> {details.department}</p>
            <p><span className="font-medium">Section:</span> {details.section}</p>
          </div>
          <p><span className="font-medium">Father's Name:</span> {details.fatherName}</p>
          <p><span className="font-medium">Mother's Name:</span> {details.motherName}</p>
          <div className="flex flex-row gap-4">
            <p><span className="font-medium">Student Contact:</span> {details.studentNumber}</p>
            <p><span className="font-medium">Parent Contact:</span> {details.parentNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
