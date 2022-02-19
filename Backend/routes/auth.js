const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

   test = {
       name : 'Hi',
       number : 7

   }
    res.json(test)
  })
  module.exports = router
  