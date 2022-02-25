const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret ="Khatmina@987" ;
var fetchuser = require('../middleware/fetchuser')

// Create a user. POST "api/auth/createuser" No login required
router.post('/createuser', 
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

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password,salt);
  user = await  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  })
  
  const  data = 
    {user:{
    id : user.id
  }
    }
  const jwt_token = jwt.sign(data,jwt_secret)
  res.json({jwt_token})

} catch (error) {
    console.error(error)
    res.status(500).send('Error')
}
})
// Login. POST "api/auth/login" No login required
router.post('/login', 
body('email','Invalid-email').isEmail(),
body('password').isLength({ min: 1 }),

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  try {
    
 const {email,password} = req.body
  let user = await User.findOne({email})
  if (!user){
    return res.status(400).json({error : 'Either email or/and password is incorrect'})
  } 
  const real_user = await bcrypt.compare(password,user.password)
  if (!real_user){
    return res.status(400).json({error : 'Either email or/and password is incorrect'})
  } 
  
  const  data = 
    { user:{
    id : user.id
  }
    }
  const jwt_token = jwt.sign(data,jwt_secret)
  res.json({jwt_token})

} catch (error) {
    console.error(error)
    res.status(500).send('Error')
}
})

// Get user-details. POST "api/auth/user-details".Login required
router.post('/user-details', fetchuser,
async (req, res) => {

  try {
    userId = req.user.id
    
    const user = await User.findById(userId).select("-password")
    res.send(user)

} catch (error) {
    console.error(error)
    res.status(500).send('Error')
}
})
  module.exports = router  

