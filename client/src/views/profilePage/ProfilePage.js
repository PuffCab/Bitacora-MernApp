import React, { useEffect, useState, useContext } from "react";
import "./profilePage.css";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
// import authAxios from "../../tools/axios";//TEST original
// import axios from "axios";
import { useParams } from "react-router-dom";
import Friends from "../../components/friends/Friends";

import axios2 from "../../tools/axios2"; //TEST nuevo
import { AuthContext } from "../../context/AuthContext2";
import { AddAPhoto, PermMedia } from "@mui/icons-material";

function ProfilePage() {
  const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const userId = useParams().userId; //TEST original
  const [file, setFile] = useState(null);

  console.log(`userName in Profilepage`, userId);

  const { loggedUser } = useContext(AuthContext);
  // const userId = loggedUser._id //TEST nuevo
  console.log(`PROFILEPAGE loggedUser>>>`, loggedUser);
  const userName = loggedUser.userName;

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
      const res = await axios2.get("/users/profile/" + userId); //TEST nuevo
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updateUserWithPic = {
      userId: loggedUser._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName); // REVIEW if order would be 1st ("file", file), it wont worl in server.js with body.req.name , but with file.originalname
      data.append("file", file);
      updateUserWithPic.coverPicture = fileName;
      try {
        await axios2.post("/upload", data);
        console.log(`picture uploaded to Server`, data);
      } catch (err) {
        console.log(`ERROR uploading file`, err.message);
      }
    }
    try {
      await axios2.put("/users/" + userId, updateUserWithPic);
      window.location.reload(); // REVIEW cheap trick to refresh after uploading. Later create a post context and update post state
      console.log(`user updated with Picture`, updateUserWithPic);
    } catch (err) {
      console.log("error", err.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img className="profileCoverImg" src="images/user/1.jpeg" alt="" /> */}
              <img
                className="profileUserImg"
                src={
                  user.coverPicture
                    ? testImgFolder + user.coverPicture
                    : testImgFolder + "/user/avatar.jpeg"
                }
                alt=""
              />
              <form className="profileIconsContainer" onSubmit={submitHandler}>
                <div className="profileButtons">
                  <label className="profileOption" htmlFor="file">
                    <AddAPhoto className="profileIcon" />
                    <input
                      type="file"
                      id="file"
                      accept=".png, .jpg, .jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    {/* we do fil[0] to allow only 1 file upload */}
                  </label>
                </div>
                <button className="profileSendButton" type="submit">
                  edit
                </button>
              </form>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDesc">
                {user.description || "no hay description"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <ProfileInfo user={user} />
            <div className="botonPrueba">
              <Friends user={user} />
            </div>

            <Feed userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
