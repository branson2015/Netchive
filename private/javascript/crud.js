var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var models = require('./models');
var path = require('path');
var fs = require('fs');
var scrape = require('website-scraper');                      //website scraping library


//GET - for requesting to recieve data
router.get('/',function(req, res, next){

});

var options = {
    urls: [],
    directory: 'path'
};


//promise method
scrape(options).then((result)=>{

}).catch((err)=>{

});