import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import StudentRecord from "../models/StudentRecord.js";


export const uploadExcelStudentRecord = async (req, res) => {
    try {
        console.log("Multer file object:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Read the file from disk
        const filePath = path.join(req.file.destination, req.file.filename);
        const fileBuffer = fs.readFileSync(filePath);

        // Process the Excel file
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        console.log("Extracted Data:", jsonData);

        // Store data in MongoDB
        const studentRecords = jsonData.map((row) => ({
            registerNumber: row["registerNumber"], // Make sure column names match Excel headers
            name: row["name"],
        }));

        // Insert into MongoDB
        await StudentRecord.insertMany(studentRecords);

        return res.status(200).json({ message: "File uploaded and data stored successfully", studentRecords });
    } catch (error) {
        console.error("Error processing file:", error);
        return res.status(500).json({ message: "Error processing file", error });
    }
};
