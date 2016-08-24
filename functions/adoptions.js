exports.add = function(req, res) {
  req.getConnection(function(err, connection) {
    var file = req.body.img;
    var path = (req.file.path).replace('public/', '') + file;
    var data = {
      animal: req.body.animal,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      bio: req.body.bio,
      image: path
    };
    connection.query('INSERT INTO `adoptions` SET ?', [data], function(err, rows) {
      if (rows.affectedRows === 1) {
        console.log("Success");
      } else {
        console.log("FAILED TO ADD");
      }
    });
  });
};
