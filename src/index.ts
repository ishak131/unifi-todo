import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "./Route/AuthRouter";
import { todoRouter } from "./Route/TodoRouter";
import { connectMeMongoDB } from "./utils/DB/connection";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/todo", todoRouter);
app.use("/auth", authRouter);


app.get("/", (req, res) => {
  res.send("Yes Here Is Todo App Made By Isaac Saad :)");
});

// Server Listening
app.listen(PORT, async () => {
  try {
    await connectMeMongoDB();
    console.log("Server is Running And DB Connected http://localhost:" + PORT);
  } catch (error) {
    console.log(error);
  }
});
