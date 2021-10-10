import helmet from "helmet";
import morgan from "morgan";

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; //TODO should we keep it? necessary?
// import bodyParser from 'body-parser'; // bodyparser is deprecated after express 4

/////////importing the routes//////////////////
import tripRoutes from "./routes/tripRoute.js";
import userRoutes from "./routes/userRoute.js";
import authUserRoutes from "./routes/authUserRoute.js";
import postRoutes from "./routes/postRoute.js";

import passport from "passport";
import { jwtStrategy } from './middlewares/passport.js';

import * as dotenv from 'dotenv';
// loading .env file
dotenv.config();
////////// END importing the routes /////////////
const app = express(); //we instanciate express library through a constant , so we create an express aplication

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors()); //TODO should we keep it? necessary?

///////////using the routes for a specific api //////////////
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authUserRoutes);
app.use('/api/posts', postRoutes);

/////////// END using the routes for a specific api //////////////

//connect to mongodb / .env file 
mongoose
  .connect(process.env.DB)
  .then( () => console.log('Mongo DB connected...server running on port: ' + port))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));


/////// a Test route just to try the server ... witl localhost:5000/test
// app.get('/test', (req, res) => {
//   res.send({ msg: 'Test route.' });
// });
///////just to try the server ... witl localhost:5000/test


//some more middleware 
app.use(helmet()); //to add security to HEAD requests
app.use(morgan("common")); //middleware to get requests in Terminal. check Morgan docs for other options such as "tiny" 

//passport middleware
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());