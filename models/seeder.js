const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/rocks');

const rocksSchema = new mongoose.Schema ({
  description: {type: String, required: true, unique: true},
  color: {type: String, required: true},
  shape: String,
  sizeInMM: {type: Number, required: true},
  type: {type: String, required: true},
  foundLocation: [{city: String, state: String}],
  foundDate: {type: Date, required: true, default: Date.now},
});

const RockCollection = mongoose.model('RockCollection', rocksSchema);

let newInstance = new RockCollection ({description: 'Quartz from South Dakota', color: 'white', shape: 'cube', sizeInMM: 10, type: 'quartz', foundLocation: [{city: 'Farmington', state: 'SD'}]});

newInstance.save(function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Now we are rocking!!!');
  }
});

module.exports = RockCollection;
