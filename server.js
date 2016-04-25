var express     = require('express'),
    path        = require('path'),
    fs          = require('fs'),
    multer      = require('multer'),
    bodyParser  = require('body-parser'),
    //MulterImpl  = require('./src-server/multerImpl'),
    app         = express();

var options = {
    dest: 'dist/uploads/',
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

//var upload = multer(options);
var type = upload.single('file');
//var type = upload.array('files',10);

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
  next();
});


app.set('port', process.env.PORT || 8080);
app.use(express.static('./'));

//app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer(options));
//app.use(new MulterImpl({}).init());


app.post('/upload', type, function (req, res, next) {
  // access data req.file
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log('I GOT SOMETHING...', req.file);
  //console.dir(req.file);
  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;
  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'dist/images/' + req.file.originalname;
  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() {
    fs.unlink(tmp_path);
    res.send('complete');
  });
  src.on('error', function(err) { res.send('error', err); });
  //res.sendStatus(200);
});

module.exports = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
