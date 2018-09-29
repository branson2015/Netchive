var express = require('express');
var createError = require('http-errors');
var router = express.Router();
//var models = require('./models');
var path = require('path');
var fs = require('fs');
var scrape = require('website-scraper');                      //website scraping library


//GET - for requesting to recieve data
router.get('/',function(req, res, next){
    //generate createArchive/viewArchive stuff

    let dlist = [];
    dirsearch(dlist, req.app.get('archive'));

    console.log(dlist);

    res.render('homepage', {title: 'Netchive', directories: dlist});
});

function dirsearch(dlist, root){
    let sites = fs.readdirSync(root);
    for(let i = 0; i < sites.length; i++){
        
        let name = sites[i];
        let p = path.join(root, sites[i]);
        let stat = fs.lstatSync(p);

        if(stat.isDirectory()){
            let t = [];
            dirsearch(t, p);
            dlist.push({directory: name, files: t});
        }else{
            dlist.push(name);
        }
    }
}

var options = {
    urls: [],
    directory: 'path'
};


//promise method
scrape(options).then((result)=>{

}).catch((err)=>{

});

module.exports = router;