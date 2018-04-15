const bcrypt = require('bcryptjs');
const config = require('../../config/database');
const promise = require('promise');
const mongoose = require('mongoose');
const userModel = require('../schema/user.model');
const User = mongoose.model('User');

module.exports.getUserByID = function(id,callback){
    User.findById(id,callback);
};

module.exports.getUserByName = function(username,callback){
    const query = {
        username : username
    };
    console.log('find user name ' + username);
    User.findOne(query,callback);
};

module.exports.addUser = function(newUser,callback){
    var round = 10;
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
            if(err){
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password,hashPassword,callback){
    bcrypt.compare(password,hashPassword,(err,isMatch) => {
        if(err){
            throw error;
        }else{
            callback(err,isMatch);
        }
    });
}