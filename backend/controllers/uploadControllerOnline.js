import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import Student from "../models/studentModel.js";

export const uploadExcelOnline = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const record of data) {
      await Student.create({
        rollno: record.RollNo,
        name: record.Name,
        login_activity: record.LoginActivity || {},
        test_completion_rate: record.TestCompletionRate || 0,
        time_spent: record.TimeSpent || {},
        performance: record.Performance || {},
        activity_participation: record.ActivityParticipation || {},
        notifications_ignored: record.NotificationsIgnored || 0,
        course_progress: record.CourseProgress || 0,
      });
    }

    fs.unlinkSync(filePath); // Remove the uploaded file after processing

    res.json({ message: "File uploaded and data inserted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
};
