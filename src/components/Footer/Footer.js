import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 6
  },
  paper: {
    padding: theme.spacing.unit * 6,
    backgroundColor: theme.palette.primary.main
  },
  textColor: {
    color: theme.palette.primary.contrastText,
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Typography variant="title" align="center" className={classes.textColor}>
          True Relief
        </Typography>
      </Paper>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
