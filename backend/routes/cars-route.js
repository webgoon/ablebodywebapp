var express = require('express');
var router = express.Router();
const dbs = require('../models');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

/* POST users listing. */
/* Our backend endpoint to check for users in the database */
router.post('/getCarId:id', function(req, res, next) {
  
  consoele.log('Hit User Register');

});


router.get("/getOrderCarByUserId/:id?", async (req, res, next) => {
  console.log('Hit /getOrderCarByUserId/:id:userToken');
  //console.log(req.route);
  console.log('req.originalUrl', req.originalUrl);
  console.log('req.baseUrl', req.baseUrl);
  console.log('req.path', req.path);
  console.log('req.query.userToken: ', req.query.userToken);
 

  const passedus_userToken = req.query.userToken;
  const passedus_user_id = req.params.id;

  
  console.log('const passedus_userToken: ', passedus_userToken);
  console.log('const passedus_user_id: ', passedus_user_id);
  console.log('req.params.id: ',  req.params.id);
  //next();

  

  const orders = await dbs.Orders_ab.findAll(
    {
      include: [dbs.Users_ab, dbs.Users_ab_cars, dbs.Drivers_ab],
    },
    {
    where: {
      order_accptedByusrid: passedus_user_id
    }
    //order: [['order_id','DESC']]
    
  })
  
  //.then(allOrders => { res.send(allOrders)})
 
 // res.render('discuss', { title: 'AbleBody Car' });
  res.status(200).send(orders);
});

router.get("/getCarId/:id?", (req, res, next) => {
  console.log('Hit /getCarId/:id:userToken');
  //console.log(req.route);
  console.log('req.originalUrl', req.originalUrl);
  console.log('req.baseUrl', req.baseUrl);
  console.log('req.path', req.path);
  console.log('req.query.userToken: ', req.query.userToken);
 

  const passedus_userToken = req.query.userToken;

  
  console.log('const passedus_userToken: ', passedus_userToken);
  console.log('req.params.id: ',  req.params.id);
  next();

  dbs.Users_ab.findAll({
    attributes: {
          exclude: [
                    'user_password', 
                    'user_email',
                    'user_username',
                  ]
    },
    where: { 
      user_id: req.params.id
    },
    include: [ db.Users_ab_cars],
    order: [['user_id','DESC']]
  }).then(ab_car => { res.status(304).send(ab_car)})

 
 // res.render('discuss', { title: 'AbleBody Car' });
});
module.exports = router;
