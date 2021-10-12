import { PermMedia } from '@mui/icons-material';
import React from 'react'
import "./share.css";

function Share() {
    return (
        <div className="shareComponent">
            <div className="shareContainer">
                <div className="topSharePart">
                    <img className="shareProfilePic" src="https://lapsuspsych.files.wordpress.com/2015/02/homer.png" alt="profilepic" />
                    <input placeholder="your experience" className="ShareInput" id="" />
                </div>
                <hr />
                <div className="bottomSharePart">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia className="shareIcon"/>
                            <span className="shareOptionText   ">Pic</span>
                        </div>
                    </div>
                </div>

            </div>
            share component 
        </div> 
    )
}

export default Share
