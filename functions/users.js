// var admin = document.getElementById("adminSwitch");
var bcrypt = require('bcrypt');

exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM users', function(err, results) {
            if (err) return next(err);
              var transposedResults = [];
                  results.forEach(function(data) {
                      if (data.admin === 0) {
                          data.admin = "No";
                      } else {
                          data.admin = "Yes";
                      }
                      if (data.locked === 0) {
                          data.locked = "No";
                      } else {
                          data.locked = "Yes";
                      }
                      transposedResults.push(data);
                  });
            res.render('users', {
                users: transposedResults,
                admin: req.session.admintab,
                user: req.session.user
            });
        });
    });
};

exports.showAdd = function(req, res) {
    res.render('addUser');
};


exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var password = req.body.password;
        var data = {
            username: req.body.username,
            admin: req.body.admin,
            locked: 0
        };

var adminSwitch = req.body.admin;
        if(adminSwitch.data-on === "true"){
          console.log("true");
          data.admin = "1";
          // data.username = "BLEH";
        }
        else {
          console.log("false");
          data.admin = "0";
          // data.username = "BLAH";
        }
        bcrypt.hash(password, 10, function(err, hash) {
            data.password = hash;

            connection.query('insert into users set ?', data, function(err, data) {
                if (err) return next(err);
                res.redirect('/users');
            });
        });
    });
};


exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.render('editUsers', {
                data: rows[0],
                // admin: req.session.admintab
            });
        });
    });
};

exports.update = function(req, res, next) {

    var id = req.params.id; //checks url for ID
    var password = req.body.password;
    var data = {
        username: req.body.username,
        admin: req.body.admin,
        locked: req.body.lock
    };
var adminSwitch = req.body.admin;
var lockSwitch = req.body.lock;

    if(adminSwitch === "on"){
      data.admin= 0;
    }
    else{
      data.admin=1;
    }

    if(lockSwitch === "on"){
      data.locked=1;
    }
    else{
      data.locked=0;
    }


    // bcrypt.hash(password, 10, function(err, hash) {
    //     data.password = hash;

        req.getConnection(function(err, connection) {
            connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows) {
                if (err) next(err);
                res.redirect('/users');
            });
        });
    // });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM users WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/users');
        });
    });
};
exports.search = function(req, res, next){
  req.getConnection(function(err, connection) {
    var searchVal = '%'+ req.params.searchVal +'%';
    connection.query('SELECT * FROM users WHERE users.username LIKE ?', [searchVal], function(err, result){
      if(err) return console.log(err);
      res.render('usersSearch',{
        search : result,
       isadmin: req.session.admintab, user: req.session.username,
        layout : false
      });
    });
  });
};
