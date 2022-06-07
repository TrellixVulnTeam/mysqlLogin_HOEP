const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
//set database connection. make sure your database credentials are all

const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'userdb',
});

//check if the database is connected else throws an error
db.connect(function (error) {
  if (error) throw error;
  else console.log('Server is running. Database connected successfully!');
});

// the user will use "/" the route, the app will redirect to index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// the submitted data from the index.html form will be passed to our variables “username” “password” to be able to processed by our query
app.post('/', encoder, function (req, res) {
  var user = req.body.username;
  var pass = req.body.password;

  //our query
  db.query(
    'select * from usertable where username=? and password=?',
    [user, pass],
    function (error, results, fields) {
      //check if there is a record on our table then redirect to welcome page, else will be redirected to our index

      if (results.length > 0) {
        res.redirect('/welcome');
      } else {
        res.redirect('/');
      }
      res.end();
    }
  );
});
app.get('/welcome', function (req, res) {
  res.sendFile(__dirname + '/welcome.html');
});

//our port
app.listen(4000);
