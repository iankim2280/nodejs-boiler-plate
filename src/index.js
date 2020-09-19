import express from "express";
import dotenv from "dotenv";
import middleWares from "./middlewares";
dotenv.config();
const app = express();
const { PORT } = process.env;

middleWares(app);

app.listen(PORT, () => {
  console.log(`Airbnb server is listening on http://localhost:${PORT}`);
});

export default app;
