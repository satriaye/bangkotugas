const LocalStrategy = require('passport-local').Strategy
const fs = require("fs");

function initialize(passport, getUserByUsername, getUserById) {
  const username = process.env.USER_USERNAME;
  const password = process.env.USER_PASSWORD;

  const authenticateUser = async (usernameInput, passwordInput, done) => {
    if (usernameInput === username && passwordInput === password) {
      // Jika username dan password yang dimasukkan oleh pengguna sesuai dengan environment variables
      const user = { id: "1", username: usernameInput }; // Anda dapat menyesuaikan ini sesuai kebutuhan
      return done(null, user);
    } else {
      return done(null, false, { message: "Username or password incorrect" });
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    const user = { id: id, username: username }; // Mengembalikan user yang telah di-autentikasi
    return done(null, user);
  });
}

module.exports = initialize;
