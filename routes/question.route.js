const express= require('express');
const middleware=require('../utils/middleware');
const router=express.Router();
const QuestionController=require('../controllers/question.controller');

router.post('/import',middleware.checkToken,QuestionController.uploadQuestions);
router.get('/questionsList',middleware.checkToken,QuestionController.getAllQuestion);
router.get('/questionsListbyId/:id',middleware.checkToken,QuestionController.getQuestionBySubjectId);

module.exports=router;