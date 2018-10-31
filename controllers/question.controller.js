const questionService=require('../services/question.service');
var xlstojson = require("xls-to-json-lc");
var multer = require('multer');
var xlsxtojson = require("xlsx-to-json-lc");
const Util=require('../utils/app.util');
const IncomingForm = require('formidable').IncomingForm;

module.exports={
    uploadQuestions,
    getAllQuestion,
    getQuestionBySubjectId
}
var excelToJson;
function uploadQuestions(req,res,next){
    const form =new IncomingForm();
    
    form.on('file',(field,file)=>{
        if(!file){
            next("No file.");
        }
        if(file.name.split('.')[file.name.split('.').length-1]=='xlsx'){
            excelToJson=xlsxtojson;
        }
        else{
            excelToJson=xlstojson;
        }
        try {
            excelToJson({
                input:file.path,
                output:null
            },function(err,result){
                if(err){
                    next({err_code:1,err_desc:err,data:null});
                }
                for (let index=0;index<result.length;index++){
                    result[index].subjectId=parseInt(result[index].subjectId);
                    result[index].questionNo=parseInt(result[index].questionNo);
                    result[index].ans=Util.encrypt(result[index].ans);
                }
                questionService.importQuestions(result).then(result=>{
                    res.json({status:200,count:result.insertedCount,msg:'File uploaded successfully'});
                }).catch(err=>{
                    next(err);
                })
            })
        } catch (error) {
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })
    form.on('end', () => {
        // res.json();
     });
     form.parse(req);
     var storage = multer.diskStorage({ //multers disk storage settings
         destination: function (req, file, cb) {
             cb(null, './files/')
         },
         filename: function (req, file, cb) {
             var datetimestamp = Date.now();
             cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
         }
     });
     var upload = multer({ //multer settings
                     storage: storage,
                     fileFilter : function(req, file, callback) { //file filter
                         if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                             return callback(new Error('Wrong extension type'));
                         }
                         callback(null, true);
                     }
                 }).single('file');
};

function getAllQuestion(req,res,next){
    questionService.getAllQuestions().then(ques=>{
        if(ques)
        res.json(ques);
    }).catch(err=>console.log(err))
};

function getQuestionBySubjectId(req,res,next){
    questionService.getQuestionBySubjectId(req.params.id).then(result=>{
        if(result) res.json(result);
    }).catch(err=>console.log(err));
}