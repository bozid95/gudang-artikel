import express from "express";
import env from "dotenv";
import userRoute from "./routers/userRoute.js";
import categoryRoute from "./routers/categoryRoute.js";
import postRoute from "./routers/postRoute.js";
import Posts from "./models/postModel.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// daftar api
app.use("/api", userRoute, categoryRoute, postRoute);

app.get("/", (req, res) => {
  res.send("API is Running..");
});

// handling URL
app.all("*", (req, res) => {
  res.send("not found URL");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
