import mongoose from "mongoose";

const studentParentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentEmail: { type: String, required: true, unique: true },
  parentPassword: { type: String, required: true },
  studentRegNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  section: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  studentNumber: { type: String, required: true },
  parentNumber: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
});

const StudentParent = mongoose.model("StudentParent", studentParentSchema);
export default StudentParent;
