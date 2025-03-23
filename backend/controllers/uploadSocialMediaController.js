import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import SocialMedia from "../models/socialMediaModel.js";

export const uploadSocialMediaData = async (req, res) => {
  try {
    console.log("Multer file object:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Read the file from disk
    const filePath = path.join(req.file.destination, req.file.filename);
    const fileBuffer = fs.readFileSync(filePath);

    // Read Excel file
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    console.log("Extracted Data:", jsonData);

    // Map data to match MongoDB Schema
    const socialMediaRecords = jsonData.map((row) => ({
      rollno: row["Roll No"],
      name: row["Name"],
      social_media_usage: {
        daily_usage_minutes: {
          instagram: row["Instagram Daily"] || 0,
          facebook: row["Facebook Daily"] || 0,
          twitter: row["Twitter Daily"] || 0,
          snapchat: row["Snapchat Daily"] || 0,
          linkedin: row["LinkedIn Daily"] || 0,
          other: row["Other Daily"] || 0,
        },
        weekly_usage_minutes: {
          instagram: row["Instagram Weekly"] || 0,
          facebook: row["Facebook Weekly"] || 0,
          twitter: row["Twitter Weekly"] || 0,
          snapchat: row["Snapchat Weekly"] || 0,
          linkedin: row["LinkedIn Weekly"] || 0,
          other: row["Other Weekly"] || 0,
        },
        favorite_platforms: row["Favorite Platforms"] ? row["Favorite Platforms"].split(",") : [],
        activity_breakdown: {
          messaging: row["Messaging"] || 0,
          content_scrolling: row["Content Scrolling"] || 0,
          posting: row["Posting"] || 0,
          studying: row["Studying"] || 0,
          other: row["Other Activities"] || 0,
        },
        notifications_received: {
          daily: row["Daily Notifications"] || 0,
          weekly: row["Weekly Notifications"] || 0,
        },
        average_session_duration_minutes: {
          instagram: row["Instagram Session"] || 0,
          facebook: row["Facebook Session"] || 0,
          twitter: row["Twitter Session"] || 0,
          snapchat: row["Snapchat Session"] || 0,
          linkedin: row["LinkedIn Session"] || 0,
          other: row["Other Session"] || 0,
        },
      },
      test_completion_rate: row["Test Completion Rate"] || 0,
      notifications_ignored: row["Notifications Ignored"] || 0,
      course_progress: row["Course Progress"] || 0,
      last_active: row["Last Active"] ? new Date(row["Last Active"]) : new Date(),
    }));

    // Insert into MongoDB
    await SocialMedia.insertMany(socialMediaRecords);

    return res.status(200).json({ message: "File uploaded and data stored successfully", socialMediaRecords });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ message: "Error processing file", error });
  }
};
