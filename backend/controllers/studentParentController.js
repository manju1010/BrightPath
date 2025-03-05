import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import parentModel from "../models/parentModel.js";
 // Import new model

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve("uploads", req.file.filename);
    console.log("Processing file:", filePath);

    // Read the Excel file
    let workbook;
    try {
      workbook = xlsx.readFile(filePath);
    } catch (error) {
      return res.status(400).json({ error: "Invalid Excel file" });
    }

    const sheetName = workbook.SheetNames[0]; // Read the first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and filter data
    const validData = sheetData.filter((row) => row.parentEmail && row.studentName);
    if (validData.length === 0) {
      return res.status(400).json({ error: "No valid data found in Excel file" });
    }

    // Insert data into MongoDB
    await parentModel.insertMany(validData);

    // Delete file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("File deletion error:", err);
    });

    res.status(200).json({ message: "File uploaded and data saved successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
