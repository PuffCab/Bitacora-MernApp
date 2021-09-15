const mongoose = require ('mongoose');

const { Schema } = mongoose

const tripSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },    
    

});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip
