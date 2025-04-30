/** @format */

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          const dir = path.join(__dirname, "../uploads");
          if (!fs.existsSync(dir)) {
               fs.mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
     },
     filename: function (req, file, cb) {
          const uniqueSuffix =
               Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(
               null,
               file.fieldname +
                    "-" +
                    uniqueSuffix +
                    path.extname(file.originalname),
          );
     },
});

const fileFilter = (req, file, cb) => {
     const allowedTypes = /jpeg|jpg|png/;
     const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase(),
     );
     const mimetype = allowedTypes.test(file.mimetype);

     if (extname && mimetype) {
          cb(null, true);
     } else {
          cb(new Error("Only jpeg, jpg and png files are allowed!"), false);
     }
};

const upload = multer({
     storage: storage,
     limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB limit
     fileFilter: fileFilter,
});

module.exports = { upload };
