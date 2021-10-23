import React, { useContext, useEffect, useState } from 'react';
import "./friends.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from "../../context/AuthContext.js";
import { Add, Remove } from '@mui/icons-material';

function Friends({ user }) {
    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER
    

    const [friends, setFriends] = useState([])
    const {user:currentUser} = useContext(AuthContext)
    const [isFriend, setIsFriend] = useState(false)

    useEffect ( () => {
        setIsFriend(currentUser.friends.includes(user?.id))
    }, [currentUser, user.id]) 


    useEffect(() => {
        //NOTE we can't use async with useEffect-> I create a new function inside
        const getFriends = async () =>{
            try {
                const friendList = await axios.get("/users/friends/"+user._id)
                setFriends(friendList.data)
                console.log(`friendList>>>>`, friendList)
            } catch (err) {
                console.log(err.message)
            }
        };
        getFriends();
    }, [user])
    
    const handleClick = async () => {
        try {
            if(isFriend) {
                await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id})
            } else {
                await axios.put("/users/"+user._id+"/follow", {userId: currentUser._id})
            }
        } catch (err) {
            console.log(err)
        }
        setIsFriend(!isFriend)
    }
    return (
        <>
            <h4 className="friendsTitle">User Friends</h4>
            <div className="friendsFollowings">
            
            {user.userName !== currentUser.userName && (
                <button 
                    className="friendsFollowButton" 
                    onClick={handleClick} >
                    
                    {isFriend ? "Unfollow" : "Follow"}
                    {isFriend ? <Remove/> : <Add />}
                    
                </button>)}
                {/* REVIEW esto no tiene sentido aqui, sino en una vista con todos los post de todos los users...y que en el profile se vean solo los post de amigos...o algo asi */}
            
            {friends.map((friend) => (
                <Link to={"/profile/"+friend.userName} style={{textDecoration:"none"}}>  
                {/* REVIEW no se si tiene sentido mandarlo al profile de un user, si es ruta protegida. quiza mandarlo a sus posts */}
                    <div className="friendsFollowing">
                        <img 
                            src={friend.coverPicture ? testImgFolder + friend.coverPicture : testImgFolder+"/user/4.jpeg"} 
                            alt="" className="friendsFollowingImg" 

                        />
                        <span className="friendsFollowingName">{friend.userName} </span>
                    </div> 
                </Link>
            ))}

            </div>
        </>
    );
}

export default Friends;