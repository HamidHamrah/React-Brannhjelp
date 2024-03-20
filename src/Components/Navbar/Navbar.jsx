import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import AccountCircle icon
import Box from '@mui/material/Box'; // Import Box for layout
import Logo from "./Logo.png";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null); // State to manage user menu anchor
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.sub); // Assuming 'sub' contains the username
      } catch (error) {
        console.error("Error decoding token: ", error);
      }
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove('jwtToken'); // Remove JWT token
    setUserName(null); // Update username state
    handleCloseUserMenu(); // Close the user menu
    navigate('/Login'); // Redirect to login page
  };

  const navigateTo = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  return (
    <div className="navbar-container">
      {isMobile ? (
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <MenuItem onClick={() => navigateTo('/home')}>Home</MenuItem>
              <MenuItem onClick={() => navigateTo('/All')}>All Publications</MenuItem>
              <MenuItem onClick={() => navigateTo('/create')}>Create</MenuItem>
            </Menu>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Ignist
            </Typography>
            {userName ? (
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{ p: 0 }}>
                  <AccountCircle sx={{ mr: 1 }} />
                  <Typography variant="body1">{userName}</Typography>
                </IconButton>
                <Menu
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={() => navigateTo('/Login')}>Login</Button>
            )}
          </Toolbar>
        </AppBar>

) : (
        <div className="navbar-item">
          <img src={Logo} alt="Logo" className="navbar-logo" />
          <Typography variant="h5" component="div" className="navbar-title">Ignist</Typography>
          <div className="navbar-links">
            <a href="/home" className="nav-link">Home</a>
            <a href="/All" className="nav-link">All Publications</a>
            <a href="/create" className="nav-link">Create</a>
          </div>
          {userName ? (
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{ p: 0 }}>
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="body1">{userName}</Typography>
              </IconButton>
              <Menu
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button variant="outlined" color="primary" className="navbar-login" onClick={() => navigateTo('/Login')}>Login</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
