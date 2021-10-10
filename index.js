require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const User = require("./models/user");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("open", () => console.log("Connected to database"));
db.on("error", (err) =>
  console.error("Error occured while connecting to database", err)
);

app.disable("etag");
app.enable("trust proxy");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "connect.sid",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.log(`This request[${key}] is sanitized`, req.user);
    },
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/dashboard", dashboardRouter);
app.use("/", authRouter);
app.use("/", publicRouter);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
