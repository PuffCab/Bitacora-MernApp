import React from 'react';
import "./navbar.css"
import { Chat, Person, Search, Notifications } from "@mui/icons-material"


const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <div className="logo">
                    <h6>Bitacora</h6>
                </div>
            </div>
            <div className="navbarCenter"></div>
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search...."type="text" className="searchInput" />
                </div>
            <div className="navbarRight">
                <div className="navbarLinks"> 
                    <span className="navbarLink">home</span>
                    <span className="navbarLink">Feed</span>
                </div>
                <div className="navbarIcons">
                    <div className="navabarIconElement">
                        <Person/>
                        <span className="navbarIconCount">0</span>
                    </div>
                </div>
                <div className="navbarIcons">
                    <div className="navabarIconElement">
                        <Chat/>
                        <span className="navbarIconCount">0</span>
                    </div>
                </div>
                <div className="navbarIcons">
                    <div className="navabarIconElement">
                        <Notifications/>
                        <span className="navbarIconCount">0</span>
                    </div>
                </div>
                <img src={"https://lapsuspsych.files.wordpress.com/2015/02/homer.png"} alt="" className="navabarProfilePicture" />
            </div>
        </div>
    );
};

export default Navbar;
