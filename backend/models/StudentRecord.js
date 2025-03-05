import mongoose from "mongoose";

const studentRecordSchema = new mongoose.Schema({
    registerNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const StudentRecord = mongoose.model("StudentRecord", studentRecordSchema);

export default StudentRecord;
