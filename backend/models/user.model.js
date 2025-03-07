const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role_id: {
      type: Number,
      enum: [1,2,3], // admin, user, farmer
      default: 2,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = { User };
