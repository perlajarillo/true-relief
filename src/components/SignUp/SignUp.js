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
      firstName: '',
      middleName: '',
      lastName: '',
      password1: '',
      password2: ''
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

  handleSubmit() {
    /* TODO */
  }

  render() {
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
          <Grid item xs={12} md={3} lg={3}>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="middleName">Middle Name</InputLabel>
              <Input id="middleName" name="middleName" value={this.state.middleName} onChange={this.handleChange} />
            </FormControl>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" name="password1" value={this.state.password1} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <FormControl className={(classes.formControl, classes.textField)} aria-describedby="required" aria-required="true">
              <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
              <Input id="passwordConfirm" name="password2" value={this.state.password2} onChange={this.handleChange} />
              <FormHelperText id="required">Required*</FormHelperText>
            </FormControl>
            <Button variant="contained" type="submit" color="primary" className={classes.button}>
              Create an Account
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);