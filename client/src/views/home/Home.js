import React, { useContext } from 'react'

import Navbar from "../../components/navbar/Navbar"
import Feed from '../../components/feed/Feed';
import './home.css'
import { AuthContext } from '../../context/AuthContext2';//TEST nuevo
// import Cities from '../Cities'

function Home() {

    const { loggedUser, logout } = useContext(AuthContext)
    // console.log("loggedUser in HOME", loggedUser)
    const userName = loggedUser.userName
    return (
        <div>
            <Navbar/>
            <h5>THIS IS MY HOME</h5>
            {loggedUser ? <button onClick={logout}>logout</button> : "no hay user"}
            <div className="homeContainer">
            <Feed userName={userName}/>   
            </div>
        </div>
    );
}

export default Home
  