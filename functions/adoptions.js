var mysql=require('mysql');
var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

var connection = mysql.createConnection(dbOptions);
exports.add = function(req, res) {

    // var file = req.body.img;
    var path = (req.file.path).replace("public/" , '');
    var data = {
      animal: req.body.animal,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      bio: req.body.bio,
      image: path
    };
    connection.query('INSERT INTO `adoptions` SET ?', [data], function(err, rows) {
      if(err) console.log(err);
      res.redirect('/adoptions');
    });

};
exports.showCat = function(req, res) {
connection.query('SELECT * FROM `adoptions` WHERE animal = "cat"', [], function(err, results){
  // console.log(results);
return res.render('adoptCat', {data: results,admin: req.session.admin, user: req.session.username});
});
};
exports.showDog = function(req, res) {
connection.query('SELECT * FROM `adoptions` WHERE animal = "dog"', [], function(err, results){
    // console.log(results);
return res.render('adoptDog', {data: results, admin:req.session.admin, user: req.session.username});
});
};
