import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import backgroundImg from "../../images/trueRelief-image.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  sectionStyles: {
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      padding: "0 112px 0 112px"
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 140px 0 140px"
    },
    height: "100vh"
  },
  pageTitle: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 20
  },
  heroImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 10%",
    backgroundSize: "cover",
    padding: "18% 0",
    marginTop: "60px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "15px"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "5px"
    }
  },
  tourText: {
    textAlign: "center",
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing.unit * 10
    }
  },
  typography: {
    useNextVariants: true
  },
  button: {
    margin: theme.spacing.unit
  }
});

const Home = props => {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.heroImg} />
      <Grid container>
        <section className={classes.sectionStyles}>
          <Grid item xs={12} sm={12} m={12} lg={8}>
            <header className={classes.pageTitle}>
              <Typography variant="display1" gutterBottom>
              True Relief provides you with tools and strategies to track your
                pain, to better manage your condition.
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/log-in"
              >
                Log In
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/disclaimer"
              >
                Sign Up
              </Button>
            </header>
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="title" className={classes.tourText}>
              Tools to help you manage your pain
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="title" className={classes.tourText}>
              Strategies to know more about your pain
            </Typography>
          </Grid>
        </section>
      </Grid>
    </Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
