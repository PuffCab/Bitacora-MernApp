import React from 'react'
import "./profileInfo.css"

function ProfileInfo({ user }) {
    

    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <>
            <h4 className="profileTitle">User Information</h4>
            <div className="profileInfo">
                <div className="profileInfoItem">
                    <span className="profileInfoField">Fav City: </span>
                    <span className="profileInfoValue">{user.favCity || "Carbajosa"}</span>
                </div>
                <div className="profileInfoItem">
                    <span className="profileInfoField">From: </span>
                    <span className="profileInfoValue">Salamanca</span>
                </div>
                <div className="profileInfoItem">
                    <span className="profileInfoField">Email </span>
                    <span className="profileInfoValue">{user.email}</span>
                </div>
            </div>
            
            
        </>
    )
}

export default ProfileInfo
