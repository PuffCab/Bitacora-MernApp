// const mongoose = require ('mongoose');// import with nodejs syntax
import mongoose from "mongoose";


// const { Schema } = mongoose //commented as this was from LMS, together wit const tripSchema= new Schema()

const tripSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },    
    

});

const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip //nodejs syntax

