const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// async function authenticateUser(email, password, done) {
//   //   console.log("you pass bro");
//   const user = getUserByEmail(email);
//   if (user == null) {
//     return done(null, false, { message: "No user with that email" });
//   }

//   try {
//     if (await bcrypt.compare(password, user.password)) {
//       return done(null, user);
//     } else {
//       return done(null, false, { message: "Password incorrect" });
//     }
//   } catch (err) {
//     return done(err);
//   }
// }

function initialize(passport, getUserByEmail) {
  //   console.log("Im not function??");
  //   console.log('come?')

  const authenticateUser = async (email, password, done) => {
    console.log("you come la??");
    const user = getUserByEmail(email);
    console.log('can you see email?', email)
    console.log("you see user?", getUserByEmail(email));
    if (user == null) {
      console.log("pass?");
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("pass bcrypt?");
        return done(null, user);
      } else {
        console.log("not pass?");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
