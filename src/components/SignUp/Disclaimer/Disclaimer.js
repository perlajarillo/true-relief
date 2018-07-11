import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
// importing route Components
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 6
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    maxWidth: 400
  },
  text: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

const aTagStyles = {
  color: "#2979ff",
  margin: 0,
  padding: 0
};

class Disclaimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chkDisclaimer: false,
      error: "",
      redirectToSignUp: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;

    this.setState({
      chkDisclaimer: !this.state.chkDisclaimer
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { chkDisclaimer } = this.state;

    chkDisclaimer
      ? this.setState({
        redirectToSignUp: true
      })
      : this.setState({
        error: "You must agree with the terms and conditions!"
      });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/sign-up" }
    };
    const { redirectToSignUp, chkDisclaimer, error } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {redirectToSignUp && <Redirect to={from} />}

        <Grid container spacing={24}>
          <Grid item xs={12} md={9} lg={6}>
            <Typography variant="display3">True Relief</Typography>

            <Typography variant="subheading">
              Please read and agree with the{" "}
              <a href="/policy" target="_blank" style={aTagStyles}>
                terms and conditions{" "}
              </a>{" "}
              in order to continue.
            </Typography>
          </Grid>
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="chkDisclaimer"
                    checked={chkDisclaimer}
                    onChange={this.handleChange}
                    required
                  />
                }
                label="I have read terms and conditions and I agree with them."
              />
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.button}
                >
                  Continue
                </Button>
              </div>
            </Grid>
            <FormHelperText
              id="error"
              name="error"
              value={error}
              onChange={this.handleChange}
            >
              {error}
            </FormHelperText>
          </form>
        </Grid>
      </div>
    );
  }
}

Disclaimer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Disclaimer);
