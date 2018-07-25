import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: 30,
    marginBottom: 0
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main
  },
});
function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}><Typography variant="title" color="inherit" className={classes.flex}>
            True Relief
          </Typography></Paper>
        </Grid>
      </Grid>
  </div>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);