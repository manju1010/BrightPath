import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import addParent from '../controllers/parentController.js';
import { addMarks } from '../controllers/MarksController.js';
import { getStudentDetails } from '../controllers/StudentDetailsController.js';
import { predictDropout } from '../controllers/dropoutController.js';
import { predictDropoutBasedOnSocialMedia } from '../controllers/socialmediaController.js';
import { getAllStudentsPrediction } from '../controllers/academicController.js';
import { getAllStudentsRecord } from '../controllers/getAllStudentsRecord.js';


import upload from "../middlewares/multer.js"; // Updated Multer path
import { uploadExcel } from "../controllers/studentParentController.js";
import { getAttendance, markAttendance,updateAttendance ,deleteAttendance } from '../controllers/attendanceController.js';
import { uploadMarks } from '../controllers/marksControllerExcel.js';
import { getStudents } from '../controllers/fetchstudentdetails.js.js';

const adminRouter = express.Router();

// attendance routes

adminRouter.post('/attendance-post', markAttendance);
adminRouter.get('/attendance-get', getAttendance);
adminRouter.put('/attendance/:id', updateAttendance);
adminRouter.delete('/attendance/:id', deleteAttendance);


adminRouter.get("/students", getStudents);



// adminRouter.post("/upload", upload.single("file"), uploadExcel);



adminRouter.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, uploadExcel);


adminRouter.post("/upload-marks", upload.single("file"), uploadMarks);


// Public routea
adminRouter.post('/login', loginAdmin);
adminRouter.get("/predict-academic", getAllStudentsPrediction);

// Protected route
adminRouter.get('/protected', authAdmin, (req, res) => {
  res.json({ success: true, message: "Access granted to protected route." });
});

adminRouter.post('/add-parent',addParent)
adminRouter.post('/add-Marks',addMarks)

// Fetch student details route
adminRouter.get('/students', getStudentDetails);
adminRouter.get("/predict/:rollno", predictDropout);
// Add the new route for predicting dropout based on social media data
adminRouter.get("/predict-socialmedia-dropout/:rollno", predictDropoutBasedOnSocialMedia)

adminRouter.get("/get-all-students-record", getAllStudentsRecord)

export default adminRouter;