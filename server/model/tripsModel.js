const mongoose = require ('mongoose');

const { Schema } = mongoose

const tripSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },    
    

});

const trip = mongoose.model('trip', tripSchema);

module.exports = trip
