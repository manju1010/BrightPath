import parentModel from "../models/parentModel.js";
import Attendance from "../models/Attendance.js";

export const getStudentAttendance = async (req, res) => {
  try {
    console.log("Incoming request to getStudentAttendance...");
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);
    console.log("Request Headers:", req.headers);

    // Extract parentEmail (from body, query, or headers)
    const parentEmail = req.body.parentEmail || req.query.parentEmail || req.headers.parentemail;

    if (!parentEmail) {
      console.log("Parent email missing");
      return res.status(400).json({ success: false, message: "Parent email is missing" });
    }

    // Fetch parent's details
    const parentDetails = await parentModel.findOne({ parentEmail });

    if (!parentDetails) {
        console.log("No parent found with this email!");
    } else {
        console.log("Parent Details:", parentDetails);
        console.log("Extracted Student Registration Number else:", parentDetails.studentRegNo);
    }
    

    if (!parentDetails) {
      console.log("Parent not found");
      return res.status(404).json({ success: false, message: "Parent not found" });
    }

    // Extract student's regno
    const studentRegNo = parentDetails.studentRegNo;
    console.log("Extracted Student Registration Number 37:", studentRegNo);
//     console.log("Parent Details:", parentDetails);
// console.log("Extracted Student Registration Number:", parentDetails?.studentRegNo);


    if (!studentRegNo) {
      console.log("Student registration number missing");
      return res.status(404).json({ success: false, message: "Student registration number not found" });
    }

    // Fetch attendance records
    const attendanceRecords = await Attendance.find({ regno: studentRegNo });
    console.log("Fetched Attendance Records:", attendanceRecords);

    // Send response
    res.json({ success: true, attendance: attendanceRecords });

  } catch (error) {
    console.error("Error fetching student attendance:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default getStudentAttendance;
