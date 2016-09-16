var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  // password: "mxmaolqk",
  password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

var connection = mysql.createConnection(dbOptions);
module.exports = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;



        connection.query('SELECT * FROM users where username = ?', username, function(err, users) {
          var user = users[0];
          var id = user.id;
          if(users[0] === undefined){
          return res.redirect("/login");
          }


                bcrypt.compare(password, user.password, function(err, match) {
                    if (match) {
                        req.session.username = user.username;
                        if(user.admin === 1){
                        req.session.admin = {
                          admin: req.session.username
                        };
                      }
                        return res.redirect("/");
                    }
                    else {
                            return res.redirect("/login");
                        }
                    });





        });

};
