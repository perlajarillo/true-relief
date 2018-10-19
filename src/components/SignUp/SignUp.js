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
import { Link } from "react-router-dom";
import logo from "../../images/logo-h-blue.svg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";

const styles = theme => ({
  wrapper: {
    margin: "80px 0"
  },
  container: {
    paddingTop: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 3
    }
  },
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
    width: "300px",
    margin: "50px auto",
    paddingBottom: "1%",
    [theme.breakpoints.up("sm")]: {
      width: "350px"
    }
  },
  pos: {
    marginBottom: theme.spacing.unit * 3
  },
  media: {
    height: "64px",
    paddingTop: "25%",
    backgroundSize: "350px"
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      openSnackbarError: false
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
        error: "All fields are required",
        openSnackbarError: true
      });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: "The passwords must be equal",
        openSnackbarError: true
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
            error: error.message,
            openSnackbarError: true
          });
        });
  };

  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackbarError: false });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      error,
      openSnackbarError
    } = this.state;
    const { classes } = this.props;

    return (
      <main className={classes.wrapper}>
        <div className={classes.container}>
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarError}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarError"
          name="openSnackbarError"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message={error}
          />
        </Snackbar>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
