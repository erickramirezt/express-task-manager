require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

// const tasks = require("./routes/tasks");
// app.use("/api/v1/tasks", taskRouter)
// app.use(express.static("./public"));

// const productRouter = require("./routes/products");
// app.get("/", (req, res) => {
//   res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
// });
// app.use("/api/v1/products", productRouter)

// const mainRouter = require("./routes/auth");
// app.use("/api/v1", mainRouter);