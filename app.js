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

// app.use(function(req,res,next){
//   var isAdmin = req.session.admin && req.session.username,
//       isUser = !req.session.admin && req.session.username,
//       userInSession = req.session.username,
//       pathIsLogin = req.path === "/login",
//       pathIsSignUp = req.path === "/signup";
//
// // console.log("LOOPING THROUGH FOR THE %d TIME", ++track);
// console.log("IS ADMIN", isAdmin);
// console.log("IS USER", isUser);
// console.log("USER IN SESSION", userInSession);
// console.log("PATH IS LOGIN", pathIsLogin);
// console.log("PATH IS SIGN UP", pathIsSignUp);
// console.log("THIS IS REQ.PATH", req.path);
// console.log("THIS IS REQ.PATH.SPLIT", req.path.split("/")[1]);
//
//   var generalPath = req.path.split("/")[1] === "login"
//               || req.path.split("/")[1] === "logout"
//               || req.path.split("/")[1] === "signup"
//               || req.path.split("/")[1] === "events"
//               || req.path.split("/")[1] === "adoptions"
//               || req.path.split("/")[1] === "donations"
//               || req.path.split("/")[1] === "lostAndFound"
//               || req.path.split("/")[1] === "GivenGain"
//               ||req.path.split("/")[1] === "contactUs"
//               || req.path === "/";
//
//
//   var adminPath = req.path.split("/")[1] === "editEvents"
//                || req.path.split("/")[1] === "editAdoptionss"
//                || req.path.split("/")[1] === "editComments"
//
//                || req.path.split("/")[1] === "users";

  // if (!userInSession && req.path==="/") {
  //   console.log("USER NOT SIGNED UP OR LOGGED IN REDIRECTING TO SIGNUP/LOGIN");
  //     res.redirect("/login");
  // } else
  // if (!userInSession && (pathIsLogin || pathIsSignUp)) {
  //   next();
  // }
  // else
  // if (isUser && generalPath) {
  //   console.log("IS USER AND GENERAL PATH MOVING ON TO NEXT MIDDLEWARE");
  //   next();
  // } else if (isUser && adminPath) {
  //   console.log("IS USER BUT ATTEMPTING TO GO TO ADMIN PATH REDIRECTING PATH TO '/'");
  //   res.redirect("/");
  // } else if (isAdmin && (adminPath || generalPath)) {
  //   console.log("IS ADMIN AND PATH IS ADMIN OR GENERAL. MOVING ON TO NEXT MIDDLEWARE");
  //   next();
  // }

// });

app.get("/signup", function(req, res, next){
  console.log("DIRECTED TO SIGNUP ROUTE");
  req.getConnection(function(err, connection){
    // connection = mysql.createConnection(dbOptions);
    if(err) return next(err);
    console.log("RENDERING SIGNUP PAGE");
    res.render("signup");
  });
});

app.post('/signup', signup);

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
app.get("/adoptCat", function(req, res) {
  res.render("adoptCat");
});
app.get("/adoptDog", function(req, res) {
  res.render("adoptDog");
});

app.get("/donations", function(req, res) {
  res.render("donations");
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

// app.get("/sales", function(req, res, next){
//   req.getConnection(function(err, connection) {
//       connection = mysql.createConnection(dbOptions);
//       if (err) return next(err);
//       connection.query("SELECT   DATE_FORMAT(sales.date,'%d %b %y') as date,sales.id, sales.product_id, sales.sold, sales.price ,products.product FROM sales, products WHERE sales.product_id = products.id AND sales.sold > 0 ORDER BY `sales`.`date` ASC ", function(err, data) {
//             if (err) return next(err);
//           if (err) return next(err);
//           res.render("sales", {
//               sales: data
//           });
//           // connection.end();
//       });
//   });
// });
//
// app.get('/categories', function(req, res, next) {
//     req.getConnection(function(err, connection) {
//       connection = mysql.createConnection(dbOptions);
//         // connection = mysql.createConnection(dbOptions);
//         if (err) return next(err);
//         connection.query("SELECT categories.id, categories.category FROM categories", [],function(err, data) {
//             if (err) return next(err);
//             res.render("categories", {
//                 categories: data
//             });
//             // connection.end();
//         });
//     });
// });
//
// app.get('/products', function(req, res, next) {
//     req.getConnection(function(err, connection) {
//         connection = mysql.createConnection(dbOptions);
//         if (err) return next(err);
//         connection.query("SELECT products.id, products.product ,categories.category FROM products, categories WHERE products.category_id = categories.id  ORDER BY `products`.`id` ASC ", [], function(err, data) {
//
//             if (err) return next(err);
//             res.render("products", {
//                 products: data
//
//             });
//             // connection.end();
//         });
//     });
// });
//
// app.get("/purchases", function(req, res, next){
//   req.getConnection(function(err, connection) {
//       connection = mysql.createConnection(dbOptions);
//       if (err) return next(err);
//         connection.query("SELECT DATE_FORMAT(purchases.Date,'%d %b %y') as Date,purchases.id, products.product, purchases.stockItem, purchases.quantity, purchases.cost ,purchases.shop FROM purchases, products WHERE purchases.product_id = products.id ORDER BY `purchases`.`Date` ASC ", function(err, data) {
//             if (err) return next(err);
//           // if (err) return next(err);
//           res.render("purchases", {
//               purchases: data
//           });
//           // connection.end();
//       });
//   });
//
// });
//
// app.get("/users", function(req, res, next){
//   req.getConnection(function(err, connection) {
//       connection = mysql.createConnection(dbOptions);
//       if (err) return next(err);
//         connection.query("SELECT users.id, users.username, users.locked, users.admin FROM users ORDER BY users.id", function(err, data) {
//             if (err) return next(err);
//           // if (err) return next(err);
//           res.render("users", {
//               users: data
//           });
//           // connection.end();
//       });
//   });
//
// });

// app.get('/sales/addSales', salesCRUD.showAdd);
// app.post('/sales/addSales', salesCRUD.add);
// app.get('/sales/delete/:id', salesCRUD.delete);
// app.get('/sales/editSales/:id', salesCRUD.get);
// app.post('/sales/update/:id', salesCRUD.update);
//
// app.get('/products/addProduct', productsCRUD.showAdd);
// app.post('/products/addProduct', productsCRUD.add);
// app.get('/products/delete/:id', productsCRUD.delete);
// app.get('/products/editProduct/:id', productsCRUD.get);
// app.post('/products/update/:id', productsCRUD.update);
//
// app.get('/purchases/addPurchases', purchaseCRUD.showAdd);
// app.post('/purchases/addPurchases', purchaseCRUD.add);
// app.get('/purchases/delete/:id', purchaseCRUD.delete);
// app.get('/purchases/editPurchases/:id', purchaseCRUD.get);
// app.post('/purchases/update/:id', purchaseCRUD.update);
//
// app.get('/categories/addCategory', categoriesCRUD.showAdd);
// app.post('/categories/addCategory', categoriesCRUD.add);
// app.get('/categories/delete/:id', categoriesCRUD.delete);
// app.get('/categories/editCategory/:id', categoriesCRUD.get);
// app.post('/categories/update/:id', categoriesCRUD.update);
// // app.post('/functions/categoriesCRUD', categoriesCRUD.add);
//
// app.get('/users', usersCRUD.show);
// app.get('/users/addUser', usersCRUD.showAdd);
// app.post('/users/addUser', usersCRUD.add);
// app.get('/users/delete/:id', usersCRUD.delete);
// app.get('/users/editUsers/:id', usersCRUD.get);
// app.post('/users/update/:id', usersCRUD.update);
// app.get('/users/search/:searchVal', users.search);




var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
