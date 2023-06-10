var express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require("path");



// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); },
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
  storage: storage,
}).single('image'); 


// Init app
const app = express();

app.set('view engine', 'ejs');

// Public Static Foldere
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

//Make A route
app.post('/upload', (req, res) =>{ 
  console.log('Upload Directory Hit: ', req);
  console.log('upload res: ', res);
    //res.send('test')
    upload(req, res, (err) => {
      if(err){
        // we want to rerender the template with a message looking for msg a
        console.log('err:', err);
        res.render('index', { msg: err });
      }else{ 
        console.log(req.file);
        res.send('test');
       }
    });

});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

