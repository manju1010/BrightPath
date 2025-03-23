// import { upload } from "../middleware/multerConfig.js";
// import { processExcel } from "../controllers/processExcel.js";
// import SocialMedia from "../models/SocialMedia.js";

// const uploadExcelsocial = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     console.log("📂 File Received:", req.file.originalname);
//     console.log("📏 File Size:", req.file.size);
//     console.log("📄 File Type:", req.file.mimetype);
//     console.log("🔍 Buffer Length:", req.file.buffer.length);

//     if (!req.file.buffer || req.file.buffer.length === 0) {
//       return res.status(400).json({ message: "Uploaded file is empty" });
//     }

//     await processExcel(req.file.buffer);

//     res.status(200).json({ message: "File uploaded and data saved successfully!" });
//   } catch (error) {
//     console.error("❌ Error processing file:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// export {uploadExcelSocial };
