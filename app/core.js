var i18n = require('i18n');
var express = require('express');
var fs = require('fs');
var join = require('path').join;

var app = module.exports = express();

var api1Routes;

// Bootstrap models
fs.readdirSync(join(__dirname, 'models')).forEach(file => {
  if (~file.indexOf('.js')) {
    require(join(__dirname, 'models', file));
  }
});

api1Routes = require('./api/v1/routes')(express);

i18n.configure({
  locales: [
    'en',
  ],
  defaultLocale: 'en',
  directory: `${__dirname}/locales`,
});

app.use(i18n.init);

app.use('/api/v1/', api1Routes);
