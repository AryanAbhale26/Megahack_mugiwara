const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["admin", "vendor", "user"],
      default: "user",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON type
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: function () {
          return this.role === "user";
        },
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // Geospatial Index

const User = mongoose.model("User", userSchema);
module.exports = { User };
