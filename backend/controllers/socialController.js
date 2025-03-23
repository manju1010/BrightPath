import express from "express";
import mongoose from "mongoose";
import SocialMedia from "../models/socialMediaModel.js"; // Ensure correct path
import multer from "multer";
import * as XLSX from "xlsx";

const router = express.Router();

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });

// API Route for Uploading Excel File
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Read Excel File
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Process and Save Data in MongoDB
    const processedData = jsonData.map((row) => ({
      rollno: row.RollNo || "",
      name: row.Name || "",
      social_media_usage: {
        daily_usage_minutes: {
          instagram: row.InstagramDaily || 0,
          facebook: row.FacebookDaily || 0,
          twitter: row.TwitterDaily || 0,
          snapchat: row.SnapchatDaily || 0,
          linkedin: row.LinkedinDaily || 0,
          other: row.OtherDaily || 0,
        },
        weekly_usage_minutes: {
          instagram: row.InstagramWeekly || 0,
          facebook: row.FacebookWeekly || 0,
          twitter: row.TwitterWeekly || 0,
          snapchat: row.SnapchatWeekly || 0,
          linkedin: row.LinkedinWeekly || 0,
          other: row.OtherWeekly || 0,
        },
        favorite_platforms: row.FavoritePlatforms
          ? row.FavoritePlatforms.split(",")
          : [],
        activity_breakdown: {
          messaging: row.Messaging || 0,
          content_scrolling: row.ContentScrolling || 0,
          posting: row.Posting || 0,
          studying: row.Studying || 0,
          other: row.OtherActivity || 0,
        },
        notifications_received: {
          daily: row.NotificationsDaily || 0,
          weekly: row.NotificationsWeekly || 0,
        },
        average_session_duration_minutes: {
          instagram: row.InstagramSession || 0,
          facebook: row.FacebookSession || 0,
          twitter: row.TwitterSession || 0,
          snapchat: row.SnapchatSession || 0,
          linkedin: row.LinkedinSession || 0,
          other: row.OtherSession || 0,
        },
      },
      test_completion_rate: row.TestCompletion || 0,
      notifications_ignored: row.NotificationsIgnored || 0,
      course_progress: row.CourseProgress || 0,
      last_active: row.LastActive ? new Date(row.LastActive) : Date.now(),
    }));

    await SocialMedia.insertMany(processedData);
    res.status(200).json({ message: "Data uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
