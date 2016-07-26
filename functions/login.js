var bcrypt = require('bcrypt');
var lockCount = 0;
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

            if (user.locked === 0) {
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
                        lockCount ++;
                        if (lockCount === 5) {
                          if(lockCount >= 5){
                            lockCount = 0;
                          }
                            connection.query('UPDATE users SET locked = 1 WHERE id = ?', [id], function(err, rows) {
                                return res.redirect("/login");
                            });
                        }
                        else {
                            return res.redirect("/login");
                          }
                        }
                    });
            }
             else {
                return res.redirect("/login");
            }

            

        });
    });
};
