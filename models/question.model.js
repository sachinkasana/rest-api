const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const schema=new Schema({
    questionNo:{type:Number,required:true},
    questionDesc:{type:String,required:true},
    option1:{type:String,required:true},
    option2:{type:String,required:true},
    option3:{type:String,required:true},
    option4:{type:String,required:true},
    ans:{type:String,required:true},
    subjectId:{type:Number,required:true},
});

module.exports=mongoose.model('question',schema,'question');