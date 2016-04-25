var express = require('express');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var MulterImpl  = require('./multerImpl');
var bodyParser = require('body-parser');
var app = express();

var USERS_FILE = path.join(__dirname, 'users.json');
var SECTIONS_FILE = path.join(__dirname, 'sections.json');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
  next();
});

app.set('port', process.env.PORT || 6069);
//app.use(express.static('./'));
//app.use(new MulterImpl({}).init());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data){
    if (err) {console.log("GET USERS", err);}
    res.setHeader('Cache-control', 'no-cache');
    res.json(JSON.parse(data));
  });
  console.log("GET USERS", req);
});

app.get('/api/user/:id', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data){
    if (err) {console.log("GET USER"+id, err);}
    res.setHeader('Cache-control', 'no-cache');
    var users = JSON.parse(data);
    //var user = _.find(users, { 'id': req.params.id })
    var user = users[req.params.id ];
    res.json(user);
  });
  console.log("GET USER ", req.params.id);
});

app.post('/upload', function(req, res) {
  console.log("IMAGE UPLOAD USER", req.files);
  if (req.body) {
      console.dir(req.body);
  }
  res.sendStatus(200);
});

app.post('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data){
    var users = JSON.parse(data);
    var user = req.body;
    var oldUserIndex = _.findIndex(users, {id:user.id});
    console.log('EXISTS old user index :',oldUserIndex);
    if (oldUserIndex !== -1){
      console.log("I'm in the UPDATE conditional");
      //users.splice(oldUserIndex,1,user);
      users[oldUserIndex] = user;
    } else {
      console.log("I'm in the ADD conditional");
      users.unshift(user);
    }
    fs.writeFile(USERS_FILE, JSON.stringify(users), function(err){
      res.setHeader('Cache-control', 'no-cache');
      res.json(users);
    });
  });
  console.log("POST USER", req);
});

app.delete('/api/users/:id', function(req,res) {
  fs.readFile(USERS_FILE, function(err, data){
    var users = JSON.parse(data);
    // var qstr = req.query.id;
    var i = _.findIndex(users, {id:req.params.id});
    users.splice(i,1);
    fs.writeFile(USERS_FILE, JSON.stringify(users), function(err){
      res.setHeader('Cache-control', 'no-cache');
      res.json(users);
    });
  });
  console.log("DELETE USER ", req);
});

app.get('/api/sections', function(req, res) {
    console.log("GET ", req);
    fs.readFile(SECTIONS_FILE, function(err, data){
      res.setHeader('Cache-control', 'no-cache');
      res.json(JSON.parse(data));
    });
    console.log("GET SECTIONS", req);
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
