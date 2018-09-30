var createError = require('http-errors');                     //creating errors
var express = require('express');                             //main express
var path = require('path');                                   //directory path management
//var cookieParser = require('cookie-parser');                  //for cookies
//var favicon = require('') //--for favicon, future feature
var logger = require('morgan');                               //logging server interactions
var fs = require('fs');                                       //opening filesystem
var app = express();                                          //main express instance

app.set('env', 'dev');													              //set app to development/production
app.set('private', path.join(__dirname, 'private'));					//set private directory
app.set('archive', path.join(__dirname, 'archive'));					//set private directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var crud = require(path.join(app.get('private'), '/javascript/crud'));

app.use(logger(String(app.get('env'))));							      	//for logging html requests
app.use(express.json());												              //for parsing JSON get/post requests
app.use(express.urlencoded({ extended: false }));					  	//also required for post requests to function
//app.use(cookieParser());												              //for cookies -- not currently using
						  
app.use('/',crud);												            //don't let the name fool you, this is really a router
app.get('*/favicon.ico', (req, res) => res.status(204));      //temporary, for favicon not complaining

// catch 404 and forward to error handler, doesn't overwrite previously set errors
app.use(function(req, res, next) {  next(createError(404)); });

// error handler
app.use(function(err, req, res, next) {
  console.log(err.message);

// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status + ': ' + err.message);
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;