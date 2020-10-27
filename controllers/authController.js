const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const auth = express.Router();

auth.post('/signup', passport.authenticate('signup', { session: false }),
async (req, res, next) => {
  res.json({
    message: 'Signup Successful',
    user: req.user
  });
  }
);

auth.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('an error occured.');
        return next(error);
      }
      req.login(
        user, { session: false},
        async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          return res.json({ token });
        }
      );
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
auth.get('/user', (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
});

module.exports = auth
