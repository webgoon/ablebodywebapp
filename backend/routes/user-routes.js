var express = require('express');
var router = express.Router();
const db = require('../models');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ablebody_ablebodyusr',
  password: 'cGlm3h526P1#3ZhOKL',
  database: 'ablebody_ablebodydb',
});

connection.connect();

// Create a by Random Numbers And Alphabet characters define by length in function
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

console.log('Make Id: '+makeid(20));

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var user_email = req.body.useremail;
  var user_password = req.body.userpassword;
  connection.query("SELECT * FROM `users_ab` WHERE `user_email` = ? AND `user_password` = ?", [user_email, user_password], function(err, row, fields){
    //connection.query("SELECT * FROM `ablebody_ablebodydb`.`users_ab` WHERE `users_ab`.`user_email` = ? AND `users_ab`.`user_password` = ?", [user_email, user_password], function(err, row, 
    if (err) console.log(err);

    if (row.length > 0) {
      res.send({'success': true, 'message': row[0].user_email, 'usrtoken': row[0].user_token});
    }else{
      res.send({'success': false, 'message': 'Get User not found, please try again '+err});
    }
  });

});

/* POST users listing. */
/* Our backend endpoint to check for users in the database */
router.post('/signin', authenticateToken, (req, res, next) => {
  
  var user_email = req.body.useremail;
  console.log('server posted user_email: '+JSON.stringify(req.body));
  console.log('server posted req: user_email: '+req.body.useremail);
  console.log('server posted res: user_email: '+req.body.useremail);
  // HOMEWORK! Encrypt the password for the user, instead of plain text
  // -- demonstrational purposes.
  var user_password = req.body.password;
  console.log('server posted user_password: '+user_password);
  connection.query("SELECT * FROM `users_ab` WHERE `user_email` = ?  AND `user_password` = ? ", [user_email, user_password], function(err, row, fields){
    //connection.query("SELECT * FROM `users_ab` WHERE `user_email` = 'testmyemail@hoymail.com' AND `user_password` = 'mypassword'", function(err, row, fields){
    //connection.query("SELECT * FROM `ablebody_ablebodydb`.`users_ab` WHERE `users_ab`.`user_email` = ? AND `users_ab`.`user_password` = ?", [user_email, user_password], function(err, row, 
    if (err) console.log(err);

    if (row.length > 0) {
      res.status(200).send({'success': true, 'usrid': row[0].user_id, 'message': row[0].user_email, 'usrtoken': row[0].user_token});
      console.log('server_response for message user_id: ' + row[0].user_id);
    }else{
      res.send({'success': false, 'message': 'Post User not found, please try again'});
    }
  });

});


/* POST users listing. */
/* Our backend endpoint to check for users in the database */
router.post('/login', function(req, res, next) {
  const user_email = req.body.user_email;
  const user_phoneno = req.body.user_phoneno;
  const user_password = req.body.user_password;
  const user = { name: user_email, }

  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ access_token: access_token })
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['Authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null)return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err)return res.sendStatus(403)
    req.user = user
    next();
  })
}

/* POST users listing. */
/* Our backend endpoint to check for users in the database */
router.post('/register', function(req, res, next) {
  consoele.log('Hit User Register');
  
  var user_token = makeid(20);

  const username = req.body.username;
  const user_firstname = req.body.user_firstname;
  const user_midname = req.body.user_midname;
  const user_lastname = req.body.user_lastname;
  const user_phoneno = req.body.user_phoneno;
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;

  db.Users_ab.create({
    user_token: user_token,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_phoneno: req.body.user_phoneno,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_username: req.body.user_username,
    user_hirerating: req.body.user_hirerating,
    user_earnrating: req.body.user_earnrating

  }).then( submitedNewUser => { res.status(200).send(submitedNewUser)});

});

module.exports = router;
