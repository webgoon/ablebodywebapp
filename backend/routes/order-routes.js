const express = require('express');
const router = express.Router();
const db = require('../models');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const drivers_ab = require('../models/drivers_ab');
const drivers_ab_cars = require('../models/drivers_ab_cars');

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

console.log('Order.js Make Id: '+makeid(20));


router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able')
  console.log('Hit Pure order /');
  //db.Orders_ab.findAll().then(allOrders => { res.send(allOrders)})
  res.render('discuss', { title: 'AbleBody Order' });
});

/* router.get('/all', function(req, res, next) {
  console.log('Hit /all');

  db.Todo.findAll().then(todos => { res.send(todos)})
  
 // res.render('discuss', { title: 'AbleBody Order' });
}); */

router.get("/find/:id", (req, res) => {
  console.log('Hit orders /find/:id');

  db.Orders_ab.findAll({
    include: [db.Users_ab, drivers_ab, drivers_ab_cars],
    where: { 
      order_id: req.params.id
    }
  }).then(AllOrders => { res.send(AllOrders)})
  
 // res.render('discuss', { title: 'AbleBody Order' });
});

router.post("/new", (req, res) => {

  console.log('Create New Order Post New /new req', req);
  var order_token = makeid(20);

  db.Orders_ab.create({
    order_token: order_token,
    order_typeId: req.body.order_typeId,
    order_status: req.body.order_status,
    order_title: req.body.order_title,
    order_startInstructs: req.body.order_startInstructs,
    order_startedByusrid: req.body.order_startedByusrid,
    order_startLat: req.body.order_startLat,
    order_startLong: req.body.order_startLong,
    order_endLat: req.body.order_endLat,
    order_endLong: req.body.order_endLong,
    order_paidAmount: req.body.order_paidAmount,
    order_paidStatus: req.body.order_paidStatus,
    order_abcomisnAmt: req.body.order_abcomisnAmt,
    order_payoutAvail: req.body.order_payoutAvail

  }).then( submitedOrder => { res.send(submitedOrder)});
  

});

// Old Fashion Mysql
router.post("/CreateOrder", (req, res) => {
  console.log('Hit CreateOrder');
  console.log(req.body)

/*  var order_token = req.body.order_token;
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
  var order_payoutAvail = req.body.order_payoutAvail; */

  db.orders_ab.create({
    
    order_token: req.body.order_token,
    order_typeId: req.body.order_typeId,
    order_status: req.body.order_status,
    order_title: req.body.order_title,
    order_startInstructs: req.body.order_startInstructs,
    order_startedByusrid: req.body.order_startedByusrid,
    order_startLat: req.body.order_startLat,
    order_startLong: req.body.order_startLong,
    order_endLat: req.body.order_endLat,
    order_endLong: req.body.order_endLong,
    order_paidAmount: req.body.order_paidAmount,
    order_paidStatus: req.body.order_paidStatus,
    order_abcomisnAmt: req.body.order_abcomisnAmt,
    order_payoutAvail: req.body.order_payoutAvail
    
  }).then( submitedCreateOrder => { res.send(submitedCreateOrder)});
  

  
});



/* 

  router.get('/all', (req, res) => {
  console.log('Hit Order All');

  db.Orders_ab.findAll({
    include: [db.Users_ab_cars, db.Users_ab]
  }).then(allUsers => res.send(allUsers))

  console.log('Hit /all');
  //db.Todo.findAll().then(todos => { res.send(todos)})
  db.Orders_ab.findAll().then(allOrders => { res.send(allOrders)})

  
  });

*/



router.delete("/delete/:id", (req, res) => {
  console.log('Hit delete/:id');

  db.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => { res.send('success')});

});

// How to edit A todo
router.put('/edit/', (req, res) => {
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



module.exports = router;
