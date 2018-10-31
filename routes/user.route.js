const express=require('express');
const router=express.Router();
const validate =require('express-validation');
const userController=require('../controllers/user.controller');
const validation = require('../services/user.validation');
const middleware=require('../utils/middleware');

router.get('/userList', middleware.checkToken,userController.getUsersList);
router.post('/register',validate(validation.register),userController.registerUser);
router.post('/login',userController.login);

module.exports=router;