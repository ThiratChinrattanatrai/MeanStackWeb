var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../mongoDB/controller/user.controller');
var config = require('../config/database');
// Register
router.post('/register',(request,response,next) => {
    console.log('call register');
    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });

    User.addUser(newUser,(err,user) => {
        if(err){
            response.json({success: false,message: 'Cannot add user'});
        }else{
            response.json({success: true,message: 'add user success'});
        }
    });

});

// Authenticate
router.post('/authenticate',(request,response,next) => {
    const username = request.body.username;
    const password = request.body.password;
    console.log('username : ' + username);
    console.log('password : ' + password);
    User.getUserByName(username,(err,user)=>{
        if(err){
            throw err;
        }else{
            User.comparePassword(password,user.password,(err,isMatch) => {
                if(isMatch){
                    console.log('password is match');
                    let signOptions = {
                        expiresIn : 604800
                    }
                    const token = jwt.sign({data : user},config.secret,signOptions)
                    response.json({
                        success: true,
                        token: 'Bearer ' + token,
                        user : {
                            id: user._id,
                            name : user.name,
                            username : user.username,
                            email : user.email
                        }
                    })
                }else{
                    response.json({
                        success: false,
                        message: 'Wrong password'
                    })
                }
            });
        }
    });
});

// profile
router.get('/profile',passport.authenticate('jwt',{session: false}),(request,response,next) => {
    console.log('call profile');
    response.json({
        user : request.user
    });
});

// Register
router.get('/validate',(request,response,next) => {
    response.send('validate');
});

module.exports = router;
