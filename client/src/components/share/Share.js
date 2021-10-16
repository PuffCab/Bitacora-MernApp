import { PermMedia } from '@mui/icons-material';
import React from 'react'
import "./share.css";

function Share() {
    return (
        <div className="shareComponent">
            <div className="shareContainer">
                <div className="topSharePart">
                    <img className="shareProfilePic" src={require("../../images/user/homer.png").default} alt="profilepic" />
                    <input placeholder="your experience" className="ShareInput" id="" />
                </div>
                <hr />
                <div className="bottomSharePart">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia className="shareIcon"/>
                            <span className="    ">Pic</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>

            </div>
            share component 
        </div> 
    )
}

export default Share
