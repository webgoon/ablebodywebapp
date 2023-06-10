const express = require('express');
const router = express.Router();
const db = require('../models');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


/* var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ablebody_ablebodyusr',
  password: 'cGlm3h526P1#3ZhOKL',
  database: 'ablebody_ablebodydb',
});

connection.connect(); */



router.get("/", function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able')
  res.render('discuss', { title: 'AbleBody Order' });
});

router.get("/all", (req, res, next) => {
  console.log('Hit /all');

  db.Todo.findAll().then(todos => { res.send(todos)})
  
 // res.render('discuss', { title: 'AbleBody Order' });
});

router.get("/find/:id", (req, res) => {
  console.log('Hit /find/:id');

  db.Todo.findAll({
    where: { 
      id: req.params.id
    }
  }).then(todos => { res.send(todos)})
  
 // res.render('discuss', { title: 'AbleBody Order' });
});

router.post("/new", (req, res) => {

  console.log('Hit Post New /new');

  db.Todo.create({
    text: req.body.text
  }).then( submitedTodo => { res.send(submitedTodo)});
  
 
});


router.delete("/delete/:id", (req, res) => {
  console.log('Hit delete/:id');

  db.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => { res.send('success')});

});

// How to edit A todo
router.put("/edit/", (req, res) => {
    console.log('Hit edit/');
    // its gonna take in two objects
    //db.update({}, {})

    db.Todo.update({
      text: req.body.text
    }, 
    {
      where: {
        id: req.body.id
      }
    }
  ).then(() => res.send('success')); 


});


// Old Fashion Mysql
router.post("/CreateOrder", function(req, res, next) {
  console.log('Hit CreateOrder');
  console.log(req.body)

  var order_token = req.body.order_token;
  var order_typeId = req.body.order_typeId;
  var order_status = req.body.order_status;
  var order_title = req.body.order_title;
  var order_startInstructs = req.body.order_startInstructs;

  var order_startedByusrid = req.body.order_startedByusrid;

  var order_startLat = req.body.order_startLat;
  var order_startLong = req.body.order_startLong;
  var order_endLat = req.body.order_endLat;
  var order_endLong = req.body.order_endLong;
  var order_paidAmount = req.body.order_paidAmount;
  var order_paidStatus = req.body.order_paidStatus;
  var order_abcomisnAmt = req.body.order_abcomisnAmt;
  var order_payoutAvail = req.body.order_payoutAvail;
  

  // connection.query(`INSERT INTO oders_ab SET 
  // order_token = ${order_token},
  // order_typeId = ${order_typeId},
  // order_status = ${order_status},
  // order_title = ${order_title},
  // order_startInstructs = ${order_startInstructs},
  // order_startedByusrid = ${order_startedByusrid},
  // order_startLat = ${order_startLat},
  // order_startLong = ${order_startLong},
  // order_endLat = ${order_endLat},
  // order_endLong = ${order_endLong},
  // order_paidAmount = ${order_paidAmount},
  // order_paidStatus = ${order_paidStatus},
  // order_abcomisnAmt = ${order_abcomisnAmt},
  // order_payoutAvail = ${order_payoutAvail},

/*   connection.query("INSERT INTO oders_ab Values `order_token` = ? ", [order_token], function(err, row, fields){

    if (err) console.log(err);

    if (row.length > 0) {
      res.send({'success': true, 'order_id': row[0].order_id, 'message': row[0].order_id, 'order_token': row[0].order_token});
      console.log('server_response for message order_startedByusrid: ' + row[0].order_startedByusrid);
    }else{
      res.send({'success': false, 'message': 'Post Order Creation was not successful, please try again'});
    }
  }); */




  //res.render('index', { title: 'Express For AbleBody' });
 // res.send('Hello Some Body Able')
 res.send({'success': true, 'message': 'Creating Order As You Wished '});
  
});

module.exports = router;
