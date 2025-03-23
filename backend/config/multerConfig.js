import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("spreadsheetml")) {
      return cb(new Error("Only Excel files are allowed!"), false);
    }
    cb(null, true);
  },
});

export { upload };
