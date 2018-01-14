var express = require('express');
var config = require('config');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var lusca = require('lusca');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var rawBodyParser = require('raw-body-parser');
var fs = require('fs');
var expressValidator = require('express-validator');
var helmet = require('helmet');

// Connect to mongodb database.

var app = express();

var db = mongoose.connection;

var tokenMiddleware = require('./src/middleware/token');
var mongodb = 'mongodb://localhost/contentdb';
mongoose.connect(mongodb);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    // Connected to mongodb database.
    console.log('Connected to database: ', mongodb);
});

app.set('port', process.env.PORT || 3000);
app.set('debug', config.debug);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.raw({
    limit: "50mb"
}));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
app.use(expressValidator({}));
app.use(methodOverride());
app.use(cookieParser());
app.use(morgan('combined', {
    skip: function(req, res) {
        return process.env.NODE_ENV == 'test' || false;
    }
}));
app.use(session({
    secret: 'n?PUE6Q)>j=n6^9<V"y.',
    resave: false,
    saveUninitialized: true
}));
app.use(lusca({
    xssProtection: true
}));
app.use(helmet());

var file = './app/app.js';
console.log(file);
if (fs.existsSync(file)) {
  var module = require(file);
  app.use(module);
}


app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;