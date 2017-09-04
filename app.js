var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');
var session = require("express-session");
var bcrypt=require("bcryptjs");
var multer = require('multer');
var flash=require('express-flash');


// var co = require("co");
var app = express();


var adoptions = require('./functions/adoptions');
var mailer = require('./functions/mailer');
var eventCRUD = require('./functions/eventCRUD');
var animalDonations = require('./functions/AnimalDonations');
var contentUpdate = require("./functions/ContentUpdate");

var login = require("./functions/login");

app.use(bodyParser.json({
  limit: 10000000
}));
app.use(bodyParser.urlencoded({
  keepExtensions: true,
  extended: false
}));





app.use(flash());

app.use(express.static("public"));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie:{

    maxAge: 600000
  }
}));

var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

app.use(myConnection(mysql, dbOptions, "single"));

app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(function(req,res,next){

  var admin = req.session.admin && req.session.username,
      user =  req.session.username,
      userInSession = req.session.username;

  var generalPath = req.path.split("/")[1] === "news"
              ||req.path.split("/")[1] === "aboutUs"
              || req.path.split("/")[1] === "adoptions"
              || req.path.split("/")[1] === "donations"
              || req.path.split("/")[1] === "lostAndFound"
              || req.path.split("/")[1] === "GivenGain"
              || req.path.split("/")[1] === "contactUs"
              || req.path.split("/")[1] === "adoptCat"
              || req.path.split("/")[1] === "adoptDog"
              || req.path.split("/")[1] === "inspectors"
              || req.path.split("/")[1] === "login"
              || req.path.split("/")[1] === "logout"
              || req.path.split("/")[1] === "allAnimals"
              || req.path.split("/")[1] === "directions"
              || req.path.split("/")[1] === "Events"
              || req.path.split("/")[1] === "addEvent"
              || req.path.split("/")[1] === "adoptCatSearch"
              || req.path.split("/")[1] === "donationsCapture"
              || req.path.split("/")[1] === "update"
              || req.path.split("/")[1] === "updateImage"

              || req.path === "/";



  var adminPath = req.path.split("/")[2] === "add"
                ||req.path.split("/")[2] === "update"

               //||req.path.split("/")[1] === "Comments"
               || req.path.split("/")[1] === "allAnimals";

// console.log("hello " + req.session.username);
  if(!admin && adminPath)
    {
     res.redirect('/');
    }
  else if (!user && generalPath)
   {
     next();
   }
  else if (user && generalPath)
  {
    next();
  }

});



app.post('/login', login);
app.get('/login', function(req, res){
  res.render('login',{admin: req.session.admin, user: req.session.username});
});
app.get('/logout', function(req, res) {
    delete req.session.username;
    delete req.session.admin;
    res.redirect('/');
});

app.get("/donationsCapture", function(req,res){
  res.render("donationsCapture",{admin:req.session.admin, user:req.session.username});
});

app.get("/", contentUpdate.showIndex);

app.get('/aboutUs', contentUpdate.showAboutUs);

app.get("/update", function(req, res) {
  res.render("updateAboutUs",{admin: req.session.admin, user: req.session.username});
});
app.get("/updateImage", function(req,res){
  res.render("updateImage", {admin:req.session.admin, user: req.session.username});
})

// app.post("/images/update",multer({ dest: './public/updatedImages/'}).single('img') , contentUpdate.addImage);

app.post("/update/content/", contentUpdate.addContent);

app.get("/news", contentUpdate.showNews);
app.get("/adoptions", contentUpdate.showAdoptions);

app.get("/adoptions/add", function(req, res) {
  res.render("addAnimal",{admin: req.session.admin, user: req.session.username});
});

app.get("/lostandfound", contentUpdate.showLostAndFound);

app.get("/GivenGain", contentUpdate.showGivenGain);

app.get("/inspectors", contentUpdate.showInspectors);

app.post("/updateImage/add",multer({ dest: './public/uploads/'}).single('img') ,contentUpdate.addImage);
app.post('/adoptions/add',multer({ dest: './public/uploads/'}).single('img') ,adoptions.add);

 app.get("/adoptCat", adoptions.showCat);
  app.get("/adoptCat/search/:searchVal", adoptions.searchCat);
  app.post("/adoptCat/search/", adoptions.searchCat);

app.get("/adoptDog", adoptions.showDog);
app.get("/adoptDog/search/:searchVal", adoptions.searchDog);
app.post("/adoptDog/search/", adoptions.searchDog);

app.get("/allAnimals", adoptions.showAll);
app.post('/allAnimals/remove/:id', adoptions.remove);
app.get("/allAnimals/search/:searchVal", adoptions.allAnimalsRefCode);
app.post("/allAnimals/search/", adoptions.allAnimalsRefCode);

app.get('/Events', eventCRUD.showAll);
app.post('/Events/addEvent', eventCRUD.add);
app.post('/Events/remove/:id', eventCRUD.remove);
app.get("/addEvent", function(req,res){
  res.render("addEvent",{admin: req.session.admin, user: req.session.username});
});

app.post("/inspectors", mailer.contactInspectors)

app.get("/contactUs", contentUpdate.showContactUs);
app.post('/contactus', mailer.contactUs);

app.get("/directions", function(req,res){
  res.render("directions",{admin: req.session.admin, user: req.session.username});
});













var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
