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
import "./styles.css";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12
  }
};

class Header extends Component {
  constructor(props) {
    super(props);

/* Firebase nos da un objeto con los datos del usuarion en caso de que exista. Lo vamos a usar para redirigir nuestras páginas. Lo setamos al inicio como null*/
    this.state = {
      user: null
    };

    this.authListener = this.authListener.bind(this);
    this.authLogOut = this.authLogOut.bind(this);
  }

  /* Este es un life cycle hook de React, se instancia cuando se crea el componente, aquí vamos a ver si existe un usuario con el listener que nos da Firebase */
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

  /* Escuchamos si el usuario ha desconectado*/
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
              <Link to="/">True Relief</Link>
            </Typography>
            <Button tabIndex="-1" color="inherit">
              <Link to="/">Home</Link>
            </Button>

            {/* Si existe un usuario mostramos el "dashboard" del perfil */}
            {user && (
              <div>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/">Profile</Link>
                </Button>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/">Track pain</Link>
                </Button>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/">Tools</Link>
                </Button>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/">Local providers</Link>
                </Button>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/">Treatments and products</Link>
                </Button>
                <Button tabIndex="-1" color="inherit" onClick={this.authLogOut}>
                  <Link to="/log-in">Log out</Link>
                </Button>
              </div>
            )}

            {/* Si NO hay un usuario mostramos estos botones */}
            {!user && (
              <div name="defaultMenus" id="defaultMenus">
                <Button tabIndex="-1" color="inherit">
                  <Link to="/disclaimer">Sign up</Link>
                </Button>
                <Button tabIndex="-1" color="inherit">
                  <Link to="/log-in">Log in</Link>
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
