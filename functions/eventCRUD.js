
exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from events', [], function(err, event) {
        	if (err) return next(err);
    		res.render( 'Event', {
					events : event,
					isAdmin: req.session.admin,
					isUser: req.session.username
    		});
      	});
	});
};

exports.showAll = function(req, res) {
    connection.query("SELECT * FROM `events`", [], function(err, result) {
        res.render('Event', {
            data: result,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
      		Title : req.body.Title,
					Description: req.body.Description

  		};

		connection.query('insert into events set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/Event');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM events', [id], function(err, categories){
			if(err) return next(err);
			connection.query('SELECT * FROM events WHERE id = ?', [id], function(err,category){
				if(err) return next(err);
				var item = category[0];
				categories = categories.map(function(item){
					return item;
				});
				res.render('Event', {
					Title : categories,
					Description : item,
					isAdmin: req.session.admin,
					isUser: req.session.username
				});
			});
		});
	});
};


// exports.update = function(req, res, next){
//
//   var data = {
//         category : req.body.category,
//     };
//
//   // console.log("test");
//   	var id = req.params.id;
//   	req.getConnection(function(err, connection){
// 		if (err) return next(err);
// 		connection.query('UPDATE events SET ? WHERE id = ?', [data, id], function(err, rows){
// 			if (err) return next(err);
//       		res.redirect('/Event');
// 		});
//     });
// };

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM events WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/Event');
		});
	});
};
