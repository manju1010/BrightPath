import React, { useEffect, useState } from "react";

const StudentPredictions = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [predictions, setPredictions] = useState({});

    useEffect(() => {
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

                // Fetch predictions for each student
                const studentPredictions = {};
                await Promise.all(
                    data.students.map(async (student) => {
                        const predictionResponse = await fetch(
                            `http://localhost:4000/api/admin/predict/${student.registerNumber}`
                        );
                        if (predictionResponse.ok) {
                            const predictionData = await predictionResponse.json();
                            studentPredictions[student.registerNumber] = predictionData.onlineLearningPrediction;
                        }
                    })
                );

                setPredictions(studentPredictions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p className="text-blue-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!students.length) return <p className="text-gray-500">No students available</p>;

    return (
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Register Number</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Student Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Online Learning Prediction</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.registerNumber} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                            {student.registerNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                            {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                            <span
                                className={`font-semibold ${
                                    predictions[student.registerNumber] === "At Risk"
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                {predictions[student.registerNumber] || "Fetching..."}
                            </span>

                            {predictions[student.registerNumber] === "Not at Risk" && (
                                <div>
                                    <ul className="list-disc ml-4">
                                        <li>GPA &gt; 6.0, Attendance &gt; 60%, Study Hours &gt; 5</li>
                                    </ul>
                                </div>
                            )}

                            {predictions[student.registerNumber] === "At Risk" && (
                                <div>
                                    <ul className="list-disc ml-4">
                                        <li>GPA &lt; 6.0, Attendance &le; 60%, Study Hours &lt; 5</li>
                                    </ul>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StudentPredictions;
