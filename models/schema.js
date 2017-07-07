const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/rocks');

const rocksSchema = new mongoose.Schema ({
  description: {type: String, required: true},
  color: {type: String, required: true},
  shape: String,
  sizeInMM: {type: Number, required: true},
  type: {type: String, required: true},
  foundLocation: {
    city: {type: String}, state: {type: String}
  },
  foundDate: {type: Date, required: true, default: Date.now},
});

const RockCollection = mongoose.model('RockCollection', rocksSchema);

// let newInstance = new RockCollection ({description: 'Blue quartz from Indy', color: 'blue', shape: 'round', sizeInMM: 25, type: 'quartz', foundLocation: [{city: 'Indianapolis', state: 'IN'}]});
//
// newInstance.save(function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('Now we are rocking!!!');
//   }
// });

module.exports = RockCollection;
