import React from 'react';
import { useState, useEffect } from 'react';
// import { cities } from '../../dummyData'
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import authAxios from "../../tools/axios.js";
import axios from "axios"

 function Feed({userName}) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = userName 
                ? await authAxios.get("posts/profilepage/" + userName ) //WITH TOKEN
                : await axios.get("posts/allUsersPosts/614f8d88ed82bd79bf6d9fbf"); //WITHOUT TOKEN
            setPosts(res.data)
        }
        fetchPosts()
        
    }, [])
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
                 <Share/>
                 {posts.map((p) => (
                    <Post post={p} key={p._id}/>
                 ))} 
                 
            </div>

        </div>
    )
}

export default Feed
 