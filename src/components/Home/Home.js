import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import backgroundImg from "../../images/background.jpg";
import logo from "../../images/logo.png";
import dailyTips from "../../images/dailyTips.png";
import doctorVisit from "../../images/doctorVisit.png";
import journal from "../../images/journal.png";
import painTrack from "../../images/painTrack.png";
import tools from "./literals/tools";

const styles = theme => ({
  root: {
    display: "flex",
    marginTop: theme.spacing.unit * 7
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 2
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
  bgImgStyles: {
    marginTop: theme.spacing.unit * 7,
    position: "fixed",
    zIndex: "-1",
    background: "cover"
  },
  logoStyles: {
    margin: "10% 25% 23% 25%"
  },
  tourText: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 10
  }
});

function Home(props) {
  const { classes } = props;
  return (
    <Fragment>
      <img
        src={backgroundImg}
        className={classes.bgImgStyles}
        alt=""
        width="100%"
      />
      <div>
        <img src={logo} className={classes.logoStyles} alt="" />
      </div>
      <div>
        <Paper className={classes.paper} elevation={0}>
          <Grid container>
            <Grid item xs={12} s={12} m={12} lg={12}>
              <Typography variant="display3">About True Relief App</Typography>
              <Typography variant="title" style={{ marginBottom: "56px" }}>
                This App has a number of tools and strategies to help you best
                control your pain.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.root}>
            <Grid item lg={6}>
              <Typography variant="title" className={classes.tourText}>
                Tools to help you manage your pain
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <img src={dailyTips} alt="" width="100%" />
            </Grid>
            <Grid item lg={3}>
              <img src={painTrack} alt="" width="100%" />
            </Grid>
            <Grid item lg={3}>
              <img src={journal} alt="" width="100%" />
            </Grid>
            <Grid item lg={3}>
              <img src={doctorVisit} alt="" width="100%" />
            </Grid>
            <Grid item lg={6}>
              <Typography variant="title" className={classes.tourText}>
                Strategies to know more about your pain
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
/* {tools.map(tool => (
  <Tools key={tool.name} classes={classes} tool={tool} />
))} */
