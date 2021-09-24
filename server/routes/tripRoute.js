//const express = require('express');
import express from 'express';
//const tripsModel = require ('../model/tripsModel')
import tripModel from "../models/tripModel.js"
const router = express.Router();


// get all trips
router.get('/all',
    (req, res) => {
      tripModel.find()  
          .then(files => {
              res.send(files)
          })
          .catch(err => console.log(err));
    });
 


   

  // router.get('/all', (req, res) => {
  //   tripsModel.find({}, function(err, trips) {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.send(trips);
  //     }
  //   });
  // });


  // module.exports = router;
  export default router;