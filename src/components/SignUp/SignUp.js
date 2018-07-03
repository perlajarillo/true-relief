import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import firebase from '../firebase.js';
// import route Components
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      password1: '',
      password2: '',
      error: '',
      redirectToRegister: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var email = this.state.mail;
    var password = this.state.password1;
    var password2 = this.state.password2;
    //password and password confirmation must be equal
    if (password == password2) {
      //Trying to create a new account with the information provided by the user  
      const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
      //If there are any errors during creating the account we inform the user about it
      promise.catch(e =>
        this.setState({
          password1: '',
          password2: '',
          error: e.message
        }));
      //If no errors where founded the user will be redirected to the registration module
      promise.then(user => {
        this.setState({
          redirectToRegister: true
        })
      });
    }
    else {
      this.setState({
        password1: '',
        password2: '',
        error: 'The passwords must be equal.'
      });
    }
  }

  render() {
    const hidenMenus = document.getElementById('hidenMenus');
    const defaultMenus = document.getElementById('defaultMenus');

    const { from } = this.props.location.state || { from: { pathname: '/registration' } }
    const { redirectToRegister } = this.state;
    //if the redirectToRegister value is true, then we redirect to the registration page
    if (redirectToRegister) {
      hidenMenus.classList.remove('menuHide');
      defaultMenus.classList.add('menuHide');
      return (
        <Redirect to={from} />
      )
    }
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={9} lg={6}>
            <Typography variant="display3">True Relief</Typography>
            <Typography gutterBottom variant="subheading">The information you provide in this web site is for educational purposes only and it is not intended to prevent diagnose of treat any medical conditions.
            </Typography>
            <Typography variant="subheading">
              Your information will be kept private.
            </Typography>
          </Grid>
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
              <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
                <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
                <Input id="passwordConfirm" name="password2" type="Password" value={this.state.password2} onChange={this.handleChange} />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
              <div>
                <Button variant="contained" color="primary" className={classes.button}><Link to="/log-in">I have an account</Link></Button>
                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                  Create an Account
            </Button>
              </div>
            </Grid>
            <FormHelperText id="error" name="error" value={this.state.error} onChange={this.handleChange}>{this.state.error}</FormHelperText>
          </form>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);