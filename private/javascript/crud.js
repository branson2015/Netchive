var express = require('express');
var createError = require('http-errors');
var router = express.Router();
//var models = require('./models');
var path = require('path');
var fs = require('fs');
var Url = require('url');
var scrape = require('website-scraper');                      //website scraping library


//GET - for requesting to recieve data
router.get('/',function(req, res){
    //generate createArchive/viewArchive stuff

    let dlist = [];
    dirsearch(dlist, req.app.get('archive'));

    dlist = {name: 'archive', files: dlist};

    res.render('homepage', {title: 'Netchive', directories: dlist});
});

router.post('/', (req, res, next)=>{
    let url = new URL(req.body.add);
    let folderName = url.hostname;

    let r = req.body.r? true: false;

    var archive = req.app.get('archive');
    d = path.join(archive, folderName);

    var options = {
        urls: [url],
        directory: d,
        //sources: all
        recursive: r,
        maxRecursiveDepth: 10,
    };
    
    console.log(options);

    //promise method
    scrape(options).then((result)=>{
        
    }).catch((err)=>{
        console.log('error');
    });

    res.redirect('back');
});

function dirsearch(dlist, root){
    let sites = fs.readdirSync(root);
    for(let i = 0; i < sites.length; i++){
        
        let n = sites[i];
        let p = path.join(root, sites[i]);
        let stat = fs.lstatSync(p);

        if(stat.isDirectory()){
            let t = [];
            dirsearch(t, p);
            dlist.push({name: n, files: t});
        }else{
            dlist.push({name: n});
        }
    }
}

module.exports = router;