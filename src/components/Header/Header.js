import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './styles.css';
import firebase from '../firebase.js';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
};

function logout(){
    firebase.auth().signOut();
    alert("User logout");
}

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to="/">True Relief</Link>
          </Typography>
          <Button tabIndex="-1" color="inherit">
            <Link to="/">Home</Link>
          </Button>
            <div name="hidenMenus" id="hidenMenus" class="menuHide">
            <Button  tabIndex="-1" color="inherit" ><Link to="/">Profile</Link></Button>
            <Button  tabIndex="-1" color="inherit" ><Link to="/">Track pain</Link></Button>
            <Button  tabIndex="-1" color="inherit" ><Link to="/">Tools</Link></Button>
            <Button  tabIndex="-1" color="inherit" ><Link to="/">Local providers</Link></Button>
            <Button  tabIndex="-1" color="inherit" ><Link to="/">Treatments and products</Link></Button>
            <Button  tabIndex="-1" color="inherit" ><Link to="/log-in">Log out</Link></Button>
            </div>
           <div name="defaultMenus" id="defaultMenus">
            <Button tabIndex="-1" color="inherit">
            <Link to="/sign-up_disclamer">Sign up</Link>
          </Button>
          <Button tabIndex="-1" color="inherit">
            <Link to="/log-in">Log in</Link>
          </Button>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
