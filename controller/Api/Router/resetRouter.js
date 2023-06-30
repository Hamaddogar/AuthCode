
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
 const UserForgot = require('../../Database/model/forgotModel')
  const Form = require('../../Database/model/formModel')
router.post('/:token', async function (req, res) {
    const newPassword = req.body.password;
  
    try {
      const user = await UserForgot.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (user) {
        const hash = await bcrypt.hash(newPassword, 10); // Using 10 rounds of salt
  
        const updatedUser = await Form.findOneAndUpdate(
          { email: user.email },
          { password: hash }, // Update the password field with the hashed password
          { new: true } // Return the updated document
        );
  
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found or token expired' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports = router;