require('dotenv').config();
var createError = require('http-errors');
const http = require('http');
const express = require("express");
const session = require('express-session');
const socketio = require('socket.io');
const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const cors = require('cors');
const path = require("path");
const db = require('./models');
const jwt = require('jsonwebtoken');
// require('crypto').randomBytes(64).toString('hex')
const { v4: uuidV4 } = require('uuid');

const formatMessage = require('./public/javascripts/utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
}  = require('./public/javascripts/utils/users');

const multerStorage = multer.diskStorage({
  //destination: function (req, file, cb) { cb(null, './public/uploads/'); },
  destination: './public/uploads/',
  filename: function(req, file, cb){
   var ext = path.extname(file.originalname)
   if(ext){
    cb(null,file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }else{
      cb(null,file.fieldname + '-' + Date.now() + '.jpg');
    }
  }
});


// Init Uploaded File
var upload = multer({
  storage: multerStorage,
   limits:{filesize: 7000000, maxsize: 7000000},
 fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }  /* */
}).single('image'); 


//Check File Type
function checkFileType(file, cb){
    // Create an express for the file type
    // Allowed Extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase);
    // Check Mimetype
    const mimetype = filetypes.test(file.mimetype);
    console.log('mimetype: ', mimetype);
    if(!extname && mimetype){
      var filename = file.originalname;
      var extension = filename[0].match(filetypes);
      console.log('passed mimetype but not extension name', extension);
      //onst extname =  '.jpg'
      extname = '.jpg';
      return cb(null, true);
    }

    if(mimetype && extname){
      console.log('mimetypes and extname passed');
      return cb(null, true);
    }else if(!extname && extname){
      console.log('extname & extname: both failed')
      cb('Error: Both checks failed horribly bad so know Images Only!');
    }else if(!extname){
      console.log('extname: failed')
      cb('Error: Images Only!');
    }else if(!mimetype){
      console.log('mimetype: failed')
      cb('Error: Images Only!');
    }else{
      console.log('mimetypes and extname failed');
      cb('Error: Images Only!');
    }
}

//Creating Anc Checking For Exisiting Public Folders For Image Delivery
function checkCreatePublicImageFolders(userid){

  var dateObj = new Date();
  var year = dateObj.getUTCFullYear();
  var month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  var day = dateObj.getDate().toString().padStart(2, "0"); 
  

  const dir = path.resolve(path.join(__dirname, './public/uploads/'));
  const diryear = path.resolve(path.join(__dirname, `./public/uploads/${year}`));
  const dirmonth = path.resolve(path.join(__dirname, `./public/uploads/${year}/${month}`));
  const dirday = path.resolve(path.join(__dirname, `./public/uploads/${year}/${month}/${day}`));
  const dirdateuserid = path.resolve(path.join(__dirname, `./public/uploads/${year}/${month}/${day}/${userid}`));

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('dir created: ', dir);
  }else{
    console.log('dir exist: ', dir);
  }
  if (!fs.existsSync(diryear)) {
    fs.mkdirSync(diryear);
    console.log('diryear created: ', diryear);
  }else{
    console.log('diryear exist: ', diryear);
  }
  if (!fs.existsSync(dirmonth)) {
    fs.mkdirSync(dirmonth);
    console.log('dirmonth created: ', dirmonth);
  }else{
    console.log('dirmonth exist: ', dirmonth);
  }
  if (!fs.existsSync(dirday)) {
    fs.mkdirSync(dirday);
    console.log('dirday created: ', dirday);
  }else{
    console.log('dirday exist: ', dirday);
  }
  if (!fs.existsSync(dirdateuserid)) {
    fs.mkdirSync(dirdateuserid);
    console.log('dirdateuserid created: ', dirdateuserid);
  }else{
    console.log('dirdateuserid exist: ', dirdateuserid);
  }
}


var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');


// Variables For Routes
var apiRouter = require('./routes/api-routes');
var indexRouter = require('./routes/index');
var apiDriverRouter = require('./routes/api-driver-route');
var carsRouter = require('./routes/cars-route');
var userRouter = require('./routes/user-routes');
var usersRouter = require('./routes/users-routes');
var orderRouter = require('./routes/order-routes');
var ordersRouter = require('./routes/orders-routes');
var roomsRouter = require('./routes/rooms-routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('trust proxy', 1) // trust first proxy
// using express sessions
app.use(session({
  name : 'codeil',
  secret: '64654654646132165465464', 
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge:(1000 * 60 * 100)
  },
}));

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Must Start here Because it throws an error if put at top
 * const server = require("http").createServer(app);
 *                                             ^ 
 * ReferenceError: Cannot access 'app' before initialization 

const server = require("http").createServer(app);
const io = require("socket.io")(server);
*/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cors());
app.use(cors({origin: true, credentials: true}));




//Make A Custom route
//app.post('/upload', (req, res) =>{ 
  app.post('/api/user/uploadimage',  async (req, res, next) => {
  console.log('Upload Directory Hit: ', req);
  //console.log('upload res: ', res);
    //res.send('test')
    checkCreatePublicImageFolders(2);
    upload(req, res, (err) => {
      if(err){
        // we want to rerender the template with a message looking for msg a
        //console.log('err:', err);
        res.render('index', { msg: err });
      }else{ 
        if(req.file == undefined){
          res.render('index', { msg: 'Error: No Image file was selected!' });
        }else{
          console.log('req.file: in /api/user/uploadimage: ', req.file);
          res.render('complete', { 
            msg: 'File Uploaded',
            file: `/public/upload/${req.file.filename}`
          });
        }
        
        /**
         *  This is What it results put out
         *  {
         *    fieldname: 'image',
         *    originalname: 'myImage',
         *    encoding: '7bit',
         *    mimetype: 'image/jpeg',
         *    destination: './public/uploads/',
         *    filename: 'image-1656622347539.jpg',
         *    path: 'public\\uploads\\image-1656622347539.jpg',
         *    size: 1115808
            }
         */
        //res.send('test');

       }
    });

});

// Public Folder
app.use(express.static('./public'));


// Set Up routes
app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);


// Custom Api routes
app.use('/api', apiRouter);
app.use('/api/driver', apiDriverRouter);
app.use('/api/user', apiRouter);
app.use('/api/users', apiRouter);

// Custom Car routes
app.use('/cars', carsRouter);

// Custom Chat Routes
app.use('/room/', roomsRouter);

// Custom Order Routes
app.use('/order', orderRouter);
app.use('/orders', ordersRouter);


// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
  console.log('278 404 error', err)
  res.status(404)
  res.render('error', { error: err })
});

// catch 500 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(500));
  console.log('286 500 error', err)
  res.status(500)
  res.render('error', { error: err })
});


// Setting Static Variables

  //Relates to chat
  const botName = 'System Bot';


// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

const PORT = 3000 || process.env.PORT;

/**\
 * Was gonna do Web Dev Simplified Video with live chat but he uses peer to peer I believe rtc will be for one to many borad cast so I paused to
 * to implement both of them to provide video one to one and video of one to many.  Why one to many?  maybe that's not a good idea but let's see.
 * https://youtu.be/DvlyzDZDEq4
 * The exact time and link: https://youtu.be/DvlyzDZDEq4?t=990
 * 
 * What you wanna do now is go and get started on this link to build your live chat also you should log into the old eargaze and reuse your login method to crate
 * express session across particular pages and routes.
 * https://www.youtube.com/watch?v=jD7FnbI76Hg
 */


//Run when client connects
io.on("connection", socket => {
  const socketId = socket.id;
  const issuedId = socket.handshake.issued;

  console.log('New User Connected Just Now On Socket ID: '+socket.id);
  //console.log(socket.handshake);

 /*  console.log(`New WS Connection...`);
  console.log("a user connected :D");
   console.log(socket);
  console.log(socket.handshake);
  console.log(socket.handshake.headers);

  console.log(socket.handshake.issued);
  console.log(socket.referer) */

  socket.on("chat message snd", msg => {
    console.log('Server socket.on chat message: '+msg);
    io.emit("chat message snd", msg);
  })

  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId);
    //socket.join(roomId);  //Anything happens in this room will update this socket.
    socket.join(roomId).broadcast.emit('user-connected', userId)   //Broadcast the id of the user that just connected
  })


  socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room );

        socket.join(user.room);


        // Annouce Current user 
        socket.emit('messageOrderLog', formatMessage(botName, socketId+` Welcome ${user.username} To Order View Discussion  you have been issued this Id: `+issuedId));


      
        //  Broadcast when a user connects expect to the user that connecting
        //  socket.broadcast.emit();
        //  This is how you emit to a specific room
        socket.broadcast
        .to(user.room)
        .emit(
          'messageOrderLog',  
          formatMessage(botName, `${user.username} has just joined to view this order`));

          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });

  });

  
  
  //  This will broadcast to everyone
  //  io.emit();

  
  
  // Listen for chatOrderMessage
  socket.on('chatOrderMessage', msg => {
    const user = getCurrentUser(socket.id);
    console.log(msg);
    //io.emit('messageOrderLog',  formatMessage('USER:', msg));
    io.to(user.room).emit('messageOrderLog',  formatMessage(user.username, msg));

  });
  
  
  // Runs when a client disconnects
  socket.on('disconnect', () => {
    
    const user = userLeave(socket.id);
    if(user) {

      // Broadcast to everyone that a user disconnected.
      io.to(user.room).emit(
        'messageOrderLog', 
        formatMessage(botName, issuedId+` ${user.username} has left the order view`)
      );

      // Send users and room info to those that has left the chat
      io.to(user.room).emit(
        'roomUsers', {
        room: user.room,
      });

    }

  });


});

//server.listen(port, () => {console.log(`server running on port: ` + port)});
//db.sequelize.sync({alter:true}).then(() => {
//db.sequelize.sync({force: true}).then(() => {  << Very Dangerous drops database

db.sequelize.sync({alter:true}).then((result) => {
    
    //console.log('sequlize server sync result: ', result);

    server.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
      console.log(`listening on line 406 at: http://localhost:${PORT}`);
    });

}).catch((err) => {
  console.log('sequlize server error: ', err);
});




module.exports = app;

