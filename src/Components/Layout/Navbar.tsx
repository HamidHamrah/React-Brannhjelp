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
import { useAuth } from '../../Authentication/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {jwtDecode} from 'jwt-decode';  // Ensure jwt-decode is imported

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const token = getCookieValue('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        setUserRole(role);
      } catch (error) {
        console.error("Failed to decode JWT or invalid token", error);
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
    logout();
    handleCloseUserMenu();
    navigate('/Home');
  };

  const navigateTo = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  const userName = user ? user.sub + " " + user.acr : null;
  const userId = user?.userId;
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
              {userRole === 'Admin' && (
                <>
                  <MenuItem onClick={() => navigateTo('/All')}>All Publications</MenuItem>
                  <MenuItem onClick={() => navigateTo('/create')}>Create</MenuItem>
                  <MenuItem onClick={() => navigateTo('/AllUsers')}>Manage User</MenuItem>
                </>
              )}
            </Menu>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Brannhjelp
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
                  <MenuItem onClick={() => navigate(`/edit-user/${userId}`)}>Profile</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={() => navigateTo('/Login')}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      ) : (
        <div className="navbar-item">
          <a href="/home">
            <img src={Logo} alt="Logo" className="navbar-logo" />
          </a>
          <Typography variant="h5" component="div" className="navbar-title">Brannhjelp</Typography>
          <div className="navbar-links">
            <MenuItem onClick={() => navigateTo('/home')}>
              <HomeIcon sx={{ mr: 1 }} /> Home {/* Home Icon */}
            </MenuItem>
            {userRole === 'Admin' && (
              <>
                <MenuItem onClick={() => navigateTo('/create')}>
                  <CreateIcon sx={{ mr: 1 }} /> Create {/* Create Icon */}
                </MenuItem>
                <MenuItem onClick={() => navigateTo('/All')}>
                  <LibraryBooksIcon sx={{ mr: 1 }} /> All Publications {/* LibraryBooks Icon */}
                </MenuItem>
                <MenuItem onClick={() => navigateTo('/AllUsers')}>
                  <PeopleAltIcon sx={{ mr: 1 }} /> Manage user {/* PeopleAlt Icon */}
                </MenuItem>
              </>
            )}
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
                <MenuItem onClick={() => navigate(`/edit-user/${userId}`)}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigateTo('/Login')}>Login</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
