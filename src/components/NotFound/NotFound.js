import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    margin: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
    width: "100vw",
    zIndex: 1900,
    position: "absolute",
    backgroundColor: "#f4f6f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    padding: "40px 60px",
    background: "#eee",
    maxWidth: "100%",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      width: "40em"
    }
  },
  media: {
    height: "64px",
    paddingTop: "25%",
    backgroundSize: "350px"
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

const NotFound = props => {
  const { classes } = props;
  return (
    <main className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          <Typography paragraph>
            This is not what you are looking for. Please check the URL for
            mistakes and try again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/"
          >
            Go back to home page
          </Button>
        </div>
      </div>
    </main>
  );
};

export default withStyles(styles)(NotFound);
