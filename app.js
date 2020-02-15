require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');
var user = require('./controllers/usercontroller')
var forum = require('./controllers/forumcontroller')

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/header'))
// app.use('/test', test)
app.use('/api/user', user)
app.use(require('./middleware/validatesession'))
app.use('/api/forum', forum)

// app.use('/api/test', function(req, res){ 
//     res.send("This is data from the /api/test endpoint. It's from the new server.");
// });

app.listen(4000, function(){
    console.log('App is listening on 3000.') 
});