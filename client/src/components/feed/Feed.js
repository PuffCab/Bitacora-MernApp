import React, { useContext } from "react";
import { useState, useEffect } from "react";
// import { cities } from '../../dummyData'
import Post from "../post/Post";
import "./feed.css";
import axios2 from "../../tools/axios2";

import { AuthContext } from "../../context/AuthContext2";

function Feed({ userName }) {
  //  console.log("userName en FEED", userName)

  const [posts, setPosts] = useState([]);
  const { loggedUser } = useContext(AuthContext);

  const orderedPosts = (fetchedPosts) => {
    const postOrdered = fetchedPosts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setPosts(postOrdered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (window.location.toString().includes("profilepage")) {
        const res = await axios2.get(
          "posts/userAndFriendsPosts/" + loggedUser._id
        );
        orderedPosts(res.data);
        // console.log(`ONLY user and Friends>>>`, res.data);
      } else {
        const res = await axios2.get("posts/allUsersPosts/" + loggedUser._id);
        orderedPosts(res.data);
        // console.log(`ALL POSTS`, res.data);
      }
    };

    fetchPosts();
  }, [userName, loggedUser]);
  // useEffect(() => {

  //     const getCities = async () => {
  //         const response = await fetch(
  //             "http://localhost:5000/api/trips/all"
  //         );
  //         const obj = await response.json()
  //         console.log(obj)

  //     };

  //     getCities()
  // }, []);
  return (
    <div className="feed">
      <div className="feedContainer">
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
