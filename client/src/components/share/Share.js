import { AutoFixOffSharp, PermMedia } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import "./share.css";
import { useContext } from  "react";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

function Share() {

    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER
    
    const { user } = useContext(AuthContext)
    console.log(`user`, user)
    
    
    /////////////////////
    //Create and submit post
    /////////////////////
    const postText = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id.$oid, //REVIEW the user._id.$oid
            description: postText.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName) // REVIEW if order would be 1st ("file", file), it wont worl in server.js with body.req.name , but with file.originalname
            data.append("file", file)
            newPost.img = fileName;
            try{
                await axios.post("/upload", data);
            } catch(err) {
                console.log(`ERROR uploading file`, err.message)
            }
        }
        try {
            await axios.post("/posts", newPost)
            window.location.reload() // REVIEW cheap trick to refresh after uploading. Later create a post context and update post state
            console.log(`newPost`, newPost)
        } catch(err){
            console.log("error", err.message)
        }
    }
    return (
        <div className="shareComponent">
            <div className="shareContainer">
                <div className="topSharePart">
                    <img className="shareProfilePic" src={user.coverPicture ? user.coverPicture : testImgFolder + "/user/avatar.jpeg"} alt="profilepic" />
                    {console.log("COVER PICTURE!!!", user.coverPicture)}
                    <input 
                        className="ShareInput" 
                        placeholder="your experience" 
                        ref={postText}  
                    />
                </div>
                <hr />
                <form className="bottomSharePart" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor="file">
                            <PermMedia className="shareIcon"/>
                            <span className="shareOptionText">Pic</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png, .jpg, .jpg" 
                                onChange={(e) => setFile(e.target.files[0])} 
                                style={{display: "none"}} 
                            />
                            {/* we do fil[0] to allow only 1 file upload */}
                        </label>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>

            </div>
            share component 
        </div> 
    )
}

export default Share
