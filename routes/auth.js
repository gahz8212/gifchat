const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
router.post("/join", async (req, res, next) => {
  const nick = req.body.nick;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join/?error=conflict");
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        nick,
        email,
        password: hash,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});
router.get("/logout", (req, res, next) => {
  return req.logout((e) => {
    req.session.destroy();
    if (e) {
      console.error(e);
      next(e);
    }
  });
});
module.exports = router;
