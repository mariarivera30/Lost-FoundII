
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();

var pg = require("pg");


var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";

var client = new pg.Client(conString);
client.connect();


// all environments
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
 });


//gets
app.get('/', routes.index);
app.get('/allUsers', routes.getUsers);
app.get('/allItems', routes.getItems);
app.get('/allCategories', routes.getCategories);
app.get('/allLostItems', routes.getLostItems);
app.get('/allFoundItems', routes.getFoundItems);
app.get('/allComments/:id', routes.getComments);
app.get('/anUser/:id', routes.getUserAdmin);

//posts
app.post('/aCategories',routes.postCategories);

//deletes
app.delete('/deleteCategory/:id', routes.deleteCategory);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



