import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from './Logo.png'

const NavBar = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
  
    const toggleNav = () => {
      setIsNavVisible(!isNavVisible);
    };
  
    return (
      <div className="navbar-container">
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="flex-start" spacing={2}>
            <Grid item className="navbar-item">
              <img src={Logo} alt="Logo" className="navbar-logo" />
              <Typography variant="h5" component="div" className="navbar-title">Ignist</Typography>
            </Grid>
            <Grid item>
              {/* Toggle Button for Small Screens */}
              <div className="hamburger-menu" onClick={toggleNav}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <nav className={`navbar-links ${isNavVisible ? 'show' : ''}`}>
                <a href="/home" className="nav-link">Home</a>
                <a href="/All" className="nav-link">Alle publications</a>
                <a href="/create" className="nav-link">Create</a>
              </nav>
            </Grid>
            <Grid item ml="auto">
              <Button variant="outlined" color="primary" className={`navbar-login ${isNavVisible ? 'show' : ''}`}>Login</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };
  
  export default NavBar;