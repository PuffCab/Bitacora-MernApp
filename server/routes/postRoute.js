import express from 'express';
const router = express.Router();
import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';


// Testing Post Route ////////
// router.get("/",
//     (req, res) => {
//         console.log("post route")
//         res.send('post route')
//     })
/// END 

//* CREATE POST ////////////
router.post("/", 
    async (req,res) => {
        const newPost = new postModel(req.body);
        try {
            const createdPost = await newPost.save();
            res.status(200).json(createdPost)
        } catch(err) {
            res.status(500).json(err.message)
        }
    })




//* UPDATE POST //////////
router.put("/:id", 
    async (req, res) => {
        
        try {
            const post = await postModel.findById(req.params.id);
        
            if(post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json("Post has been updated")

            } else {
                res.status(403).json("not your post to update")
            }
        } catch(err) {
            res.status(500).json(err.messsage)
        }
        
    })


//* delete  POST //////////
router.delete("/:id", 
    async (req, res) => {
        
        try {
            const post = await postModel.findById(req.params.id);
        
            if(post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json("Post has been upddeletedated")

            } else {
                res.status(403).json("not your post to delete")
            }
        } catch(err) {
            res.status(500).json(err.message)
        }
        
    })


//* Get a post //////////
router.get("/:id", 
    async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id);
            res.status(200).json(post)
        } catch(err) {
            res.status(500).json(err.message)
        }
    })

//* Get all posts from single User //////////
router.get("/allposts/all", 
    async (req, res) => {

        // let allPostArray = [];

        try {
            const currentUser = await userModel.findById(req.body.userId);
            const allUserPosts = await postModel.find({ userId: currentUser._id});
            res.status(200).json([...allUserPosts])
        } catch(err) {
            res.status(500).json(err.message);
        }
    })

//* Like/Dislike Post //////////
router.put("/:id/like", 
    async (req, res) => {       
        try {
            const post = await postModel.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("Post Liked");
            } else { //if the likes array from post includes de userID from the requester, means is already liked and Remove it.
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("Post Disliked");
            }

        } catch(err) {
            res.status(500).json(err.message)
        }
    })



export default router;