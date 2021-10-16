import { FavoriteOutlined, MoreVert, ThumbUp } from '@mui/icons-material';
import React from 'react';
import "./post.css";

import { users } from '../../dummyData'
import { useState } from "react";

function Post({ post }) {

    // const user = users.filter(u => u.id === 1)
    // console.log(user[0].userName)

    const [like, setLike] = useState(post.like) 
    const [isLiked, setIsLiked] = useState(false)
    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postUserProfileImage"  src={users.filter((u) => u.id === post.userId)[0].profilePicture} alt="Salamanca" />
                        <span className="postUserName">{users.filter((u) => u.id === post.userId)[0].userName}</span>
                        <span className="postDate">{post.date}</span>
                    </div> 
                    <div className="postTopRight">
                         <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImage" src={ post.photo } alt="" />
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
   