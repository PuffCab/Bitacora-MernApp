import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
// import { cities } from '../../dummyData'
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import authAxios from "../../tools/axios.js";
import axios from "axios"
import { AuthContext } from '../../context/AuthContext';


 function Feed({userName}) {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    console.log(`user._id>>>`, user._id.$oid) //ASK por culpa del json.stringify se genera el _Id:$oid:213828

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(`user._id>>>`, user._id)
            const res = userName 
            
                ? await axios.get("posts/profilepage/" + userName ) //WITH TOKEN hardcoded
                : await axios.get("posts/allUsersPosts/" + user._id.$oid); //WITHOUT TOKEN
            
            const orderedPosts = res.data.sort((a,b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
                setPosts(orderedPosts)
            console.log(`res.data>>>`, res.data)
        }
        
        fetchPosts()
        
    }, [userName, user._id])
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
                {(!userName || userName === user.userName) && <Share/> }

                 {posts.map((p) => (
                    <Post post={p} key={p._id}/>
                 ))} 
                 
            </div>

        </div>
    )
}

export default Feed
 