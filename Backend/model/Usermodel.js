const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr.", "Ms.", "Mrs.", "Dr."],
      default: "Mr.",
    },
    firstName: {
      type: String,
      trim: true,
      default: "Customer",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: false,
    },

    // Email-OTP auth fields
    isVerified: {
      type: Boolean,
      default: false,
    },
    authOTP: {
      type: String,
      default: null,
    },
    authOTPExpire: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isGuestCreated: {
      type: Boolean,
      default: false,
    },

    resetPasswordOTP: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);