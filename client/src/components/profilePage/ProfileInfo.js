import React from 'react'
import "./profileInfo.css"

function ProfileInfo() {
    return (
        <>
            <h4 className="profileTitle">User Information</h4>
            <div className="profileInfo">
                <div className="profileInfoItem">
                    <span className="profileInfoField">City: </span>
                    <span className="profileInfoValue">Salamanca</span>
                </div>
                <div className="profileInfoItem">
                    <span className="profileInfoField">From: </span>
                    <span className="profileInfoValue">Carbajosa</span>
                </div>
                <div className="profileInfoItem">
                    <span className="profileInfoField">Funfact: </span>
                    <span className="profileInfoValue">not funny facts</span>
                </div>
            </div>
            <h4 className="profileTitle">User Friends</h4>
            <div className="profileFollowings">
                <div className="profileFollowing">
                    <img src="images/user/4.jpeg" alt="" className="profileFollowingImg" />
                    <span className="profileFollowingName">Alguien Perez </span>
                </div>
                <div className="profileFollowing">
                    <img src="images/user/5.jpeg" alt="" className="profileFollowingImg" />
                    <span className="profileFollowingName">Alguien Lopez </span>
                </div>
                <div className="profileFollowing">
                    <img src="images/user/6.jpeg" alt="" className="profileFollowingImg" />
                    <span className="profileFollowingName">Alguien Gutierrez </span>
                </div>
                <div className="profileFollowing">
                    <img src="images/user/7.jpeg" alt="" className="profileFollowingImg" />
                    <span className="profileFollowingName">Alguien Sanchez </span>
                </div>
            </div>
            
        </>
    )
}

export default ProfileInfo
