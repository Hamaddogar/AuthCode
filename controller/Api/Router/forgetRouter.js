
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const async = require('async');
const crypto = require('crypto');
const UserForgot = require('../../Database/model/forgotModel')
router.post('/', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      var userForgot = new UserForgot();

      userForgot.resetPasswordToken = token;
      userForgot.resetPasswordExpires = Date.now() + 3600000;
      userForgot.email = req.body.email;

      userForgot.save()
        .then(() => {
          done(null, token, userForgot);
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    },
    function (token, userForgot, done) {
      // Configure SendGrid transport
      const options = {
        auth: {
          api_key: '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' // Replace with your SendGrid API key
        }
      };
      const smtpTransport = nodemailer.createTransport(sgTransport(options));

      var mailOptions = {
        to: userForgot.email,
        from: 'hamad.softdev@gmail.com',
        subject: 'DKSH  (forgot password)',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:3000/Reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        if (err) {
          console.error(err);
          done(err);
        } else {
          // Only call done() without sending a response here
          done(null, 'done');
        }
      });
    }
  ], function (err) {
    if (err) return next(err);
    // Send the response after the async waterfall is completed
    res.json('Your e-mail has been sent.');
  });
});
module.exports = router;