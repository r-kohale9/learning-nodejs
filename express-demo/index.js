// Packages || Modules
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

// Something related to json don't know (figuring...).
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

app.use("/api/courses", courses);
app.use("/", home);

app.set("view engine", "pug");
app.set("views", "./views");

// Configuration
debug("Application Name: " + config.get("name")); // is equivalent to -> console.log("Application Name: " + config.get("name"));
debug("Mail server: " + config.get("mail.host")); // is equivalent to -> console.log("Mail server: " + config.get("mail.host"));
debug("Mail password: " + config.get("mail.password")); // is equivalent to -> console.log("Mail password: " + config.get("mail.password"));

// logger
app.use(logger);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
