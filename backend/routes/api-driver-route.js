var express = require('express');
const session = require('express-session');
var router = express.Router();
const path = require("path");
const dbs = require('../models');
const db = require("../database");
var mysql = require('mysql');

const myPath  = '../public/uploads/';




/* var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ablebody_ablebodyusr',
  password: 'cGlm3h526P1#3ZhOKL',
  database: 'ablebody_ablebodydb',
}); */




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

console.log('Api Make Id: '+makeid(20));

/* GET Api page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proceed No Further' });
  //res.send('Hello Some Body Able This Is Your api...');
  //res.send(200);
 
});

router.get('/:id', async(req, res, next) => {
  console.log('HIT GET api/driver: req.body: ', req.body);
  console.log('HIT GET api/driver: req.params.id: ', req.params.id);
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  const foundDriver = await dbs.Drivers_ab.findOne(
    {
      attributes: {
      exclude: [
                'driver_password',
              ]
    },
      where : {driver_id: req.params.id}
    }
  ).then(serverDriver => { res.status(200).send(serverDriver)});
  
  //res.send(200);
});

router.post('/signin', async(req, res, next) => {
  console.log('HIT POST api/driver/signin:', req.body);
  // res.send(200);
  const foundUser = await dbs.Drivers_ab.findOne(
          {
            where : {driver_email: req.body.driver_email}
          }
  );

 
  if(foundUser){
    console.log('Server driver_id: ', foundUser.driver_id);
    console.log('Server driver_token: ', foundUser.driver_token);
    const driver = await dbs.Drivers_ab.findOne(
      {
        where: {
          driver_email: req.body.driver_email,
          driver_password: req.body.driver_password
          }
      }
    );
    if(driver){
      res.json({ 
          status : "OK", 
          driver_id:  driver.driver_id, 
          driver_token: driver.driver_token,
          driver_firstname: driver.driver_firstname, 
          driver_lastname: driver.driver_lastname, 
          driver_phoneno: driver.driver_phoneno,
          driver_email: driver.driver_email,
          driver_drivername: driver.driver_drivername,
          driver_hireDriverIsOnline: driver.driver_hireDriverIsOnline,
          driver_hirerating: driver.driver_hirerating,
          driver_earnrating: driver.driver_earnrating,
          createdAt: driver.createdAt,
        });

          req.session.isAuth = true;
          req.session.driver = driver;

    }else{
      res.json({ status : "ERROR", error : "Incorrect Credentials" });
    }

  }else{
    res.json({ status : "ERROR", error : "Email Not On File" });
  }
      
});

router.get('/signin/old', function(req, res, next) {
  console.log('HIT api/driver/signin:', req.body);
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  //res.json({ route: 'Posts' });
  //  var driver_email = req.body.useremail;
  //  var driver_password = req.body.userpassword;
  console.log('api user/signin', req.body);
  const { driver_email, driver_password } = req.body;
  
  if(driver_email && driver_password){
    
    db.promise().query("SELECT * FROM `Drivers_ab` WHERE `driver_email` = ? AND `driver_password` = ?", [driver_email, driver_password], function(err, row, fields){
      //connection.query("SELECT * FROM `ablebody_ablebodydb`.`Drivers_ab` WHERE `Drivers_ab`.`driver_email` = ? AND `Drivers_ab`.`driver_password` = ?", [driver_email, driver_password], function(err, row, fields){
        if (err) console.log(err);
        
        if (row.length > 0) {
          req.session.isAuth = true;


          res.send({'success': true, 'message': row[0].driver_email, 'driver_token': row[0].driver_token});
        }else{
        res.send({'success': false, 'message': 'Get User not found, please try again '+err});
      }
    });
    
  }
  
});

router.get('/posts', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  res.json({ route: 'Posts' });
});

router.post('/register', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  
  const { driver_firstname, driver_lastname, driver_email, driver_phoneno, driver_password } = req.body;
  if(driver_email && driver_password && driver_phoneno && driver_firstname && driver_lastname){
   
    var driver_token = makeid(20);
    console.log('driver_token: '+driver_token);
    try {

      db.promise().query("INSERT INTO  `Drivers_ab` SET `driver_token` = ? , `driver_firstname` = ? , `driver_lastname` = ?  , `driver_phoneno` = ? ,  `driver_email` = ? , `driver_password` = ?", [driver_token, driver_firstname, driver_lastname, driver_phoneno, driver_email, driver_password], function(err, row, fields){

      

      });
      
      res.status(201).send({ msg: 'Created User' });
      

    } catch (error) {
      console.log('try catch error:'+error);
    }
  }
});



router.get('/uploadimage', function(req, res, next) {
  console.log('Get user Image Hitted Directory: ');
  
  res.header("Content-Type",'application/json');
  return res.status(200).send('Files were uploaded');
});

router.put('/goOnline', async(req, res) => {
  console.log('Server Hit user/goOnline! ');
  console.log('req.body ', req.body);

  const foundCar = await dbs.Drivers_ab_cars.findOne(
    {
      where : {users_car_usr_id: req.body.driver_id}
    }
  );

  if(foundCar){

    dbs.Drivers_ab_cars.update({
        users_car_isActive: req.body.users_car_isActive
      }, 
      {
        where: {
          users_car_id: foundCar.users_car_id
        }
      }
    )

  }

  

  dbs.Drivers_ab.update({
    driver_hireDriverIsOnline: req.body.driver_hireDriverIsOnline
  }, 
  {
    where: {
      driver_id: req.body.driver_id
    }
  }
).then(() => res.send('success')); 
//).then( submitedgoOnline => { res.send(submitedgoOnline)});


});



router.get('/users', async (req, res, next) => {
  console.log('Server Hit Get Users! ');
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is Your User api...')
  const results = await db.promise().query('SELECT driver_id, driver_token, driver_firstname, driver_lastname, driver_phoneno, driver_email  FROM `Drivers_ab`');
  console.log(results[0]);
  res.status(200).send(results[0]);
});

router.get('/users/cars',  async (req, res, next) => {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Car For Users Api...');
  const results = await db.promise().query('SELECT *  FROM `Drivers_ab_cars`');
  console.log(results[0]);
  res.header("Content-Type",'application/json');
  res.status(200).send(results[0]);
});


router.get('/users/orders',  async (req, res, next) => {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Car For Users Api...');
  console.log('Hit users orders');
  const results = await db.promise().query('SELECT *  FROM `orders_ab`');
  console.log(results[0]);
  res.header("Content-Type",'application/json');
  res.status(200).send(results[0]);
});


module.exports = router;
