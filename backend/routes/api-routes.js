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

router.get('/user/:id', async(req, res, next) => {
  console.log('HIT GET api/user: req.body: ', req.body);
  console.log('HIT GET api/user: req.params.id: ', req.params.id);
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  const foundUser = await dbs.Users_ab.findOne(
    {
      attributes: {
      exclude: [
                'user_password',
              ]
    },
      where : {user_id: req.params.id}
    }
  ).then(serverUser => { res.status(200).send(serverUser)});
  
  //res.send(200);
});

router.post('/user/signin', async(req, res, next) => {
  console.log('HIT POST api/user/signin:', req.body);
  // res.send(200);
  const foundUser = await dbs.Users_ab.findOne(
          {
            where : {user_email: req.body.user_email}
          }
  );

 
  if(foundUser){
    console.log('Server user_id: ', foundUser.user_id);
    console.log('Server user_token: ', foundUser.user_token);
    const user = await dbs.Users_ab.findOne(
      {
        where: {
          user_email: req.body.user_email,
          user_password: req.body.user_password
          }
      }
    );
    if(user){
      res.json({ 
          status : "OK", 
          user_id:  user.user_id, 
          user_token: user.user_token,
          user_firstname: user.user_firstname, 
          user_lastname: user.user_lastname, 
          user_phoneno: user.user_phoneno,
          user_email: user.user_email,
          user_username: user.user_username,
          user_hireDriverIsOnline: user.user_hireDriverIsOnline,
          user_hirerating: user.user_hirerating,
          user_earnrating: user.user_earnrating,
          createdAt: user.createdAt,
        });

          req.session.isAuth = true;
          req.session.user = user;

    }else{
      res.json({ status : "ERROR", error : "Incorrect Credentials" });
    }

  }else{
    res.json({ status : "ERROR", error : "Email Not On File" });
  }
      
});

router.get('/user/signin/old', function(req, res, next) {
  console.log('HIT api/user/signin:', req.body);
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  //res.json({ route: 'Posts' });
  //  var user_email = req.body.useremail;
  //  var user_password = req.body.userpassword;
  console.log('api user/signin', req.body);
  const { user_email, user_password } = req.body;
  
  if(user_email && user_password){
    
    db.promise().query("SELECT * FROM `users_ab` WHERE `user_email` = ? AND `user_password` = ?", [user_email, user_password], function(err, row, fields){
      //connection.query("SELECT * FROM `ablebody_ablebodydb`.`users_ab` WHERE `users_ab`.`user_email` = ? AND `users_ab`.`user_password` = ?", [user_email, user_password], function(err, row, fields){
        if (err) console.log(err);
        
        if (row.length > 0) {
          req.session.isAuth = true;
         

          res.send({'success': true, 'message': row[0].user_email, 'usrtoken': row[0].user_token});
        }else{
        res.send({'success': false, 'message': 'Get User not found, please try again '+err});
      }
    });
    
  }
  
});

router.get('/user/posts', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  res.json({ route: 'Posts' });
});

router.post('/user/register', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Single User api...');
  
  const { user_firstname, user_lastname, user_email, user_phoneno, user_password } = req.body;
  if(user_email && user_password && user_phoneno && user_firstname && user_lastname){

    var user_token = makeid(20);
    console.log('user_token: '+user_token);
    try {

      db.promise().query("INSERT INTO  `users_ab` SET `user_token` = ? , `user_firstname` = ? , `user_lastname` = ?  , `user_phoneno` = ? ,  `user_email` = ? , `user_password` = ?", [user_token, user_firstname, user_lastname, user_phoneno, user_email, user_password], function(err, row, fields){

      

      });
      
      res.status(201).send({ msg: 'Created User' });
      

    } catch (error) {
      console.log('try catch error:'+error);
    }
  }
});



router.get('/user/uploadimage', function(req, res, next) {
  console.log('Get user Image Hitted Directory: ');
  
  res.header("Content-Type",'application/json');
  return res.status(200).send('Files were uploaded');
});

router.put('/user/goOnline', async(req, res) => {
  console.log('Server Hit user/goOnline! ');
  console.log('req.body ', req.body);

  const foundCar = await dbs.Users_ab_cars.findOne(
    {
      where : {users_car_usr_id: req.body.user_id}
    }
  );

  if(foundCar){

    dbs.Users_ab_cars.update({
        users_car_isActive: req.body.users_car_isActive
      }, 
      {
        where: {
          users_car_id: foundCar.users_car_id
        }
      }
    )

  }

  

  dbs.Users_ab.update({
    user_hireDriverIsOnline: req.body.user_hireDriverIsOnline
  }, 
  {
    where: {
      user_id: req.body.user_id
    }
  }
).then(() => res.send('success')); 
//).then( submitedgoOnline => { res.send(submitedgoOnline)});


});



router.get('/users', async (req, res, next) => {
  console.log('Server Hit Get Users! ');
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is Your User api...')
  const results = await db.promise().query('SELECT user_id, user_token, user_firstname, user_lastname, user_phoneno, user_email  FROM `users_ab`');
  console.log(results[0]);
  res.status(200).send(results[0]);
});

router.get('/users/cars',  async (req, res, next) => {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able This Is A Car For Users Api...');
  const results = await db.promise().query('SELECT *  FROM `users_ab_cars`');
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
