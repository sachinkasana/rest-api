const mongoose=require('mongoose');
const config=require('../config/config.json');
const User=require('../models/user.model');
const Question=require('../models/question.model');

mongoose.connect(config.connectionString);
mongoose.Promise=global.Promise;

module.exports={
    User:User,
    Question:Question
};
