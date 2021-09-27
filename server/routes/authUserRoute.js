import express from 'express';
const router = express.Router(); 

import bcrypt from 'bcrypt'; // library to hash and compare passwords

import userModel from '../models/userModel.js'





///////////////// To test the route
// router.get('/',
//     (req, res) => {
//       res.send('Register, create ...Users')
//     });
//////////////////// 



////////////REGISTER NEW USER 
// router.get('/register',   //ASK why works with .get(), but not with .post()
//     async (req, res) => {
//       const user = await new userModel({
//         userName: 'Locoplaya',
//         email: 'locoplaya@test.com',
//         password: '123456'
//       })

//       await user.save();
//       res.send('user created')
//     });

////////////////////////////////////

//////////// REGISTER NEW USER with post request using Postman 
router.post('/register',
    async (req, res) => {
      
      try {

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create New User
        const newUser = new userModel({
          userName: req.body.userName,
          email: req.body.email,
          password: hashedPassword,
        });

        // Save New User and return response
        const user = await newUser.save();
        res.status(200).json(user);

      } catch(err){
        console.log(err)
        res.status(500).send(err.message);
      } 
     
    });
//////////////////////////////////////////

//////////// LOGIN  ///////////////////////
router.post('/login',
    async (req, res) => {

      try {
          const user = await userModel.findOne({email:req.body.email});
          !user && res.status(404).send("user not found");

          const correctPassword = await bcrypt.compare(req.body.password, user.password); //Compares password from request with DB user passoword using bcrypt.I HAS to be user's plain text Vs Hash comparisong. Otherwise returns False
          !correctPassword && res.status(400).json('incorrect password')
          
           res.status(200).json(user); // if they are not invalid, response is ok and return the user

          } catch (err) {
            res.status(500).send(err.message);
            console.log(err)
          }
      
     })

     
     ///////// sames as before but USING IF statements to avoid [ERR_HTTP_HEADERS_SENT] Error ////////
    //  router.post("/login", async (req, res) => {
    //   try {
    //     const user = await userModel.findOne({ email: req.body.email });
    //     if (!user) {
    //         return res.status(404).send("user not found");
    //     }
    
    //     const correctPassword = await bcrypt.compare(req.body.password, user.password);
    //     if (!correctPassword) {
    //         return res.status(400).json("incorrect password");
    //     }
    
    //     return res.status(200).json(user); // if not invalid  return user
    //   } catch (err) {
    //     console.log(err);
    //     res.status(500).send(err.message);
    //   }
    // });
////////// END LOGIN  ///////////////////////////
export default router



