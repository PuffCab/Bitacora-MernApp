import React, { useContext } from "react";
import "./navbar.css";
import { Chat, Person, Search, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { AuthContext } from '../../context/AuthContext'; //TEST original
import { AuthContext } from "../../context/AuthContext2"; //TEST nuevo

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const testImgFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  // const { user } = useContext(AuthContext) //TEST original
  const { loggedUser, logout } = useContext(AuthContext);
  // console.log(`NAVBAR userName>>>`, loggedUser.userName)

  //////////
  //MUI menu constants
  //////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ////////// \\\\\\\\

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
        <Search className="searchIcon" />
        <input placeholder="Search...." type="text" className="searchInput" />
      </div>
      <div className="navbarRight">
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "white" }}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/" className="navbarLink">
              Home
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link exact to="/register" className="navbarLink">
              register
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/login" className="navbarLink">
              login
            </Link>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
          >
            <Link to="/login" className="navbarLink">
              logOUT
            </Link>
          </MenuItem>
        </Menu>
        <div className="navbarIcons">
          <div className="navabarIconElement">
            <Person />
            <span className="navbarIconCount">0</span>
          </div>
        </div>
        <div className="navbarIcons">
          <div className="navabarIconElement">
            <Chat />
            <span className="navbarIconCount">0</span>
          </div>
        </div>
        <div className="navbarIcons">
          <div className="navabarIconElement">
            <Notifications />
            <span className="navbarIconCount">0</span>
          </div>
        </div>
        <Link to={`/profilepage/${loggedUser._id}`}>
          <img
            src={
              loggedUser.coverPicture
                ? testImgFolder + loggedUser.coverPicture
                : testImgFolder + "/user/avatar.jpeg"
            }
            alt=""
            className="navabarProfilePicture"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
