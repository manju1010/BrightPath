import React, { useState, useEffect } from "react";

const PredictionTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:4000/api/admin/get-all-students-record");
            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }
            const data = await response.json();
            setStudents(data.students);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const safeJsonParse = async (response) => {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (error) {
            return null;
        }
    };

    const fetchPredictions = async (registerNumber) => {
        setLoading(true);
        setError(null);
        try {
            console.log(`Fetching predictions for: ${registerNumber}`);

            const [onlineResponse, socialMediaResponse, thirdResponse] = await Promise.all([
                fetch(`http://localhost:4000/api/admin/predict/${registerNumber}`),
                fetch(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${registerNumber}`),
                fetch(`http://localhost:4000/api/admin/predict/${registerNumber}`)
            ]);

            if (!onlineResponse.ok) {
                throw new Error("Failed to fetch one or more predictions");
            }

            const onlineData = await safeJsonParse(onlineResponse);
            const socialMediaData = await safeJsonParse(socialMediaResponse);
            const thirdData = await safeJsonParse(thirdResponse);

            console.log("Predictions for", registerNumber, {
                online: onlineData,
                socialMedia: socialMediaData,
                third: thirdData
            });

            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.registerNumber === registerNumber
                        ? {
                            ...student,
                            onlineLearningPrediction: onlineData?.prediction || "N/A",
                            socialMediaPrediction: socialMediaData?.prediction || "N/A",
                            thirdPrediction: thirdData?.prediction || "N/A",
                            overallPrediction: onlineData?.prediction || socialMediaData?.prediction || thirdData?.prediction || "N/A"
                        }
                        : student
                )
            );
            
        } catch (err) {
            setError(err.message);
            console.error("Error fetching predictions:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllPredictions = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching predictions for all students...");
            const updatedStudents = await Promise.all(
                students.map(async (student) => {
                    console.log(`Fetching for student: ${student.registerNumber}`);
                    const [onlineResponse, socialMediaResponse, thirdResponse] = await Promise.all([
                        fetch(`http://localhost:4000/api/admin/predict/${student.registerNumber}`),
                        fetch(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${student.registerNumber}`),
                        fetch(`http://localhost:4000/api/admin/predict/${student.registerNumber}`),
                    ]);

                    if (!onlineResponse.ok) {
                        throw new Error("Failed to fetch one or more predictions");
                    }

                    const onlineData = await safeJsonParse(onlineResponse);
                    const socialMediaData = await safeJsonParse(socialMediaResponse);
                    const thirdData = await safeJsonParse(thirdResponse);

                    return {
                        ...student,
                        onlineLearningPrediction: onlineData?.prediction || "N/A",
                        socialMediaPrediction: socialMediaData?.prediction || "N/A",
                        thirdPrediction: thirdData?.prediction || "N/A",
                        overallPrediction: onlineData?.prediction || socialMediaData?.prediction || thirdData?.prediction || "N/A"
                    };
                })
            );

            setStudents(updatedStudents);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching all predictions:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Student Predictions</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
                onClick={fetchAllPredictions}
                disabled={loading}
            >
                {loading ? "Fetching Predictions..." : "Get Predictions for All Students"}
            </button>
            <table className="w-full border-collapse border border-gray-300 mt-4 shadow-md">
                <thead>
                    <tr className="bg-primary text-white leading-tight">
                        <th className="border p-3">Register Number</th>
                        <th className="border p-3">Student Name</th>
                        <th className="border p-3">Online Learning Prediction</th>
                        <th className="border p-3">Social Media Dropout Prediction</th>
                        <th className="border p-3">Online prediction</th>
                        <th className="border p-3">Overall Prediction</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.registerNumber} className="bg-white border hover:bg-gray-100">
                            <td className="border p-3">{student.registerNumber}</td>
                            <td className="border p-3">{student.name}</td>
<td className="border p-3 text-center">
    <span
        className={`px-4 py-1 text-sm font-semibold text-white rounded-full shadow-md ${
            student.onlineLearningPrediction === 'Not at Risk'
                ? "bg-green-500"
                : student.onlineLearningPrediction === 'At Risk'
                ? "bg-red-500"
                : student.onlineLearningPrediction === '-'
                ? "bg-gray-400"
                : "bg-green-500"
        }`}
    >
        {student.onlineLearningPrediction}
    </span>

    {student.onlineLearningPrediction === 'Not at Risk' && (
        <div>
            <ul className="list-disc ml-4">
                <li>GPA is greater than  6.0, Attendance is greater than  60%, Study Hoursis greater than   5</li>
            </ul>
        </div>
    )}

    {student.onlineLearningPrediction === 'At Risk' && (
        <div>
            <ul className="list-disc ml-4">
                <li>GPA &gt; 6.0, Attendance &ge; 60%, Study Hours &gt; 5</li>
            </ul>
        </div>
    )}
</td>
 <td className="border p-3 text-center">
 <div
    className={`px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md ${
        student.socialMediaPrediction === '0'
            ? "bg-green-500"
            : student.socialMediaPrediction === '1'
            ? "bg-red-500"
            : "bg-gray-400"
    }`}
>
    {student.socialMediaPrediction === '0' ? (
        <div>
            <p className="font-bold">Average Session Duration (Minutes):</p>
            <ul className="list-disc ml-4">
                <li>Instagram: 30 (Moderate Risk, 30-80)</li>
                <li>Facebook: 20 (Low Risk, &lt; 30)</li>
                <li>Twitter: 25 (Low Risk, &lt; 30)</li>
                <li>Snapchat: 15 (Low Risk, &lt; 30)</li>
                <li>LinkedIn: 12 (Low Risk, &lt; 30)</li>
                <li>Other: 10 (Low Risk, &lt; 30)</li>
            </ul>
        </div>
    ) : student.socialMediaPrediction === '1' ? (
        <div>
            <p className="font-bold">Activity Breakdown:</p>
            <ul className="list-disc ml-4">
                <li>Messaging: 450 (High Risk, &gt; 80)</li>
                <li>Content Scrolling: 900 (High Risk, &gt; 80)</li>
                <li>Posting: 150 (Moderate Risk, 30-80)</li>
                <li>Studying: 250 (Moderate Risk, 30-80)</li>
                <li>Other: 75 (Moderate Risk, 30-80)</li>
            </ul>
        </div>
    ) : (
        "Unknown"
    )}
</div>

</td>



                            <td className="border p-3 text-center">{student.thirdPrediction || "-"}</td>
                            <td className="border p-3 text-center">{student.overallPrediction || "-"}</td>
                            <td className="border p-3 text-center">
                                <button
                                    className="px-4 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                                    onClick={() => fetchPredictions(student.registerNumber)}
                                    disabled={loading}
                                >
                                    {loading ? "Fetching..." : "Get Predictions"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PredictionTable;
