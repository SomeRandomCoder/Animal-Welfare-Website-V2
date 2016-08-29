var mysql=require('mysql');
var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  port: 3306,
  database: 'animalWelfare'
};

exports.add = function(req, res) {
  var connection = mysql.createConnection(dbOptions);

    var file = req.body.img;
    // var path = (req.file.path).replace('public/', '') + file;
    var data = {
      animal: req.body.animal,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      bio: req.body.bio,
      // image: path
    };
    connection.query('INSERT INTO `adoptions` SET ?', [data], function(err, rows) {
      if (rows.affectedRows === 1) {
        console.log("Success");
      } else {
        console.log("FAILED TO ADD");
      }
    });

};
exports.showCat = function(req, res) {
  req.getConnection(function(err, connection){
connection.query('SELECT * FROM `adoptions` WHERE animal = "cat"', [], function(err, results){
return res.render('/adoptCat', {data: results});
});
  });
};
exports.showDog = function(req, res) {
  req.getConnection(function(err, connection){
connection.query('SELECT * FROM `adoptions` WHERE animal = "dog"', [], function(err, results){
return res.render('/adoptDog', {data: results});
});
  });
};
