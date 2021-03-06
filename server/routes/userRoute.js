import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import passport from "passport";
router.get("/all", (req, res) => {
  res.send("tus users");
});

//* ///////// UPDATE USER ///////
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    console.log(`req.body`, req.params);
    if (req.body.password) {
      //if user tries to update password, regenerate password hash
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          // or (req.body.userId)
          $set: req.body, //is gonna automatically set all inputs inside this body
        },
        { new: true } //REVIEW this way we get the new document(modified), not the previous(default behavour with this method).See mongoosejs doc
      );
      console.log(`user`, user);
      res.status(200).json(user);
      console.log(`account updated`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You don't have permissions for that");
  }
});

//* ///////// Delete USER ///////
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User Account has been deleted");
      console.log("account deleted");
    } catch (err) {
      console.log("that went wrong");
      return res.status(500).json(err);
    }
  } else {
    console.log("that went wrong");
    return res.status(403).json("this not your account to delete");
  }
});

//* /////////  GET A USER with ID ///////
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { nickName, favCity, ...rest } = user._doc;

    res.status(200).json(rest);
    console.log(`your user is here`);
  } catch (err) {
    console.log("that went wrong");
    res.status(500).json(err);
  }
});

//     //* /////////  GET A USER ///////

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.userName;

  try {
    const user = userId
      ? await userModel.findById(userId)
      : await userModel.findOne({ userName: userName }); // REVIEW condition in case we dont have ID and just userNanme (be aware: url /users?userName=abc or /users?userId=1234)
    const { nickName, favCity, ...rest } = user._doc; // use of spread op. to take out properties we dont want to get

    res.status(200).json(rest);
    console.log(`your user is here`);
  } catch (err) {
    console.log("that went wrong");
    res.status(500).json(err);
  }
});

//* ///////// FOLOW USER ///////
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id); //the user we want to follow
      const currentUser = await userModel.findById(req.body.userId); //currentUser wants to follow User

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { friends: req.params.id } });

        res.status(200).json("following this user");
      } else {
        //if  user.followers includes current user , means currentUser is following him already.
        res.status(403).json("already following");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("action invalid.Follow failed");
  }
});

//* ///////// UNFOLOW A USER ///////

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id); //the user we want to follow
      const currentUser = await userModel.findById(req.body.userId); //currentUser wants to follow User

      if (user.followers.includes(req.body.userId)) {
        //if user.followers includes body.userID, means we follow him
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.params.id } });

        res.status(200).json("User Unfollowed");
      } else {
        //if  user.followers includes current user , means currentUser is following him already.
        res.status(403).json("cannot unfollow an user twice");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("action invalid.Unfollow failed");
  }
});

//* ///////// GET FRIENDS ///////

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    //NOTE we use Promise.all to Map over friends array
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return userModel.findById(friendId);
      })
    );
    //NOTE we get full User obj. we extract only the properties.
    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, coverPicture } = friend;
      friendList.push({ _id, userName, coverPicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

///* ///////// GET USER with TOKEN after Refresh ///////
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // let allPostArray = [];
    console.log(req.user);
    try {
      const currentUser = req.user;
      //const allUserPosts = await postModel.find({ userId: currentUser._id});
      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

export default router;
