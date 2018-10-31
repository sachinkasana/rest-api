const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const errorHandler=require('./utils/error.handler');

const userRoute=require('./routes/user.route');
const questionRoute=require('./routes/question.route');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());
app.use(errorHandler.logErrors);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);

app.use('/users',userRoute);
app.use('/questions',questionRoute);

const PORT = 3000;
app.listen(PORT, function () {
  console.log('server is running on port', PORT)
});
