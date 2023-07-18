const express = require("express");
const app = express();
const cors = require("cors");

const helmet = require("helmet");

const AppError = require("./utils/appError");

const userRoutes = require("./app/user/user.routes");
// const { verifyToken } = require("./utils/verifyToken");
// const config = require("./config");
// const globalErrorHandler = require("./middlewares/globalErrorHandler");

// set security http headers
app.use(helmet());

// $ CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1", (req, res) => res.send("Welcome to P.H. Forum!"));

// routes
app.use("/api/v1/user", userRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

module.exports = app;
