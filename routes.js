const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Home Page");
  });

  app.get("/login", (req, res) => {
    // console.log('pls show me error', req.flash('error'))
    res.render("login.ejs", { messagez: req.flash("error") });
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/profile", isAuthenticated, (req, res) => {
    res.send(`Welcome, ${req.user.username}`);
  });
};
