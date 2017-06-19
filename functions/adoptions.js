var mysql = require('mysql');
var fs = require('fs');

var dbOptions = {
    host: "127.0.0.1",
    user: 'root',
    password: "mxmaolqk",
    // password: '5550121a',
    port: 3306,
    database: 'animalWelfare'
};

// function makeRefCode(){
//   var text= "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//
//   for(var i = 0; i <5 i++){
//     text += possible.charAt(Math.floor(Math.random()*possible.length));
//     console.log(text);
//     return text;
//   }
// }

var connection = mysql.createConnection(dbOptions);
exports.add = function(req, res) {
  var text= "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i <5; i++)
  {
    text += possible.charAt(Math.floor(Math.random()*possible.length));
  }
    console.log(text);

    // var file = req.body.img;



     //var path = (req.file.path).replace("public\\", ''); //USE THIS LINE OF CODE WHEN  TESTING ON WINDOWS MACHINE  ELSE IMAGES WONT LOAD WHEN GETTING ANIMALS FROM DATABASE DUE TO PATH IN 'IMAGE' COLUMN IS A \
     var path = (req.file.path).replace("public/", ''); //USE THIS LINE OF CODE WHEN  TESTING ON LINUX MACHINE ELSE IMAGES WONT LOAD WHEN GETTING ANIMALS FROM DATABASE

    var data = {
        animal: req.body.animal,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        bio: req.body.bio,
        size: req.body.size,
        image: path,
        refcode: text
    };
    connection.query('INSERT INTO `adoptions` SET ?', [data], function(err, rows) {
        if (err) console.log(err);
        res.redirect('/adoptions');
    });

};

exports.showCat = function(req, res) {
    connection.query('SELECT * FROM `adoptions` WHERE animal = "cat" ', [], function(err, results) {
        // console.log(results);
        return res.render('adoptCat', {
            data: results,
            admin: req.session.admin,
            user: req.session.username
        });

    });
};

exports.searchDog = function(req, res, next){
  req.getConnection(function(err, connection) {
     var searchVal =  req.params.searchVal;
    console.log("Radio button value: " + searchVal + " from searchQuery Function");
    console.log("---------------------------------------------------");
    connection.query('SELECT * FROM adoptions WHERE animal="dog" and adoptions.size LIKE ?', [searchVal], function(err, result){
      if(err)
      return console.log(err);
      res.render('adoptDog',{
            data : result,
        		admin: req.session.admin,
						user: req.session.username,
						layout:false
      });
    });
  });
};

exports.searchCat = function(req, res, next){
  req.getConnection(function(err, connection) {
     var searchVal =  req.params.searchVal;
    console.log("Radio button value: " + searchVal + " from searchQuery Function");
    console.log("---------------------------------------------------");
    connection.query('SELECT * FROM adoptions WHERE animal="cat" and adoptions.size LIKE ?', [searchVal], function(err, result){
      if(err)
      return console.log(err);
      res.render('adoptCat',{
            data : result,
        		admin: req.session.admin,
						user: req.session.username,
						layout:false
      });
    });
  });
};

exports.allAnimalsRefCode = function(req, res, next){
  req.getConnection(function(err, connection) {
     var searchVals =  '%'+req.params.searchVal+ '%';
    console.log("Search Value value: " + searchVals + " from searchQuery Function");
    console.log("---------------------------------------------------");
    connection.query('SELECT * FROM adoptions WHERE adoptions.name LIKE ?', [searchVals], function(err, result){
      if(err)
      return console.log(err);
      res.render('allAnimals',{
            data : result,
        		admin: req.session.admin,
						user: req.session.username,
						layout:false
      });
    });
  });
};
//--------------------BACKUP-----------------------------

// exports.showCat = function(req, res) {
//   var data =
//     {
//       size: req.body.size
//     }
//     console.log(data);
//     connection.query('SELECT * FROM `adoptions` WHERE animal = "cat" and size LIKE ?', [data], function(err, results) {
//         // console.log(results);
//         return res.render('adoptCat', {
//             data: results,
//             admin: req.session.admin,
//             user: req.session.username
//         });
//     });
// };

// exports.showCat = function(req, res) {
//
//     connection.query('SELECT * FROM `adoptions` WHERE animal = "cat" ', [], function(err, results) {
//         // console.log(results);
//         return res.render('adoptCat', {
//             data: results,
//             admin: req.session.admin,
//             user: req.session.username
//         });
//     });
// };
//
//
//


// exports.search = function(req, res, next){
//   req.getConnection(function(err, connection) {
//     var searchVal =  req.params.searchVal;
//     connection.query('SELECT * FROM adoptions WHERE animal="cat" and adoptions.size LIKE ?', [searchVal], function(err, result){
//       if(err) return console.log(err);
// 			console.log(searchVal);
//       res.render('adoptCatSearch',{
//             search : result,
//         		admin: req.session.admin,
// 						user: req.session.username,
// 						layout:false
//
//       });
//     });
//   });
// };
//-----------------------------------END----------------------------------

exports.showDog = function(req, res) {
    connection.query('SELECT * FROM `adoptions` WHERE animal = "dog"', [], function(err, results) {
        return res.render('adoptDog', {
            data: results,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};


exports.showAll = function(req, res) {
    connection.query("SELECT * FROM `adoptions`", [], function(err, result) {
        res.render('allAnimals', {
            data: result,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};
exports.remove = function(req, res) {
    var id = req.params.id;
    console.log(id);
    connection.query('SELECT image FROM adoptions where id = ?', id, function(err, image) {
        fs.unlink('./public/' + image[0].image);
        connection.query('DELETE FROM adoptions WHERE id= ?', id, function(err, rows) {
            if (err) console.log(err);
            res.redirect('/allAnimals');
        });
    });
};
