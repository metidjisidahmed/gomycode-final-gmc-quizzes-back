require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRoute = require('./routes/admin')
var loginRoute = require('./routes/public/login')
var publicRoute= require('./routes/public')
var usersRoute = require('./routes/users')
let mongoose = require('mongoose')
var cors = require('cors')


const {authentificateTokenUser, authentificateTokenAdmin} = require("./utils");
var app = express();

var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
const url ='mongodb+srv://gomycode:gomycode@quizzes-gomycode.e2udpvd.mongodb.net/?retryWrites=true&w=majority' ;
const connect = mongoose.connect(url );
connect.then((db)=>{
  console.log(url);
  console.log('The DataBase is connected with the server nowww ')

}).catch((err)=>{
  console.log("Mongoose Connection Error =" , err.message)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// only users can do them
app.use('/users', authentificateTokenUser, usersRouter);
// only admin can do them
app.use('/admin' ,authentificateTokenAdmin, adminRoute)
// everyone can do them
app.use('/public' ,publicRoute )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
