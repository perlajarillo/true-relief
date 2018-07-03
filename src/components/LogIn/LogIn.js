import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase.js';
// importing route Components
import {
  Link,
  Redirect
} from 'react-router-dom'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 6,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    maxWidth: 400,
  },
  text: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class LogIn extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      mail: '',
      password1: '',
      error: '',
      redirectToRegister: false
    };

    /*If there is a currentUser means the user press logOut in an active session.
    we will close the session and change state.*/
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      this.setState({
        redirectToRegister: false
      });
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.mail;
    const password = this.state.password1;
    //Attempting to signIn with email and password and creating a promise to manage the error
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    /*If there is an error, we will capture it and change the state of error 
    to inform the user something went wrong*/
    promise.catch(e =>
      this.setState({
        error: e.message
      }));
    //Adding an observer for changes to the user's sign-in state. 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          redirectToRegister: true
        })
      }
    });
  }

  render() {
    const hidenMenus = document.getElementById('hidenMenus');
    const defaultMenus = document.getElementById('defaultMenus');
    if (hidenMenus) {
      hidenMenus.classList.add('menuHide');
      defaultMenus.classList.remove('menuHide');
    }
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/registration' } }
    const { redirectToRegister } = this.state;
    /*if the redirectToRegister value is true, then we redirect to the registration page
    and show the proper menu bar*/
    if (redirectToRegister) {
      hidenMenus.classList.remove('menuHide');
      defaultMenus.classList.add('menuHide');
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <Grid item xs={12} md={3} lg={3}>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="mail">E-mail</InputLabel>
              <Input id="mail" name="mail" type="email" value={this.state.mail} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" name="password1" type="Password" value={this.state.password1} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <div>
              <Button variant="contained" color="primary" className={classes.button}><Link to="/sign-up_disclamer">Create an account</Link></Button>
              <Button variant="contained" type="submit" color="primary" className={classes.button}>
                Log-in
            </Button>
            </div>
          </Grid>
          <FormHelperText id="error" name="error" value={this.state.error} onChange={this.handleChange}>{this.state.error}</FormHelperText>
        </form>

      </div>
    );
  }
}
LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogIn);