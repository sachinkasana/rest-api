const db = require('../db/db');

const Question = db.Question;

module.exports={
    importQuestions,
    getQuestionBySubjectId,
    getAllQuestions
}

async function importQuestions(ques) {
  return await Question.collection.insertMany(ques);
}

async function getQuestionBySubjectId(id) {
  return await Question.find({"subjectId":id}).exec();
}

async function getAllQuestions(){
    return await Question.find().lean().exec();
}
