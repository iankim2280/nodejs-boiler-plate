import { Schema, mongoose } from "mongoose";

const userSchema = Schema({
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

const User = model("User", userSchema);
export default User;
