const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
// app.use(notFound);
app.use(errorHandler);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// ---------- depolyment ----------

const __currdir = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__currdir, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__currdir, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.send("API is running!");
  });
}

// ---------- depolyment ----------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}!`);
});
