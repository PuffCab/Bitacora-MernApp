import React, { useContext } from "react";

import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { AuthContext } from "../../context/AuthContext2"; //TEST nuevo
import Share from "../../components/share/Share";
// import Cities from '../Cities'

function Home() {
  const { loggedUser, logout } = useContext(AuthContext);
  // console.log("loggedUser in HOME", loggedUser)
  const userName = loggedUser.userName;
  return (
    <div>
      <Navbar />
      {/* {loggedUser ? <button onClick={logout}>logout</button> : "no hay user"} */}
      <div className="homeContainer">
        {/* {loggedUser.userName ? loggedUser.userName : "NOBODY" } */}
        {userName ? <Share /> : <div></div>}
        <Feed userName={userName} />
      </div>
    </div>
  );
}

export default Home;
