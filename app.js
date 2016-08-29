var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');
var session = require("express-session");
var bcrypt=require("bcryptjs");
var flash=require('express-flash');


var signup = require("./functions/signup");
var adoptions = require('./functions/adoptions');
var users = require("./functions/users");
var login = require("./functions/login");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

var dbOptions = {
  // host: "localhost",
  // user: 'root',
  // password: "mxmaolqk",
  // port: 3306,
  // database: 'nelisaDB'
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
  var isAdmin = req.session.admin && req.session.username,
      isUser = !req.session.admin && req.session.username,
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
              || req.path === "/";


  var adminPath = req.path.split("/")[1] === "events"
              ||req.path.split("/")[1] === "aboutUs"
              || req.path.split("/")[1] === "adoptions"
              || req.path.split("/")[1] === "donations"
              || req.path.split("/")[1] === "lostAndFound"
              || req.path.split("/")[1] === "GivenGain"
              ||req.path.split("/")[1] === "contactUs"
              ||req.path.split("/")[1] === "inspectors"
              ||req.path.split("/")[1] === "adoptCat"
              ||req.path.split("/")[1] === "adoptDog"
              || req.path.split("/")[1] === "adoptions/add"
              || req.path === "/";



  if (!userInSession && generalPath) {
    next();
  }
  else
  if (isUser && generalPath) {
    console.log("IS USER AND GENERAL PATH MOVING ON TO NEXT MIDDLEWARE");
    next();
  } else if (isUser && adminPath) {
    console.log("IS USER BUT ATTEMPTING TO GO TO ADMIN PATH REDIRECTING PATH TO '/'");
    res.redirect("/");
  } else if (isAdmin && (adminPath || generalPath)) {
    console.log("IS ADMIN AND PATH IS ADMIN OR GENERAL. MOVING ON TO NEXT MIDDLEWARE");
    next();
  }

});


app.get("/login", function(req, res, next){
  console.log("DIRECTED TO LOG IN ROUTE");
  req.getConnection(function(err, connection){
    // connection = mysql.createConnection(dbOptions);
    if(err) return next(err);
    console.log("RENDERING LOG IN PAGE ");
    res.render("login");
  });
});
app.post('/login', login);

app.get('/logout', function(req, res) {
    delete req.session.username;
    delete req.session.admin;
    res.redirect('/login');
});


app.get("/", function(req, res) {
  res.render("index");
});

app.get("/aboutus", function(req, res) {
  res.render("AboutUs");
});

app.get("/aboutusindividuals", function(req, res) {
  res.render("AboutUsIndividuals");
});

app.get("/adoptions", function(req, res) {
  res.render("adoptions");
});
app.get("/adoptions/add", function(req, res) {
  res.render("addAnimal");
});
app.post('/adoptions/add', adoptions.add);
app.get("/adoptCat", function(req, res) {
  res.render("adoptCat");
});
app.get("/adoptDog", function(req, res) {
  res.render("adoptDog");
});

app.get("/donations", function(req, res) {
  res.render("donations");
});
app.get("/inspectors", function(req, res) {
  res.render("inspectors");
});

app.get("/events", function(req, res) {
  res.render("events");
});

app.get("/lostandfound", function(req, res) {
  res.render("lostAndFound");
});

app.get("/GivenGain", function(req, res) {
  res.render("GivenGain");
});


app.get("/contactus", function(req, res) {
  res.render("contactUs");
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
