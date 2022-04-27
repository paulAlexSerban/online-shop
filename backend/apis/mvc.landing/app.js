const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const logger = require("morgan");

const app = express();

app.set("view engine", "ejs"); // set the View Engine or the Templating Engine to EJS
app.set("views", "views"); // set the root to the views in the `./views` directory

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/admin", adminRoutes.routes); /* 1. if the URL has `/admin`, then it can access the administrator routes and views */
app.use(shopRoutes); /* 2. if URL is simple, without `/admin`, it can only access shop routes */

app.use(errorController.get404);
app.use(errorController.errorHandler);

module.exports = app;
