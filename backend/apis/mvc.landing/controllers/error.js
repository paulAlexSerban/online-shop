const createError = require("http-errors");

/**
 * @param { object } req
 * @param { object } res
 * @param { object } next
 *
 * - responds with `404` code and renders the `404.ejs` view
 */

exports.get404 = (req, res, next) => {
  return res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/",
  });
  next(createError(404));
};


exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;  // set locals, only providing error in development
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);   // render the error page
  return res.render("404", {
    pageTitle: "Page Not Found",
    path: "/"
  });
};