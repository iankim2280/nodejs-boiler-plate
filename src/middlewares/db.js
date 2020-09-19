import mongoose from "mongoose";

export default () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once("open", () => console.log("Connected to DB"));
};
