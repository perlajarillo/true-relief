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
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase";
import { getPatient } from "../../firebase/operations";

// importing route Components
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
    marginBottom: 24
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

class LogIn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      user: false,
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

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .onLogIn(email, password)
      .then(() => {
        this.setState({
          email: email,
          password: password
        });
      })
      .then(() => {
        getPatient(auth.currentUserUid()).then(snapshot => {
          !snapshot.val() ? history.push("/registration") : history.push("/");
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
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
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                fullWidth
                component={Link}
                to="/password-reset"
                className={classes.button}
              >
                Forgot your password?
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
          <Typography className={classes.text} variant="body1">
            Not registered yet?
          </Typography>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
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
