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


var connection = mysql.createConnection(dbOptions);

exports.addImage = function(req, res)
{
    //var path = (req.file.path).replace("public\\", ''); //USE THIS LINE OF CODE WHEN  TESTING ON WINDOWS MACHINE  ELSE IMAGES WONT LOAD WHEN GETTING ANIMALS FROM DATABASE DUE TO PATH IN 'IMAGE' COLUMN IS A \
    var path = (req.file.path).replace("public/", ''); //USE THIS LINE OF CODE WHEN  TESTING ON LINUX MACHINE ELSE IMAGES WONT LOAD WHEN GETTING ANIMALS FROM DATABASE
      console.log(path);
    var data =
          {
                elementId: req.body.ElementId,
                PageURL: req.body.PageURL,
                image: path

          };

    var URLs = data.PageURL;
    connection.query('INSERT INTO `updatedimages` SET ?', [data], function(err, rows) {
        if (err)
        {
          console.log(err);
        } else
        {
          req.flash('success','Entry Successful');
          return res.redirect(URLs);
        }


    });

};
exports.addContent = function (req, res, next)
{
	 var data ={

     updatedText : req.body.updatedText,
     ElementId : req.body.ElementId,
     PageURL : req.body.PageURL
   };
   var URLs = data.PageURL;
		connection.query('insert into editablecontent set ?', data, function(err, results) {
  			if (err) console.log(err);
        res.redirect(URLs);
        console.log("Inserting Data...");
        console.log("succesful entry");
        console.log(data);

	});
};

exports.showAboutUs = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "AboutUsDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "AboutUsDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, result2)
      {
        connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "AboutUsDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, result3)
        {

          connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage1)
          {
            connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage2)
            {
              connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage3)
              {
                connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv4" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage4)
                {
                  connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv5" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage5)
                  {
                    connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "AboutUsImageDiv6" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage6)
                    {

            return res.render('AboutUs',{
               AboutUsDiv1: result1,
               AboutUsDiv2: result2,
               AboutUsDiv3: result3,
               AboutUsImageDiv1: resultImage1,
               AboutUsImageDiv2: resultImage2,
               AboutUsImageDiv3: resultImage3,
               AboutUsImageDiv4: resultImage4,
               AboutUsImageDiv5: resultImage5,
               AboutUsImageDiv6: resultImage6,
               admin : req.session.admin,
               user: req.session.user
             });
           });
         });
       });
     });
   });
 });

        });
      });
    });

};

exports.addIndex = function (req, res, next)
{
	 var data ={
     Title : req.body.Title,
     updatedText : req.body.updatedText,
     ElementId : req.body.ElementId,
     PageURL : req.body.PageURL
   };
		connection.query('insert into editablecontent set ?', data, function(err, results) {
  			if (err) console.log(err);
        res.redirect('/');
        console.log("Inserting Data...");
        console.log("succesful entry");
        console.log(data);
	});
};

exports.showIndex = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "homeDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "homeDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, result2)
      {
        connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "homeDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, result3)
        {
            return res.render('index',
            {
               homeDiv1: result1,
               homeDiv2: result2,
               homeDiv3: result3,
               user: req.session.user,
               admin : req.session.admin
             });
        });
     });
  });
};

exports.showNews = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "newsDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
            return res.render('news',{
               newsDiv1: result1,
               admin : req.session.admin,
               user: req.session.user
             });
    });

};

exports.showAdoptions = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "adoptionsDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "adoptionsDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, result2)
      {
        connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "adoptionsDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, result3)
        {
          connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "adoptionsDiv4" ORDER BY `id` DESC LIMIT 1',[],function(err, result4)
          {
            connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "adoptionsImageDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage1)
            {
              connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "adoptionsImageDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage2)
              {
                connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "adoptionsImageDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage3)
                {
                  connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "adoptionsImageDiv4" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage4)
                  {
            return res.render('adoptions',{
               adoptionsDiv1: result1,
               adoptionsDiv2: result2,
               adoptionsDiv3: result3,
               adoptionsDiv4: result4,
               adoptionsImageDiv1: resultImage1,
               adoptionsImageDiv2: resultImage2,
               adoptionsImageDiv3: resultImage3,
               adoptionsImageDiv4: resultImage4,
               admin : req.session.admin,
               user: req.session.user
                });
              });
            });
          });
        });
      });
    });
  });
 });
};

exports.showLostAndFound = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "lostAndFoundDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "lostAndFoundDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, result2)
      {

            return res.render('lostAndFound',{
               lostAndFoundDiv1: result1,
               lostAndFoundDiv2: result2,
               admin : req.session.admin,
               user: req.session.user
             });
           });
    });

};

exports.showGivenGain = function(req,res)
{

    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "givenGainDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "givenGainDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, result2)
      {
        connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "givenGainDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, result3)
        {
          connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "givenGainDiv4" ORDER BY `id` DESC LIMIT 1',[],function(err, result4)
          {
            connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "givenGainDiv5" ORDER BY `id` DESC LIMIT 1',[],function(err, result5)
            {
              connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage1)
              {
                connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv2" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage2)
                {
                  connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv3" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage3)
                  {
                    connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv4" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage4)
                    {
                      connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv5" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage5)
                      {
                        connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "givenGainImageDiv6" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage6)
                        {

            return res.render('GivenGain',
                         {
                           givenGainDiv1: result1,
                           givenGainDiv2: result2,
                           givenGainDiv3: result3,
                           givenGainDiv4: result4,
                           givenGainDiv5: result5,
                           givenGainImageDiv1: resultImage1,
                           givenGainImageDiv2: resultImage2,
                           givenGainImageDiv3: resultImage3,
                           givenGainImageDiv4: resultImage4,
                           givenGainImageDiv5: resultImage5,
                           givenGainImageDiv6: resultImage6,
                           admin : req.session.admin,
                           user: req.session.user
                          });
                        });
                      });
                    });
                  });
                });
              });
           });
         });
       });
     });
  });
};

exports.showInspectors = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "inspectorsDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
      connection.query('SELECT * FROM `updatedimages` WHERE ElementId = "inspectorsImageDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, resultImage1)
      {
               return res.render('inspectors',{
               inspectorsDiv1: result1,
               inspectorsImageDiv1: resultImage1,
               admin : req.session.admin,
               user: req.session.user
             });
           });


    });

};

exports.showContactUs = function(req,res)
{
    connection.query('SELECT * FROM `editablecontent` WHERE ElementId = "contactUsDiv1" ORDER BY `id` DESC LIMIT 1',[],function(err, result1)
    {
               return res.render('contactUs',{
               contactUsDiv1: result1,
               admin : req.session.admin,
               user: req.session.user
             });

    });

};

//UPDATED IMAGES
