var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var verifier = require('email-verify');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.get('/check', function(req, res, next) {	
	var parts = url.parse(req.url, true);
    var query = parts.query;

    console.log("URL = ", req.url);

    if( !query.email )
    {
        var data = {};      
        data.exist = false;            
        res.send(data);
        return;
    }

    verifier.verify( query.email, function( err, info ){
        var data = {};
        if( err ) 
        {
            data.exist = false;            
        }
        else
        {
            data.exist = info.success;          
        }
        res.send(data);
    });
});

router.post('/createcamera', function(req, res, next) {	
	var camera_id = req.body.camera_id;

    var data = {code : 200};
    res.send(data);
});


module.exports = router;
