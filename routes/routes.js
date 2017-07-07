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
  let newInstance = new RockCollection({description: req.body.desc, color: req.body.color, shape: req.body.shape, sizeInMM: req.body.size, type: req.body.type, foundLocation: {city: req.body.city, state: req.body.state}, date: req.body.date});
  newInstance.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('/');
    }
  });
});

router.post('/update', function(req, res){
  RockCollection.findOne({_id: req.body.id}, function(err, update){
    if(err){
      res.status(404).send(err);
    } else{
      update.description = req.body.updateDesc || update.description;
      update.color= req.body.updateColor || update.color;
      update.shape= req.body.updateShape || update.shape;
      update.sizeInMM= req.body.updateSize || update.sizeInMM;
      update.type= req.body.updateType || update.type;
      update.foundLocation.city= req.body.updateCity || update.foundLocation.city;
      update.foundLocation.state= req.body.updateState || update.foundLocation.state;
      update.date= req.body.updateDate || update.date;
    }
    update.save(function(err){
      if(err){
        res.status(404).send(err);
      }
      res.redirect('/');
    });
  });
});

module.exports = router;
