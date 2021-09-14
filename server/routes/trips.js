const tripsModel = require ('../model/tripsModel')

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' });
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