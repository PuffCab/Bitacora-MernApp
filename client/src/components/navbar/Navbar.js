import React, { useContext } from 'react';
import "./navbar.css"
import { Chat, Person, Search, Notifications } from "@mui/icons-material"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
    const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)
    console.log(`userName>>>`, user.userName)

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">Bitacora</span>
                    </Link>
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
                <Link to={`/profile/${user.userName}`}>
                    <img src={user.coverPicture || testImgFolder + "/user/avatar.jpeg" } alt="" className="navabarProfilePicture" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
