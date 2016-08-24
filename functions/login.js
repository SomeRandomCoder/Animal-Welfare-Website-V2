var bcrypt = require('bcryptjs');
module.exports = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    req.getConnection(function(err, connection) {

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
    });
};
