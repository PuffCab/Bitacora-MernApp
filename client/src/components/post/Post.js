import { FavoriteOutlined, MoreVert, ThumbUp } from '@mui/icons-material';
import React from 'react';
import "./post.css";

//    
import { useState, useEffect } from "react";
import authAxios from '../../tools/axios';
import TimeAgo from "react-timeago"


function Post({ post }) {

    // const user = users.filter(u => u.id === 1)
    // console.log(user[0].userName)

    const [like, setLike] = useState(post.likes.length) 
    const [isLiked, setIsLiked] = useState(false)
    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    const [user, setUser] = useState({})
    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const fetchUser = async () => {
            const res = await authAxios.get(`users/${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
        
    }, [post.userId])
    return (
        <div className="post">
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postUserProfileImage"  src={user.coverPicture || testImgFolder + "/user/avatar.jpeg" } alt="Salamanca" />
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
   