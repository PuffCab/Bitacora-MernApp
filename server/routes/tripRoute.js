//const express = require('express');
import express from 'express';
//const tripsModel = require ('../model/tripsModel')
import tripsModel from "../model/tripsModel.js"
const router = express.Router();


// get all trips
router.get('/all',
    (req, res) => {
      tripsModel.find({})  
          .then(files => {
              res.send(files)
          })
          .catch(err => console.log(err));
    });



  module.exports = router;

  router.get('/all', (req, res) => {
    tripsModel.find({}, function(err, trips) {
      if (err) {
        res.send(err);
      } else {
        res.send(trips);
      }
    });
  });