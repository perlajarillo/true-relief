import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import firebase from "../firebase.js";
// import route Components
import { Link, Redirect } from "react-router-dom";

import logo from "../../images/logo.png";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2
  },
  text: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  card: {
    width: "350px",
    margin: "50px auto",
    backgroundColor: "#fafafa"
  },
  pos: {
    marginBottom: 24
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;

    //password and password confirmation must be equal
    if (password === confirmPassword) {
      //Trying to create a new account with the information provided by the user
      const promise = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //If there are any errors during creating the account we inform the user about it
      promise.catch(e =>
        this.setState({
          password: "",
          confirmPassword: "",
          error: e.message
        })
      );
      //If no errors where founded the user will be redirected to the registration module
      promise.then(user => {
        this.setState({
          user: user
        });
      });
    } else {
      this.setState({
        password: "",
        confirmPassword: "",
        error: "The passwords must be equal."
      });
    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/registration" }
    };
    const { user, email, password, confirmPassword, error } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {user && <Redirect to={from} />}

        <Card className={classes.card} elevation={0}>
          <CardMedia
            className={classes.media}
            image={logo}
            title="True Relief"
          />
          <Typography variant="body1" className={classes.text}>
            The information you provide in this web site is for educational
            purposes only and it is not intended to prevent diagnose of treat
            any medical conditions.
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Your information will be kept private.
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="Password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                className={classes.button}
              >
                Create an Account
              </Button>
              <FormHelperText
                id="error"
                name="error"
                value={error}
                onChange={this.handleChange}
              >
                {error}
              </FormHelperText>
            </CardContent>
          </form>
          <Typography className={classes.text} variant="body1">
            Are You already registered?
          </Typography>
          <CardActions>
            <Button color="primary" component={Link} to="/log-in">
              Log In
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
