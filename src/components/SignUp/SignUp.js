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
import { auth } from "../../firebase";
// import route Components
import { Link } from "react-router-dom";

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
    marginBottom: theme.spacing.unit * 3
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
  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  isValid = () => {
    const { email, password, confirmPassword } = this.state;
    if (email === "" || password === "" || confirmPassword === "") {
      this.setState({
        error: "All fields are required"
      });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: "The passwords must be equal"
      });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;

    this.isValid() &&
      auth
        .onCreateAccount(email, password)
        .then(authUser => {
          this.setState({
            email: email,
            password: password
          });
          history.push("/registration");
        })
        .catch(error => {
          this.setState({
            error: error.message
          })
        });
  };

  render() {
    const { email, password, confirmPassword, error } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Card className={(classes.root, classes.card)} elevation={0}>
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
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              component={Link}
              to="/log-in"
            >
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
