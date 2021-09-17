// const mongoose = require ('mongoose');// import with nodejs syntax
import mongoose from "mongoose";


// const { Schema } = mongoose //commented as this was from LMS, together wit const tripSchema= new Schema()

const tripSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      country : {
        type: String, 
        required: true
      },
      img : {
        type: String
      } 
    

});


//name if module is the singular of how database is called
const Trip = mongoose.model('Trip', tripSchema);
export default Trip //or export defaul mongoose.model('Trip', tripSchema)

// module.exports = Trip //nodejs syntax
 
