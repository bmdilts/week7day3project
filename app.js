const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');
mongoose.Promise = require('bluebird');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.use('/', router);

app.listen(3000, function(){
  console.log('Hey, Listen!');
});
