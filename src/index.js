import express from "express";
import dotenv from "dotenv";
// import middleWares from "./middlewares";
import bodyParser from "body-parser";
import { User } from "./models/User";
import mongoose from "mongoose";
import config from "./config/key";
import "./middlewares/db";
dotenv.config();
const app = express();
const { PORT } = process.env;

// when you open the localhost on browser
app.get("/", (req, res) => res.send("hello world"));

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  // 회원 가입 할 떄 필요한 정보들을 client를 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  // error handler
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Airbnb server is listening on http://localhost:${PORT}`);
});

export default app;
