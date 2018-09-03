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
import logo from "../../images/logo.png";

import { auth } from "../../firebase";

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
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: null,
      successMsg: null
    }

  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { email } = this.state;
    event.preventDefault();

    auth.onResetPassWord(email)
      .then(() => {
        this.setState({
          email: email,
          successMsg: "We have sent you a link to reset your password"
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      })
  }

  render() {
    const { email, error, successMsg } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Card className={(classes.root, classes.card)} elevation={0}>
          <CardMedia
            className={classes.media}
            image={logo}
            title="True Relief"
          />
          <Typography variant="title" className={classes.text}>
            Reset your password
          </Typography>
            <Typography variant="subheading" className={classes.text}>
            Enter your email address and we will sed you a link to reset your password
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="email">Enter your email address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
              <FormHelperText
                id="error"
                name="error"
                value={error}
                onChange={this.handleChange}
              >
                {error ? error : successMsg}
              </FormHelperText>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                className={classes.button}
              >
                Send password reset email
              </Button>
            </CardContent>
          </form>
          <CardActions>
          </CardActions>
        </Card>
      </div>
    );
  }
}

PasswordForgetForm.propTypes =  {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PasswordForgetForm);
