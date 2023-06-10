var express = require('express');
const session = require('express-session');
const dbs = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able')
  //req.session.isAuth = true;
  console.log('req.session: ', req.session);
  console.log('req.session.id: ', req.session.id);
  console.log('req.session.isAuth: ', req.session.isAuth);
  res.render('enter', { title: 'Place Your Order' });
});

router.get('/dashboard', function(req, res, next) {
  console.log('dashboard req.session: ', req.session);
  console.log('dashboard req.session.user: ', req.session.user);
  console.log('dashboard req.session.isAuth: ', req.session.isAuth);
  //if(req.session.isAuth !== true){
  if(!req.session.user && req.session.isAuth !== true){
  
    return res.status(401).send("Error");
  }

  return res.status(200).send('Congratulations you are logged IN!');
});

router.get('/login', function(req, res, next) {
  //res.render('index', { title: 'Express For AbleBody' });
  //res.send('Hello Some Body Able')
  
  res.render('sign-in', { title: 'Place Your Order' });
});

// Auth Page
router.get('/auth/:method?', function(req, res, next) {
  
 if(req.params.method == "login" || req.params.method == "signin"){
  res.render('auth', {method: "login"});
 }else if(req.params.method == "signup" || req.params.method == "register"){
  res.render('auth', {method: "sigup"});
 }
 
});

router.post('/auth/:method?',  async(req, res, next) => {
 
  var user_email = req.body.user_email;
  var user_password = req.body.user_password;
  if(req.params.method == "login" || req.params.method == "signin")
  {
          //res.send(req.body);

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
      req.session.isAuth = true;
      req.session.user = user.dataValues;
      //req.session.user = user;

      console.log('req.session: ', req.session);
      console.log('req.session.id: ', req.session.id);
      console.log('req.session.user: ', req.session.user);
      console.log('req.session.isAuth: ', req.session.isAuth);
      return res.status(200).json({ 
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
      }else{
        return res.status(401).json({ status : "ERROR", error : "Incorrect Credentials" });
      }
  }else{
    //return res.status(401).send();
    return res.status(401).json({ status : "ERROR", error : "Email Not On File" });
  }
  
 

  }else if(req.params.method == "signup" || req.params.method == "register") 
  {
         res.send(req.body);
  }
  });


module.exports = router;
