import { FavoriteOutlined, MoreVert, ThumbUp } from '@mui/icons-material';
import React from 'react';
import "./post.css";

function Post() {
    return (
        <div className="post">
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postUserProfileImage"  src="https://lapsuspsych.files.wordpress.com/2015/02/homer.png" alt="Salamanca" />
                        <span className="postUserName">UsernameHere</span>
                        <span className="postDate">10 min ago</span>
                    </div>
                    <div className="postTopRight">
                         <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">this is my first post</span>
                    <img className="postImage" src="https://st.depositphotos.com/1591133/3881/i/600/depositphotos_38810541-stock-photo-beautiful-view-of-the-historic.jpg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <FavoriteOutlined className="favoriteIcon"/>
                        <ThumbUp className="likeIcon"/>
                        <span className="postLikeCounter">22 likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentsCount">4 comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
  