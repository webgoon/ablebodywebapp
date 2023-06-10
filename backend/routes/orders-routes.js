const express = require('express');
const router = express.Router();
const path = require("path");
const db = require('../models');

const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ablebody_ablebodyusr',
  password: 'cGlm3h526P1#3ZhOKL',
  database: 'ablebody_ablebodydb',
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  console.log('Hit Pure orders /');

  db.Orders_ab.findAll().then(allOrders => { res.send(allOrders)})

});


router.get("/user/:id", async(req, res, next) => {
  console.log('Hit Get Users Orders orders/user/:id');
  console.log('Line 34: ', req.params)

  db.Orders_ab.findAll({
    
    where: {
      UsersAbUserId: req.params.id,
      //order_status: 'PENDING'
      },
    include: [ db.Users_ab_cars],
    include: [
      {
        model:  db.Users_ab,
        attributes: {
          exclude: [
                    'user_password',
                  ]
        },
      },
      { 
        model: db.Users_ab_cars
      }
    ]
    
    
  }).then(allOrders => { res.send(allOrders)})

  //res.send({ status: 'OK' });
});

router.get("/all", (req, res) => {
  console.log('Hit Orders All');

  /* db.Orders_ab.findAll().then(allOrders => { res.send(allOrders)})   */

  console.log('Hit /all');
  
  db.Orders_ab.findAll({
    //include: [ db.Users_ab, db.Users_ab_cars]
    include: [
      {
        model:  db.Users_ab,
        attributes: {
          exclude: [
                    'user_password',
                    'user_phoneno',
                    'user_email',
                    'user_username',
                  ]
        },
      }
    ]
  }).then(allOrders => { res.send(allOrders)})

  
});

/* POST users listing. */
/* Our backend endpoint to check for users in the database */
router.post("/", function(req, res, next) {
  
  var user_email = req.body.useremail;
  console.log('server posted user_email: '+JSON.stringify(req.body));
  console.log('server posted req: user_email: '+req.body.useremail);
  // HOMEWORK! Encrypt the password for the user, instead of plain text
  // -- demonstrational purposes.
  var user_password = req.body.password;
  console.log('server posted user_password: '+user_password);
  connection.query("SELECT * FROM `users_ab` WHERE `user_email` = ?  AND `user_password` = ? ", [user_email, user_password], function(err, row, fields){
    //connection.query("SELECT * FROM `users_ab` WHERE `user_email` = 'testmyemail@hoymail.com' AND `user_password` = 'mypassword'", function(err, row, fields){
    //connection.query("SELECT * FROM `ablebody_ablebodydb`.`users_ab` WHERE `users_ab`.`user_email` = ? AND `users_ab`.`user_password` = ?", [user_email, user_password], function(err, row, 
    if (err) console.log(err);

    if (row.length > 0) {
      res.send({'success': true, 'usrid': row[0].user_id, 'message': row[0].user_email, 'usrtoken': row[0].user_token});
      console.log('server_response for message user_id: ' + row[0].user_id);
    }else{
      res.send({'success': false, 'message': 'Post User not found, please try again'});
    }
  });

});

module.exports = router;
