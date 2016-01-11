//Add endpoints here

var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var path = require('path');
var doingBizInd = ['gettingElectricity','startingBusiness', 'resolvingInsolvency', 'tradingAcrossBorders',
'agg', 'gettingCredit', 'constructionPermit', 'enforcingContracts', 'payingTaxes', 'protectMinorities', 
'registerProperty'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,  '../', '../', 'client', 'views', 'index.html'));
});

//Get all data
//To-do: figure out query parameters as necessary
router.get('/api/v1/doingbusiness/', function(req, res){
  var results = {};
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    //Add results to data structure
    for(table_id in doingBizInd){
      getTableById(client, table_id, function(res){
        results[table_id]=res;
      })
    }
    done();
    res.json(results);
  });
  pg.end();
});

router.get('/api/v1/doingbusiness/:table_id', function(req, res){
  var table_id = req.query.table_id;
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    getTableById(client, table_id, function(res){
      done();
      res.json({table_id:results}); //singleton JSON
    });
  });
  pg.end();
});

var getTableById = function(client, table_id, callback){
  client.query("SELECT * FROM $1", [table_id], function(err, res){
    //SQL Error
    if(err){
      done();
      console.log(err);
    }
    query.on('end', function(){
        callback(res);
    })
  })
}
//Future: one GET endpoint per dataset (DBI, WGI, etc)

module.exports = router;

