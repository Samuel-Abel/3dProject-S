var express = require('express'); 
var router = express.Router();     
var sequelize = require('../db')

router.post('/one', function(req, res){   
    res.send("Test 1 went through!")  
  }); 

router.get('/', function (req, res) {
      res.send('Hey!!! This is a test route!');
    });


module.exports = router;