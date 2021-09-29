import React from 'react';
import "./navbar.css"
import { Search, Person } from "@mui/icons-material"

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <div className="logo">mylogo</div>
            </div>
            <div className="navbarCenter"></div>
                <div className="searchBar">
                    <Search/>
                    <input placeholder="Search...."type="text" className="searchInput" />
                </div>
            <div className="navbarRight">
                <span className="navbarLink">home</span>
                <span className="navbarLink">feed</span>
            </div>
            <div className="navbarIcon">
                <div className="navbarIconElement">
                    <Person/>
                    <span className="topbarIconCount">1</span>
                </div>
            </div>
        </div> 
    );
};

export default Navbar;
