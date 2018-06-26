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
import Header from '../Header/Header';
// import route Components
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 6,

  },
  /* container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  }, */
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    /* fullWidth: 'false', */
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
      redirectToRegister:false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('target', target, 'name', name, 'value', value);
    this.setState({
      [name]: value,
      [name]: value,
      [name]: value,
      [name]: value,
      [name]: value

    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var email=this.state.mail;
    var password=this.state.password1;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
    //If there is a currentUser means the user press logOut in an active session.
    const hidenMenus=document.getElementById('hidenMenus');
    const defaultMenus=document.getElementById('defaultMenus');
    var user = firebase.auth().currentUser;
    //If the user was autenthicated then we show the propor menus
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
      alert("User made log in: "+user.email+ " and we must redirect to the demographic section");
      hidenMenus.classList.remove('menuHide');
      defaultMenus.classList.add('menuHide');
      this.setState({
      mail: '',
      password1: '',
      password2: '',
      error:'',
      redirectToRegister:true
    });
    } 
    else
    {
      this.setState({
      mail: '',
      password1: '',
      password2: '',
      error:'The account was not created!',
      redirectToRegister:false
    });
    }
  });
  
    /* TODO */
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '../Registration/Registration.js' } }
        const { redirectToRegister } = this.state;
        //if the redirectToRegister value is true, then we redirect to the registration page
    if (redirectToRegister) {
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