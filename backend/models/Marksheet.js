import mongoose from "mongoose";

const MarksheetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNumber: { type: String, required: false },
  degree: { type: String, default: "B.E"},
  batch: { type: String, required: true },
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  gpa: { type: Number, required: true },
  marks: [
    {
      credits: { type: Number, required: true },
      subjectCode: { type: String, required: true },
      subjectTitle: { type: String, required: true },
      grade: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
});

const Marksheet = mongoose.model("Marksheet", MarksheetSchema);
export default Marksheet;
