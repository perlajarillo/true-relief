import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.authListener = this.authListener.bind(this);
    this.authLogOut = this.authLogOut.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    //Adding an observer for changes to the user's sign-in state.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        });
      }
    });
  }

  authLogOut() {
    /*If there is a currentUser means the user press logOut in an active session.
    we will close the session and change state.*/
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      this.setState({
        user: null
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              True Relief
            </Typography>
            <Button tabIndex="-1" color="inherit" component={Link} to="/">
              Home
            </Button>

            {user && (
              <div>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Profile
                </Button>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Track pain
                </Button>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Tools
                </Button>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Local providers
                </Button>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Treatments and products
                </Button>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  onClick={this.authLogOut}
                  component={Link}
                  to="/log-in"
                >
                  Log out
                </Button>
              </div>
            )}

            {!user && (
              <div name="defaultMenus" id="defaultMenus">
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/disclaimer"
                >
                  Sign up
                </Button>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/log-in"
                >
                  Log in
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
