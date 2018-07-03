import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import './styles.css';
// importing route Components
import {
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

class SignUp_disclamer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chkdisclamer: false,
      error: '',
      redirectToSignUp: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
      chkdisclamer: !this.state.chkdisclamer
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const chkdisclamer = this.state.chkdisclamer;
    if (chkdisclamer) {
      this.setState({
        redirectToSignUp: true
      });
    }
    else {
      this.setState({
        error: 'You must agree with the terms and conditions!'
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/sign-up' } }
    const { redirectToSignUp } = this.state;
    //if the redirectToRegister value is true, then we redirect to the registration page
    if (redirectToSignUp) {
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

            <Typography variant="subheading">
              Please read and agree with the <a href="/policy" target="_blank" class="hiper">terms and conditions </a> in order to continue.
            </Typography>
          </Grid>
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControlLabel control={<Checkbox name="chkdisclamer" value={this.state.chkdisclamer} isChecked="false" onChange={this.handleChange} required />} label="I have read terms and conditions and I agree with them." />
              <div>
                <Button variant="contained" type="submit" color="primary" className={classes.button}>Continue</Button>
              </div>
            </Grid>
            <FormHelperText id="error" name="error" value={this.state.error} onChange={this.handleChange}>{this.state.error}</FormHelperText>
          </form>
        </Grid>
      </div>
    );
  }
}

SignUp_disclamer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp_disclamer);