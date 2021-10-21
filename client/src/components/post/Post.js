import { FavoriteOutlined, MoreVert, ThumbUp } from '@mui/icons-material';
import React from 'react';
import "./post.css";

//    
import { useState, useEffect, useContext } from "react";
import authAxios from '../../tools/axios';
import axios from "axios";
import TimeAgo from "react-timeago"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function Post({ post }) {

    // const user = users.filter(u => u.id === 1)
    // console.log(user[0].userName)
    
    const [like, setLike] = useState(post.likes.length) 
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const { user:currentUser } = useContext(AuthContext)
    
    //////////////////////
    //Handle Likes
    ////////////////////// 
    const likeHandler = () => {
        try {
            axios.put("/posts/"+ post._id +"/like", {userId: currentUser._id.$oid})
        } catch(err) {

        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    //check if  currentuser has liked the post before
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id.$oid))
    }, [post.likes, currentUser._id])
     //////////////////////
    //FIN Handle Likes
    //////////////////////


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
            // console.log(res.data)
        }
        fetchUser()
    }, [post.userId])


    // console.log(`user.userName>>>`, user.userName)
    return (
        <div className="post">
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.userName}`}>
                          <img className="postUserProfileImage"  src={user.coverPicture ? testImgFolder+user.coverPicture : testImgFolder + "/user/avatar.jpeg" } alt="Salamanca" />  
                          
                        </Link>
                        
                        <span className="postUserName">{user.userName}</span>
                        <TimeAgo className="postDate" date={post.createdAt} />
                    </div> 
                    <div className="postTopRight">
                         <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.description }</span>
                    <img className="postImage" src={ testImgFolder+post.img } alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <FavoriteOutlined className="favoriteIcon" onClick={likeHandler}/>
                        <ThumbUp className="likeIcon" onClick={likeHandler}/>
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentsCount">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
   