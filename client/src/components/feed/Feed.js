import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
// import { cities } from '../../dummyData'
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
// import authAxios from "../../tools/axios.js";
// import axios from "axios"//TEST original
import axios2 from "../../tools/axios2"
// import { AuthContext } from '../../context/AuthContext'; //TEST original
import { AuthContext } from '../../context/AuthContext2'; //TEST nuevo


 function Feed({userName}) {
     console.log("userName en FEED", userName)
    const [posts, setPosts] = useState([])
    // const { user } = useContext(AuthContext) //TEST original
    const { loggedUser } = useContext(AuthContext) //TEST nuevo
    // console.log(`user._id>>>`, loggedUser) //ASK por culpa del json.stringify se genera el _Id:$oid:213828

    useEffect(() => {
        const fetchPosts = async () => {
            // console.log(`FEED user._id>>>`, loggedUser)
            const res =   
            
            // userName  ? await axios2.get("posts/profilepage/" + userName ) : //WITH TOKEN hardcoded
            await axios2.get("posts/allUsersPosts/" + loggedUser._id);
            
            const orderedPosts = res.data.sort((a,b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
                setPosts(orderedPosts)
            console.log(`res.data>>>`, res.data)
        }
        
        fetchPosts()
        
    }, [userName, loggedUser])
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
                {loggedUser.userName ? loggedUser.userName : "NOBODY" }
                {console.log(userName)}  
                { userName ? <Share/> : <div></div> }
                 {posts.map((p) => (
                    <Post post={p} key={p._id}/>
                 ))} 
                 
            </div>

        </div>
    )
}

export default Feed
 

