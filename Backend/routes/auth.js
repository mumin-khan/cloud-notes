const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/', 
body('name').isLength({ min: 2 }),
body('email','Invalid-email').isEmail(),
body('password').isLength({ min: 5 }),

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  try {
    
 
  let user = await User.findOne({email:req.body.email})
  if (user){
    return res.status(400).json({error : 'A user with this email already exists !'})
  } 
  user = await  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }) 
  res.json(user)

} catch (error) {
    console.error(error)
    res.status(500).send('Error')
}
})
  module.exports = router  