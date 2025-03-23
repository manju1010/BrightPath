import StudentParent from "../models/studentParentModel.js";

export const getStudents = async (req, res) => {
  try {
    const { department, section } = req.query;

    // Create a dynamic filter object
    let filter = {};
    if (department) filter.department = department.toUpperCase();
    if (section) filter.section = section.toUpperCase();

    const students = await StudentParent.find(filter);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};
