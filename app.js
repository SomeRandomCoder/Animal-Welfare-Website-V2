var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');
var session = require("express-session");
var bcrypt=require("bcryptjs");
var multer = require('multer');
var flash=require('express-flash');



var adoptions = require('./functions/adoptions');

var login = require("./functions/login");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  // password: "mxmaolqk",
  password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

// app.use(myConnection(mysql, dbOptions, "single"));

// var connection = mysql.createConnection(dbOptions);




app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

app.use(function(req,res,next){
console.log();


  var admin = req.session.admin && req.session.username,
      user =  req.session.username,
      userInSession = req.session.username;
  var generalPath = req.path.split("/")[1] === "events"
              ||req.path.split("/")[1] === "aboutUs"
              || req.path.split("/")[1] === "adoptions"
              || req.path.split("/")[1] === "donations"
              || req.path.split("/")[1] === "lostAndFound"
              || req.path.split("/")[1] === "GivenGain"
              ||req.path.split("/")[1] === "contactUs"
              ||req.path.split("/")[1] === "adoptCat"
              ||req.path.split("/")[1] === "adoptDog"
              ||req.path.split("/")[1] === "inspectors"
              ||req.path.split("/")[1] === "login"
              ||req.path.split("/")[1] === "logout"
              ||req.path.split("/")[1] === "allAnimals"
              || req.path === "/";

  var adminPath = req.path.split("/")[2] === "add"
                || req.path.split("/")[1] === "allAnimals";
// console.log("hello " + req.session.username);
  if(!admin && adminPath){
    res.redirect('/adoptions');
  }
  else
  if (!user && generalPath) {

    next();
}
else
if (user && generalPath) {

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


app.get("/", function(req, res) {
  res.render("index",{admin: req.session.admin, user: req.session.username});
});

app.get("/aboutus", function(req, res) {
  res.render("AboutUs",{admin: req.session.admin, user: req.session.username});
});

app.get("/aboutusindividuals", function(req, res) {
  res.render("AboutUsIndividuals",{admin: req.session.admin, user: req.session.username});
});

app.get("/adoptions", function(req, res) {
  res.render("adoptions",{admin: req.session.admin, user: req.session.username});
});
app.get("/adoptions/add", function(req, res) {
  res.render("addAnimal",{admin: req.session.admin, user: req.session.username});
});
app.post('/adoptions/add',multer({ dest: './public/uploads/'}).single('img') ,adoptions.add);
app.get("/adoptCat", adoptions.showCat);
app.get("/adoptDog", adoptions.showDog);
app.get("/allAnimals", adoptions.showAll);
app.post('/allAnimals/remove/:id', adoptions.remove);

app.get("/donations", function(req, res) {
  res.render("donations",{admin: req.session.admin, user: req.session.username});
});
app.get("/inspectors", function(req, res) {
  res.render("inspectors",{admin: req.session.admin, user: req.session.username});
});

app.get("/events", function(req, res) {
  res.render("events",{admin: req.session.admin, user: req.session.username});
});

app.get("/lostandfound", function(req, res) {
  res.render("lostAndFound",{admin: req.session.admin, user: req.session.username});
});

app.get("/GivenGain", function(req, res) {
  res.render("GivenGain",{admin: req.session.admin, user: req.session.username});
});


app.get("/contactus", function(req, res) {
  res.render("contactUs",{admin: req.session.admin, user: req.session.username});
});



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
