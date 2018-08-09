import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// importing route Components
import { Redirect } from "react-router-dom";

import logo from "../../../images/logo.png";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
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
      <div>
        {redirectToSignUp && <Redirect to={from} />}

        <Card className={classes.card} elevation={0}>
          <CardMedia
            className={classes.media}
            image={logo}
            title="True Relief"
          />
          <Typography className={classes.text} variant="subheading">
            Please read and agree with the{" "}
            <a href="/policy" target="_blank" style={aTagStyles}>
              terms and conditions{" "}
            </a>{" "}
            in order to continue.
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <FormControlLabel
                className={classes.formControl}
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
              <FormHelperText
                id="error"
                name="error"
                value={error}
                onChange={this.handleChange}
              >
                {error}
              </FormHelperText>
            </CardContent>
            <CardActions className={classes.pos}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  className={classes.button}
                >
                  Continue
                </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

Disclaimer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Disclaimer);
