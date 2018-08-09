import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "sticky"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      mobileOpen: false
    };

    this.authListener = this.authListener.bind(this);
    this.authLogOut = this.authLogOut.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <Fragment>
        <AppBar className={classes.root}>
          <Toolbar>
            {Boolean(user) &&
            <IconButton
              className={classes.navIconHide}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>}
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

            {!user && (<div name="defaultMenus" id="defaultMenus">
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
              </div>)}

            {Boolean(user) && (<div>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  onClick={this.authLogOut}
                  component={Link}
                  to="/log-in"
                >
                  Log out
                </Button>
            </div>)}
              {Boolean(user) && <SwipeableDrawer
                anchor="left"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                onOpen={this.handleDrawerToggle}
              >
                <div className={classes.list}>
                  <List><Button tabIndex="-1" color="inherit" component={Link} to="/">
                    Profile
                  </Button></List>
                  <List><Button tabIndex="-1" color="inherit" component={Link} to="/">
                    Track pain
                  </Button></List>
                  <List><Button tabIndex="-1" color="inherit" component={Link} to="/">
                    Tools
                  </Button></List>
                  <List><Button tabIndex="-1" color="inherit" component={Link} to="/">
                    Local providers
                  </Button></List>
                  <List><Button tabIndex="-1" color="inherit" component={Link} to="/">
                    Treatments and products
                  </Button></List>
                </div>
              </SwipeableDrawer>}

          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
