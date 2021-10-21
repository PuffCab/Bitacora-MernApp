import React, { useEffect, useState } from "react";
import "./profilePage.css";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import ProfileInfo from "../../components/profilePage/ProfileInfo";
import authAxios from "../../tools/axios";
import { useParams } from "react-router-dom"
import Friends from "../../components/friends/Friends";


function ProfilePage() {

const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER  

const [user, setUser] = useState({})
const userName = useParams().username
// console.log(`params`, params)

useEffect(() => {
  const fetchUser = async () => {
      const res = await authAxios.get(`users?userName=${userName}`)
      setUser(res.data)
      console.log(res.data)
  }
  fetchUser()
  
}, [userName])

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img className="profileCoverImg" src="images/user/1.jpeg" alt="" /> */}
              <img className="profileUserImg" src={user.coverPicture ? testImgFolder+user.coverPicture : testImgFolder + "/user/avatar.jpeg"} alt="" />
            </div>
            <div className="profileInfo">  
                <h4 className="profileInfoName">{user.userName}</h4>
                <span className="profileInfoDesc">{user.userName}</span> 
            </div>
          </div>
          <div className="profileRightBottom">
            <ProfileInfo user={user} />
            <Friends user={user}/>
            <Feed userName={userName}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
