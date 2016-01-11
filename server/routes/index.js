//Add endpoints here

var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,  '../', '../', 'client', 'views', 'index.html'));
});

//Get data -- can pass query parameters (TODO: determine query parameters)
router.get('/api/v1/doingbusiness/all', function(req, res){
  var results = [];
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    //Use parameterized query to prevent SQL injection attack
    var query = client.query("WRITE QUERY TO PULL ALL TABLES");
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
      done();
      return res.json(results);
    });
  });
  pg.end();
});

router.get('/api/v1/doingbusiness/:table_id', function(req, res){
  var results = [];
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    //Use parameterized query to prevent SQL injection attack
    var query = client.query();
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function("**** CREATE QUERY ***"){
      done();
      return res.json(results);
    });
  });
  pg.end();
});

//Future: one GET endpoint per dataset (DBI, WGI, etc)

module.exports = router;

