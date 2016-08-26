var fs = require('fs');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var sql = fs.readFileSync('./sql/createDB.sql');

var dbOptions = {
  host: "localhost",
  user: 'root',
  password: "",
  port: 3306,
};

var connection = mysql.createConnection(dbOptions);


exports.create = function(){



connection.query(sql, [], function(err, rows){
if(err) console.log(err);
});
};
