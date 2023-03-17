const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const helpers = require("./utils/hbsHelpers");
const flash = require("connect-flash");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");

const app = express();
dotenv.config();

// Initsialize mogo store
const store = new MongoStore({
  collection: "admins",
  uri: process.env.DATABASE_URI,
});

// middlewares
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register handlebars helpers
helpers(Handlebars);
Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      path: "/",
      expires: 60 * 60 * 1000,
    },
  })
);

// Connect to database
mongoose.connect(process.env.DATABASE_URI, (err) => {
  if (err) throw err;
  console.log("Connect to database...");
});

// express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// routes
app.use("/", require("./routes/homeRouter"));
app.use("/about", require("./routes/aboutRouter"));
app.use("/courses", require("./routes/courseRouter"));
app.use("/auth", require("./routes/authRouter"));
app.use("/admin", require("./routes/adminRouter"));

// listen project
const Port = process.env.PORT || 5001;
app.listen(Port, () => {
  console.log(`Loyiha ${Port}-portda ishga tushdi`);
});
