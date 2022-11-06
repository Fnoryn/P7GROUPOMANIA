const multer = require("multer");
const path = require("path");

function uploader(allowed_file_types, max_file_size) {
  // File upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/images`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, filename + fileExt);
    },
  });
  //   prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb("file mimetype error");
      }
    },
  });
  return upload;
}

module.exports = uploader;
