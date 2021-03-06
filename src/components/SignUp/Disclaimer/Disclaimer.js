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
import { Redirect } from "react-router-dom";
import logo from "../../../images/logo-h-blue.svg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../SnackbarContentComponent/SnackbarContentComponent";

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
    margin: theme.spacing.unitSVGAnimatedBoolean
  },
  button: {
    marginTop: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
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
    marginBottom: 24
  },
  media: {
    height: "64px",
    paddingTop: "25%",
    backgroundSize: "350px"
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
      redirectToSignUp: false,
      openSnackbarError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
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
          error: "You must agree with the terms and conditions!",
          openSnackbarError: true
        });
  }

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
    const { from } = this.props.location.state || {
      from: { pathname: "/sign-up" }
    };
    const {
      redirectToSignUp,
      chkDisclaimer,
      error,
      openSnackbarError
    } = this.state;
    const { classes } = this.props;

    return (
      <main className={classes.wrapper}>
        <div className={classes.container}>
          {redirectToSignUp && <Redirect to={from} />}

          <Card className={classes.card} elevation={0}>
            <CardMedia
              className={classes.media}
              image={logo}
              title="True Relief"
            />
            <Typography className={classes.text} variant="subtitle1">
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
                    />
                  }
                  label="I have read terms and conditions and I agree with them."
                />
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

Disclaimer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Disclaimer);
