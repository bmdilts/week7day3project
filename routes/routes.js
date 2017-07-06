const express = require('express');
const app = express();
const router = express.Router();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));

const RockCollection = require('../models/schema')

router.get('/', function(req, res){
  RockCollection.find()
  .then( function(collResults){
    res.render('home', {collResults: collResults});
  });
});

router.post('/add', function(req, res){
  let newInstance = new RockCollection({description: req.body.desc, color: req.body.color, shape: req.body.shape, sizeInMM: req.body.size, type: req.body.type, foundLocation: [{city: req.body.city, state: req.body.state}], date: req.body.date});
  newInstance.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('/');
    }
  });
});

router.post('/update', function(req, res){
  var update = '';
  if(req.body.updateDesc){
    update += '{$push: {description: req.body.updateDesc}}';
  }else if(req.body.updateColor){
    update += '{$push: {color: req.body.updateColor}}';
  }else if(req.body.updateShape){
    update += '{$push: {shape: req.body.updateShape}}';
  }else if(req.body.updateSize){
    update += '{$push: {sizeInMM: req.body.updateSize}}';
  }else if(req.body.updateType){
    update += '{$push: {type: req.body.updateType}}';
  }else if(req.body.updateCity){
    update += '{$push: {foundLocation: [{city: req.body.updateCity}]}}';
  }else if(req.body.updateState){
    update += '{$push: {foundLocation: [{state: req.body.updateState}]}}';
  }else if(req.body.updateDate){
    update += '{$push: {date: req.body.updateDate}}';
  }
  console.log(update);
  RockCollection.updateOne({_id: req.body.id}, update);
  res.redirect('/');
});





module.exports = router;
