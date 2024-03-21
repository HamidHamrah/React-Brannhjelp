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
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Logo from "./Logo.png";
import { useAuth } from '../Authentication/Auth/AuthContext'; // Import useAuth hook
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth(); // Destructure logout function from useAuth
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // If there's a need to fetch the user name from the user object
    // setUserName(user ? user.name : null); // Adjust according to your user object structure
  }, [user]);

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
    logout(); // Use centralized logout logic
    handleCloseUserMenu(); // Close the user menu
    navigate('/Home'); // Redirect to login page
  };

  const navigateTo = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  // The rest of your NavBar component remains unchanged
  // Remember to replace userName with the appropriate property from the user object if necessary
  const userName = user ? user.sub : null; // Example to get userName, adjust based on your actual user object structure


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
              <MenuItem onClick={() => navigateTo('/#')}>Mange user</MenuItem>
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
            <MenuItem onClick={() => navigateTo('/home')}>
              <HomeIcon sx={{ mr: 1 }} /> Home {/* Home Icon */}
            </MenuItem>
            <MenuItem onClick={() => navigateTo('/create')}>
                <CreateIcon sx={{ mr: 1 }} /> Create {/* Create Icon */}
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/All')}>
                <LibraryBooksIcon sx={{ mr: 1 }} /> All Publications {/* LibraryBooks Icon */}
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/AllUsers')}>
                <PeopleAltIcon sx={{ mr: 1 }} /> Manage user {/* PeopleAlt Icon */}
              </MenuItem>

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
