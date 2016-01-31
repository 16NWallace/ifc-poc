//Add endpoints here

var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var doingBizInd = ['gettingElectricity','startingBusiness', 'resolvingInsolvency', 'tradingAcrossBorders',
'agg', 'gettingCredit', 'construction', 'enforcingContracts', 'payingTaxes', 'protectMinorities', 
'registerProperty', 'ranks_all'];

var getTableById = function(client, table_id, full, callback){
  var data = [];
  //TODO: nicer string formatting in JS
  queryString = (full) ? "SELECT * FROM dbi_" : "SELECT country, isoa2, continent, year, rank, DTF FROM dbi_";
  queryString+=(table_id);
  //queryString+=" WHERE year=2016";
  console.log(queryString);
  //Don't use callback for error handling because it loads the entire result into memory
  var query = client.query(queryString);
  query.on('error', function(err){
    console.log(err);
    callback(err);
  });
  query.on('row', function(row){
    //console.log(data);
    formatData(row, function(formattedRow){
      data.push(formattedRow);
    });
  });
  query.on('end', function(result){
    console.log("Data rows: ", data.length);
    callback(null, data);
  });
}

//TODO: refactor for general tables, not just agg
var formatData = function(row, callback){
  if(row.rank!=".."){
    row.rank = parseInt(row.rank);
  }
  if(row.dtf!=".."){
    row.dtf = parseFloat(row.dtf);
  }
  if(row.year!=".."){
    row.year = parseInt(row.year);
  }
  callback(row);
}

var aggTables = function(client, callback){
  var full_results = {}
  for(var i in doingBizInd){
    getTableById(client, doingBizInd[i], false, function(err, result){
      full_results[doingBizInd[i]]=result;
    });
  }
  callback(full_results);
}

//Future: one GET route/endpoint per dataset (DBI, WGI, etc)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,  '../', '../', 'client', 'public', 'views', 'index.html'));
});

//Get all data
//To-do: figure out query parameters as necessary
router.get('/api/v1/doingbusiness', function(req, res){
  var results={};
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client) {
    // Handle connection errors
    if(err) {
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    //Add results to data structure
    aggTables(client, function(err, full_results){
      res.status(304).json(full_results); //{ table_name: [{row_property: value, ...}, { ... }], table_name2: [...]}
      res.end();
    });
  });
  pg.end();
});

//Use table id  'agg' for overall rankings
router.get('/api/v1/doingbusiness/:table_id', function(req, res){
  var table_id = req.params.table_id;
  console.log(table_id);
  //Check before helper function to prevent SQL injection
  if(doingBizInd.indexOf(table_id)<0){
    res.status(400).json({success: false, data: "No table found"}).end();
  }

  var allCols = (table_id==='ranks_all');
  //Get async pg client from pool
  pg.connect(connectionString, function(err, client) {
    // Handle connection errors
    if(err) {
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    getTableById(client, table_id, allCols, function(err, result){
      var formattedResult = {};
      formattedResult[table_id] = result;//singleton JSON
      res.json(formattedResult); 
    });
  });
  pg.end();
});

module.exports = router;

