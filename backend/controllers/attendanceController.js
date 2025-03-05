import Attendance from '../models/Attendance.js';

// Add a new attendance record
export const markAttendance = async (req, res) => {
  try {
    console.log("📌 Request Body:", req.body); // Debugging log

    const { regno, grade, section, date, absent } = req.body;

    if (!regno || !grade || !section || !date || absent === undefined) {
      console.log("❌ Missing Fields:", req.body);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAttendance = new Attendance({
      regno,
      grade,
      section,
      date,
      absent,
    });

    await newAttendance.save();
    console.log("✅ Attendance saved successfully!", newAttendance);

    res.status(201).json({ message: 'Attendance recorded successfully', data: newAttendance });
  } catch (error) {
    console.log("❌ Error saving attendance:", error.message);
    res.status(500).json({ message: 'Error saving attendance', error: error.message });
  }
};

// Get all attendance records
export const getAttendance = async (req, res) => {
  try {
    console.log("📌 Fetching attendance records...");

    const attendanceRecords = await Attendance.find();
    console.log("✅ Attendance records retrieved:", attendanceRecords);

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.log("❌ Error retrieving attendance:", error.message);
    res.status(500).json({ message: 'Error retrieving attendance data', error: error.message });
  }
};

// Update attendance status
export const updateAttendance = async (req, res) => {
  try {
    console.log("📌 Update Request Body:", req.body);

    const { id } = req.params;
    const { absent } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { absent },
      { new: true }
    );

    if (!updatedAttendance) {
      console.log("❌ Attendance record not found:", id);
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    console.log("✅ Attendance updated successfully!", updatedAttendance);

    res.status(200).json({ message: 'Attendance updated successfully', data: updatedAttendance });
  } catch (error) {
    console.log("❌ Error updating attendance:", error.message);
    res.status(500).json({ message: 'Error updating attendance', error: error.message });
  }
};

// Delete an attendance record
export const deleteAttendance = async (req, res) => {
  try {
    console.log("📌 Delete Request ID:", req.params.id);

    const { id } = req.params;

    const deletedRecord = await Attendance.findByIdAndDelete(id);
    if (!deletedRecord) {
      console.log("❌ Record not found:", id);
      return res.status(404).json({ message: 'Record not found' });
    }

    console.log("✅ Attendance record deleted successfully!");

    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.log("❌ Error deleting record:", error.message);
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
};
