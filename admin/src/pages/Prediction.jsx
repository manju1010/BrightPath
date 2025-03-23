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

            const response = await fetch(`http://localhost:4000/api/admin/predict/${registerNumber}`);

            if (!response.ok) {
                throw new Error("Failed to fetch predictions");
            }

            const data = await safeJsonParse(response);

            console.log("Predictions for", registerNumber, data);

            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.registerNumber === registerNumber
                        ? {
                            ...student,
                            onlineLearningPrediction: data?.prediction || "N/A",
                            overallPrediction: data?.prediction || "N/A"
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
                    const response = await fetch(`http://localhost:4000/api/admin/predict/${student.registerNumber}`);

                    if (!response.ok) {
                        throw new Error("Failed to fetch predictions");
                    }

                    const data = await safeJsonParse(response);

                    return {
                        ...student,
                        onlineLearningPrediction: data?.prediction || "N/A",
                        overallPrediction: data?.prediction || "N/A"
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
                        <th className="border p-3">Overall Prediction</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.registerNumber} className="bg-white border hover:bg-gray-100">
                            <td className="border p-3">{student.registerNumber}</td>
                            <td className="border p-3">{student.name}</td>
                            <td className="border p-3 text-center">{student.onlineLearningPrediction || "-"}</td>
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