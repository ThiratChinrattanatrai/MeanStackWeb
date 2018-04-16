const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./route/user.route');
const passport = require('passport');
const path = require('path');

let app = express();

// port
const port = process.env.PORT || 8080;

// connect to database
mongoose.connect(config.database);

// listen to connect to database success event
mongoose.connection.on('connected',() => {
    console.log('database is connected to :' + config.database);
});
// list to connect to databse error event
mongoose.connection.on('error',() => {
    console.log('cannot connect to database');
});

// use cors middle ware
app.use(cors());

// use body-parser
app.use(bodyParser.json());

// mount path
app.use('/users/',users);

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// for deploy
app.use(express.static(path.join(__dirname,'public')));

// listen to / 
app.get('/',(request,response) => {
    response.send('this is root');
});

app.get('*',(request,response) => {
    response.sendFile(path.join(__dirname,'public/index.html'));
});

// run
app.listen(port,() => {
    console.log("server running at port :" + port);
});