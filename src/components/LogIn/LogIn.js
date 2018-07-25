import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase.js";
// importing route Components
import { Link, Redirect } from "react-router-dom";

import logo from "../../images/logo.png"

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
    marginBottom: 24,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

class LogIn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    //Attempting to signIn with email and password and creating a promise to manage the error
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);

    /*If there is an error, we will capture it and change the state of error
    to inform the user something went wrong*/
    promise.catch(e =>
      this.setState({
        error: e.message
      })
    );
    //Adding an observer for changes to the user's sign-in state.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/registration" }
    };
    const { user, email, password } = this.state;

    return user ? (
      <Redirect to={from} />
    ) : (
        <div>
          <Card className={classes.card} elevation={0}>
        <CardMedia
          className={classes.media}
          image={logo}
          title="True Relief"
        />
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
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                className={classes.button}
              >
                Log In
              </Button>
            <FormHelperText
              id="error"
              name="error"
              value={this.state.error}
              onChange={this.handleChange}
            >
              {this.state.error}
                </FormHelperText>
              </CardContent>
              </form>
            <Typography className={classes.text} variant="body1">Not registered yet?</Typography>
            <CardActions>
               <Button
                color="primary"
                component={Link}
                to="/disclaimer"
              >
              Create an account
              </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);
