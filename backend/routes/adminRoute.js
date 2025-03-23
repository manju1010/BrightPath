import express from 'express';
import multer from 'multer'; // Import multer
import { loginAdmin } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import addParent from '../controllers/parentController.js';
import { addMarks } from '../controllers/MarksController.js';
import { getStudentDetails } from '../controllers/StudentDetailsController.js';
import { predictDropout } from '../controllers/dropoutController.js';
import { predictDropoutBasedOnSocialMedia } from '../controllers/socialmediaController.js';
import { getAllStudentsPrediction } from '../controllers/academicController.js';
import { getAllStudentsRecord } from '../controllers/getAllStudentsRecord.js';
import { uploadExcel } from "../controllers/studentParentController.js";
import { getAttendance, markAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController.js';
import { uploadMarks } from '../controllers/marksControllerExcel.js';
import { getStudents } from '../controllers/fetchstudentdetails.js.js';
import { uploadExcelStudentRecord } from '../controllers/uploadController.js';
import { uploadExcelOnline } from '../controllers/uploadControllerOnline.js';
import { uploadSocialMediaData } from "../controllers/uploadSocialMediaController.js";

const upload = multer({ dest: 'uploads/' }); // Define multer upload

const adminRouter = express.Router();

// attendance routes
adminRouter.post('/attendance-post', markAttendance);
adminRouter.get('/attendance-get', getAttendance);
adminRouter.put('/attendance/:id', updateAttendance);
adminRouter.delete('/attendance/:id', deleteAttendance);
adminRouter.post("/upload-student-record", upload.single("file"), uploadExcelStudentRecord);

adminRouter.get("/students", getStudents);

// Upload routes
adminRouter.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, uploadExcel);

adminRouter.post("/upload-marks", upload.single("file"), uploadMarks);

// Public routes
adminRouter.post('/login', loginAdmin);
adminRouter.get("/predict-academic", getAllStudentsPrediction);

// Protected route
adminRouter.get('/protected', authAdmin, (req, res) => {
  res.json({ success: true, message: "Access granted to protected route." });
});

adminRouter.post('/add-parent', addParent);
adminRouter.post('/add-Marks', addMarks);

// Fetch student details route
adminRouter.get('/students', getStudentDetails);
adminRouter.get("/predict/:rollno", predictDropout);
adminRouter.get("/predict-socialmedia-dropout/:rollno", predictDropoutBasedOnSocialMedia);
adminRouter.get("/get-all-students-record", getAllStudentsRecord);

adminRouter.post("/upload", upload.single("file"), uploadExcelOnline);

// Define route for social media data upload
adminRouter.post("/upload-social-media", upload.single("file"), uploadSocialMediaData);

export default adminRouter;