
const express = require('express');
const router = express.Router();
const Form= require('../../Database/model/formModel')
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await Form.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password,user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Passwords match, send success response
      return res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;