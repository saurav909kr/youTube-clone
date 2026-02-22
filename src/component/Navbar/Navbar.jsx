import React from "react";
import "./Navbar.css";
import menuIcon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";

function Navbar({setsidebar}) {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img src={menuIcon} alt="" className="menu-icon" onClick={()=>setsidebar(prev=>prev === false?true:false)}/>
        <Link to='/'><img src={logo} alt="" className="logo" /></Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="search" />
          <img src={search} alt="" />
        </div>
      </div>
      <div className="nav-right div-flex">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification} alt="" />
        <img src={profile_icon} alt="" className="user-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
