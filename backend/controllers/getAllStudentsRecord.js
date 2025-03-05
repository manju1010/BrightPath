import StudentRecord from "../models/StudentRecord.js";

// Controller to get all student records
export const getAllStudentsRecord = async (req, res) => {
    try {
        const students = await StudentRecord.find({});
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student records", error: error.message });
    }
};
