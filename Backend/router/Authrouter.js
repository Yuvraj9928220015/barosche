const express = require("express");
const router = express.Router();
const {
  requestOTP,
  verifyLoginOTP,
  resendAuthOTP,
  getMe,
  logoutUser,
} = require("../controller/authcontroller");
const { protect } = require("../middleware/Authmiddleware");

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyLoginOTP);
router.post("/resend-otp", resendAuthOTP);
router.post("/logout", logoutUser);

router.get("/me", protect, getMe);

module.exports = router;