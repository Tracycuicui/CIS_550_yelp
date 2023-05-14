import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import logo from './logo2.png'; // 引入你的logo图片

export default function CustomNavBar() {
  return (
    <AppBar position="static" className="customAppBar">
      <Toolbar className="customToolbar">
        <img src={logo} alt="logo" className="logo" />
        <div className="navItems">
          <div className="navItemContainer">
            <NavLink to="/" className="navItem">
              Yelp+
            </NavLink>
          </div>
          <div className="navItemContainer">
            <NavLink to="/UserSearch" className="navItem">
              User Search
            </NavLink>
          </div>
          <div className="navItemContainer">
            <NavLink to="/Community" className="navItem">
              Community
            </NavLink>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}