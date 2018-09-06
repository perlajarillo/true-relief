import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import backgroundImg from "../../images/background.jpg";
import logo from "../../images/logo.png";
import dailyTips from "../../images/dailyTips.png";
import doctorVisit from "../../images/doctorVisit.png";
import journal from "../../images/journal.png";
import painTrack from "../../images/painTrack.png";

const styles = theme => ({
  sectionStyles: {
    textAlign: "center",
    margin: theme.spacing.unit * 3
  },
  pageTitle: {
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 20
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: "#c43e00"
    }
  },
  heroImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 10%",
    backgroundSize: "cover",
    width: "100%",
    padding: "15% 0 25% 0"
  },
  logoStyles: {
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  tourText: {
    textAlign: "center",
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing.unit * 10
    }
  },
  order: {
    [theme.breakpoints.up("sm")]: {
      order: 1
    }
  }
});

function Home(props) {
  const { classes } = props;
  return (
    <Fragment>
      <section className={classes.heroImg}>
        <figure className={classes.logoStyles}>
          <img src={logo} alt="" />
        </figure>
      </section>
      <section className={classes.sectionStyles}>
        <Grid container>
          <Grid item xs={12} sm={12} m={12} lg={12}>
            <header className={classes.pageTitle}>
              <Typography variant="display3">About True Relief App</Typography>
              <Typography variant="subheading">
                This App has a number of tools and strategies to help you best
                control your pain.
              </Typography>
            </header>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={6} xl={6}>
            <Typography variant="title" className={classes.tourText}>
              Tools to help you manage your pain
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <img src={dailyTips} alt="" width="100%" />
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <img src={painTrack} alt="" width="100%" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={6}
            xl={6}
            className={classes.order}
          >
            <Typography variant="title" className={classes.tourText}>
              Strategies to know more about your pain
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <img src={journal} alt="" width="100%" />
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <img src={doctorVisit} alt="" width="100%" />
          </Grid>
        </Grid>
      </section>
    </Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
