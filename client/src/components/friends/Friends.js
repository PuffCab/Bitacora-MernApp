import React, { useEffect, useState } from 'react';
import "./friends.css"
import axios from 'axios';



function Friends({ user }) {
    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER
    

    const [friends, setFriends] = useState([])

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

    return (
        <>
            <h4 className="friendsTitle">User Friends</h4>
            <div className="friendsFollowings">
            
            {friends.map((friend) => (

                <div className="friendsFollowing">
                    <img 
                        src={friend.coverPicture ? testImgFolder + friend.coverPicture : testImgFolder+"/user/4.jpeg"} 
                        alt="" className="friendsFollowingImg" 

                    />
                    <span className="friendsFollowingName">{friend.userName} </span>
                </div> 
            ))}

            </div>
        </>
    );
}

export default Friends;