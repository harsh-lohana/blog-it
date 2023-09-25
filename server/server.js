const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes") 
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
// app.use(notFound);
app.use(errorHandler);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  return res.send("API is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}!`);
});
