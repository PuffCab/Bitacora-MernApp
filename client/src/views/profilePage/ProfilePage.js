import React from "react";
import "./profilePage.css";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import ProfileInfo from "../../components/profilePage/ProfileInfo";

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img className="profileCoverImg" src="images/user/1.jpeg" alt="" /> */}
              <img className="profileUserImg" src="images/user/3.jpeg" alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">MARCO</h4>
                <span className="profileInfoDesc">This is me</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <ProfileInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;