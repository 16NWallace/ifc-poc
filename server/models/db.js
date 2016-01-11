var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var client = new pg.Client(connectionString);
client.connect();
var query = client.query(""); //Insert SQL Query here to set up the database
query.on('end', function() { client.end(); });