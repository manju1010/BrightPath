import StudentParent from "../models/studentParentModel.js";

export const getStudents = async (req, res) => {
  try {
    const { department, section } = req.query;
    
    const students = await StudentParent.find({ department, section }).select(
      "studentRegNo studentName department section"
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};
