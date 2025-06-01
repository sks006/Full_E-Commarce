/** @format */

const { Router } = require("express");
const router = Router();
const multer = require("multer");
const formParser = multer().none();
const {
     loginUser,
     registerUser,
     refreshToken,
     updatePassword,
     logout,
} = require("../controller/userController");
const { verifyJwt } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login",formParser, loginUser);
router.post("/refresh_token",verifyJwt, refreshToken);
router.post("/update",verifyJwt, updatePassword); 
router.post("/logout",verifyJwt,logout)// Assuming logout is handled by updating the password

module.exports = router;
