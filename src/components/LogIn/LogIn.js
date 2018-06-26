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
// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

//const auth=firebase.auth();
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

class LogIn extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      mail: '',
      password1: '',
      error: '',
      redirectToRegister: false

    };
    //If there is a currentUser means the user press logOut in an active session.
    const hidenMenus=document.getElementById('hidenMenus');
	const defaultMenus=document.getElementById('defaultMenus');
    if (firebase.auth().currentUser){
    	firebase.auth().signOut();
    	hidenMenus.classList.add('menuHide');
	    defaultMenus.classList.remove('menuHide');
    }
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
      [name]: value
    });
  };

  handleSubmit(e) {
	const hidenMenus=document.getElementById('hidenMenus');
	const defaultMenus=document.getElementById('defaultMenus');  	
    e.preventDefault();
    var email=this.state.mail;
    var password=this.state.password1;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
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
		    error:'',
		    redirectToRegister:true
 	 	});
		}
		else
		{
			this.setState({
			    mail: '',
			    password1: '',
			    error:'Invalid credentials, please try again.',
			    redirectToRegister:false
		    });
		} 
	});
	//We also need to change the state of the object

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