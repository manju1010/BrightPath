import xlsx from "xlsx";
import fs from "fs";
import Marksheet from "../models/Marksheet.js";

export const uploadMarks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Read the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Process student records
    let marksData = data.map((row, index) => {
      if (!row["regNumber"]) {
        console.log(`❌ Missing register number at row ${index + 2}:`, row);
        return null; // Skip if regNumber is missing
      }

      return {
        name: row["Name"],
        regNumber: row["regNumber"],
        degree: row["Degree"] || "B.E",
        batch: row["Batch"],
        semester: row["Semester"],
        cgpa: row["CGPA"],
        gpa: row["GPA"],
        marks: [
          {
            credits: row["Credit"],
            subjectCode: row["Subject Code"],
            subjectTitle: row["Subject Title"],
            grade: row["Grade"],
            status: row["status"],
          },
        ],
      };
    }).filter(entry => entry !== null); // Remove null entries

    console.log("✅ Final marks data to insert:", marksData);

    // Insert all records without deleting previous ones
    await Marksheet.insertMany(marksData);

    // Delete file after processing
    fs.unlinkSync(req.file.path);

    res.json({ message: "File uploaded and data saved successfully!" });
  } catch (error) {
    console.error("❌ Error processing file:", error);
    res.status(500).json({ message: "Server error." });
  }
};
