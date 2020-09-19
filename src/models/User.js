// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 30,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true, // ian kim@gmail.com trim() removes spaces
    unique: true,
    required: [true, "Please provide your email"],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  google: String,
  facebook: String,
  photo: String,
  token: String,
  tokenExp: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
// export default mongoose.model("User", userSchema);?
