import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  regno: { type: Number, required: true },
  grade: { type: String, required: true },
  section: { type: String, required: true },
  date: { type: String, required: true },
  absent: { type: Boolean, default: false },
});


export default mongoose.model('Attendance', AttendanceSchema);

