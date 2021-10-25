import React, { useEffect, useState, useContext } from "react";
import "./profilePage.css";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import ProfileInfo from "../../components/profilePage/ProfileInfo";
// import authAxios from "../../tools/axios";//TEST original
// import axios from "axios";
import { useParams } from "react-router-dom"
import Friends from "../../components/friends/Friends";

import axios2 from '../../tools/axios2'; //TEST nuevo
import {AuthContext } from '../../context/AuthContext2';


function ProfilePage() {

const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER  

const [user, setUser] = useState({})
const userId = useParams().userId //TEST original

// console.log(`userName in Profilepage`, userId)

const { loggedUser } = useContext(AuthContext)
// const userId = loggedUser._id //TEST nuevo 
console.log(`PROFILEPAGE loggedUser>>>`, loggedUser)
const userName = loggedUser.userName

// useEffect(() => {
//   const fetchUser = async () => {
//       const res = await axios2.get(`users?userName=${loggedUser.userName}`)
//       setUser(res.data)
//       console.log(res.data)
//   }
//   fetchUser()
  
// }, [loggedUser.userName]) //FIXME not working ..changed GET USER route for only id ... fix.

useEffect(() => {
  const fetchUser = async () => {
      // const res = await axios2.get(`users?userId=${userId}`)//TEST original
      const res = await axios2.get("/users/profile/"+userId) //TEST nuevo
      setUser(res.data)
      console.log(res.data)
  }
  fetchUser()
  
}, [userId])

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
                <span className="profileInfoDesc">{user.description || "no hay description"}</span> 
            </div>
          </div>
          <div className="profileRightBottom">
            <ProfileInfo user={user} />
            <div className="botonPrueba">
              <Friends user={user}/>
            </div>
            
            <Feed userName={userName}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
