import {  Cancel, PermMedia } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import "./share.css";
import { useContext } from  "react";
// import { AuthContext } from "../../context/AuthContext.js"; //TEST original
import { AuthContext } from "../../context/AuthContext2.js"; //TEST nuevo
// import axios from "axios"; //TEST original
import axios2 from '../../tools/axios2';//TEST nuevo

function Share() {

    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER
    
    // const { user } = useContext(AuthContext) //TEST original
    const { loggedUser } = useContext(AuthContext)//TEST nuevo
    // console.log(`user in SHARE`, loggedUser)
    
    
    /////////////////////
    //Create submit post and Upload picture
    /////////////////////
    const postText = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            //TEST userId: loggedUser._id.$oid, //REVIEW the user._id.$oid // original
            userId: loggedUser._id,//TEST nuevo
            description: postText.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName) // REVIEW if order would be 1st ("file", file), it wont worl in server.js with body.req.name , but with file.originalname
            data.append("file", file)
            newPost.img = fileName;
            try{
                await axios2.post("/upload", data);
            } catch(err) {
                console.log(`ERROR uploading file`, err.message)
            }
        }
        try {
            await axios2.post("/posts", newPost)
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
                    <img className="shareProfilePic" src={loggedUser.coverPicture ?  testImgFolder+loggedUser.coverPicture : testImgFolder + "/user/avatar.jpeg"} alt="profilepic" />
                    
                    <input 
                        className="ShareInput" 
                        placeholder="your experience" 
                        ref={postText}  
                    />
                </div>
                <hr />
                {file && (
                    <div className="shareImgContainer">
                        {/* NOTE we create a pseudo URL to preview the uploaded file */}
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="post img" />  
                        <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
                    </div>
                )}
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
        </div> 
    )
}

export default Share
