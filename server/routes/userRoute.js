import express from 'express';
const router = express.Router(); 
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'


router.get('/all',
    (req, res) => {
      res.send('tus users')
    });




////// UPDATE USER
router.put('/:id',
    async (req, res) => {
      if(req.body.userId === req.params.id || req.user.isAdmin) {
          if(req.body.password){ //if user tries to update password, regenerate password hash
            try {
                  const salt = await bcrypt.genSalt(10);
                  req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err) {
                return res.status(500).json(err)
            }
          } 
          try {
            const user = await userModel.findByIdAndUpdate(req.params.id, { // or (req.body.userId)
              $set: req.body, //is gonna automatically set all inputs inside this body
            });
            res.status(200).json('User Account has been updated')
          } catch(err) {
              return res.status(500).json(err)   
          }
      } else {
        return res.status(403).json("You don't have permissions for that")
      } 
    })

////// DELTE USER


//// GET A USER


///// FOLOW A USER


///// UNFOLOW A USER





export default router