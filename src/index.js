import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { User } from "./models/User";
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

app.post("/signup", (req, res) => {
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

app.post("/login", (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다. ",
      });
    }
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 3. if passwords are correct, generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Airbnb server is listening on http://localhost:${PORT}`);
});

export default app;
