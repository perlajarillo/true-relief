import React, { Component } from "react";
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
  },
  root: {
    marginLeft: "-30px"
  }
});

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      error: null,
      successMsg: null
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
    const { password } = this.state;
    event.preventDefault();

    auth
      .onUpdatePassword(password)
      .then(() => {
        this.setState({
          password: password,
          successMsg: "Your Password has been change successfully"
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  render() {
    const { password, confirmPassword, error, successMsg } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.root} elevation={0}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="password">New Password</InputLabel>
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
                  Confirm New Password
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
                Change Password
              </Button>
            </CardContent>
          </form>
          <CardActions />
        </Card>
      </div>
    );
  }
}

PasswordChange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PasswordChange);
