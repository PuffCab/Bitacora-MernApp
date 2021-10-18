import express from 'express';
const router = express.Router(); 
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'


router.get('/all',
    (req, res) => {
      res.send('tus users')
    });




 //* ///////// UPDATE USER ///////
router.put('/:id',
    async (req, res) => {
      if(req.body.userId === req.params.id || req.body.isAdmin) {
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
            console.log(`account updated`)
          } catch(err) {
              return res.status(500).json(err)   
          }
      } else {
        return res.status(403).json("You don't have permissions for that")
      } 
    })

//* ///////// Delete USER ///////
router.delete('/:id',
    async (req, res) => {
      if(req.body.userId === req.params.id || req.body.isAdmin) {
          
          try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json('User Account has been deleted')
            console.log('account deleted')
          } catch(err) {
              console.log("that went wrong") 
              return res.status(500).json(err)
                
          }
      } else {
        console.log("that went wrong")
        return res.status(403).json("this not your account to delete")
      } 
    })

//* /////////  GET A USER ///////

router.get("/", 
    async (req, res) => {
      const userId = req.query.userId;
      const userName = req.query.userName;
      try {
        const user = userId
          ? await userModel.findById(userId)
          : await userModel.findOne({ userName: userName}); // REVIEW we introduce condition in case we dont have ID and just userNanme
        const {nickName, favCity, ...rest} = user._doc // use of spread op. to take out properties we dont want to get

        res.status(200).json(rest);
        console.log(`your user is here`)

      } catch(err){
        console.log("that went wrong")
        res.status(500).json(err)
      }
    })

//* ///////// FOLOW USER ///////
router.put("/:id/follow", 
  async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await userModel.findById(req.params.id); //the user we want to follow
            const currentUser = await userModel.findById(req.body.userId); //currentUser wants to follow User

              if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { youFollow: req.params.id } });
                
                res.status(200).json("following this user")

              } else { //if  user.followers includes current user , means currentUser is following him already.
                  res.status(403).json("already following")
              }

        } catch(err) {
            res.status(500).json(err)
              
        }

    } else {
      res.status(403).json("action invalid.Follow failed")
    }
  })



//* ///////// UNFOLOW A USER ///////
router.put("/:id/unfollow", 
  async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await userModel.findById(req.params.id); //the user we want to follow
            const currentUser = await userModel.findById(req.body.userId); //currentUser wants to follow User

              if(user.followers.includes(req.body.userId)) { //if user.followers includes body.userID, means we follow him
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { youFollow: req.params.id } });
                
                res.status(200).json("User Unfollowed")

              } else { //if  user.followers includes current user , means currentUser is following him already.
                  res.status(403).json("cannot unfollow an user twice")
              }

        } catch(err) {
            res.status(500).json(err)
              
        }
    } else {
      res.status(403).json("action invalid.Unfollow failed")
    }
  })
 


export default router