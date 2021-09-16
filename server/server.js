import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; //TODO should we keep it? necessary?
// import bodyParser from 'body-parser'; // bodyparser is deprecated after express 4

//importing the routes
import tripRoutes from "./routes/tripRoute.js"
dotenv.config();

const app = express(); //we instanciate express library through a constant , so we create an express aplication

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors()); //TODO should we keep it? necessary?

//using the routes for a specific api
app.use('api/trips', tripRoutes)

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