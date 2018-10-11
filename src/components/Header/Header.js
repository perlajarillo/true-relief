import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";
import AuthUserContext from "../AuthUserContext";
import logo from "../../images/logo-h.svg";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
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
  logoStyles: {
    margin: "16px 0",
    flex: 1
  },
  logo: {
    width: "124px",
    height: "45px",
    [theme.breakpoints.up("md")]: {
      width: "270px",
      height: "45px"
    }
  }
});

const NavAuthUser = props => {
  const { classes, mobileOpen, toggle } = props;
  return (
    <div>
      <AppBar className={classes.root} positionsticky="true">
        <Toolbar>
          <IconButton
            className={classes.navIconHide}
            color="inherit"
            aria-label="Menu"
            onClick={toggle}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.logoStyles}>
            <img src={logo} alt="True relief" className={classes.logo} />
          </Link>
          <Button tabIndex="-1" color="inherit" component={Link} to="/">
            Home
          </Button>
          <LogOut />
          <SwipeableDrawer
            anchor="left"
            open={mobileOpen}
            onClose={toggle}
            onOpen={toggle}
          >
            <div className={classes.list}>
              <List>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/editProfile"
                >
                  Profile
                </Button>
              </List>
              <List>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/trackPain"
                >
                  Track pain
                </Button>
              </List>
              <List>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Tools
                </Button>
              </List>
              <List>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Local providers
                </Button>
              </List>
              <List>
                <Button tabIndex="-1" color="inherit" component={Link} to="/">
                  Treatments and products
                </Button>
              </List>
              <List>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/settings"
                >
                  Settings
                </Button>
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavNoAuth = props => {
  const { classes } = props;
  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <figure className={classes.logoStyles}>
            <img src={logo} alt="True relief" className={classes.logo} />
          </figure>
          <Button tabIndex="-1" color="inherit" component={Link} to="/">
            Home
          </Button>
          <div name="defaultMenus" id="defaultMenus">
            <Button
              tabIndex="-1"
              color="inherit"
              component={Link}
              to="/disclaimer"
            >
              Sign up
            </Button>
            <Button tabIndex="-1" color="inherit" component={Link} to="/log-in">
              Log in
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle = event => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavAuthUser
              classes={classes}
              mobileOpen={mobileOpen}
              toggle={this.handleDrawerToggle}
            />
          ) : (
            <NavNoAuth classes={classes} />
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
