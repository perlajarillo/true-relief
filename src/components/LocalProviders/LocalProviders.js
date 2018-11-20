import React from "react";
import withAuthorization from "../WithAuthorization";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GeolocationComponent from "../GeolocationComponent/GeolocationComponent";
import Grid from "@material-ui/core/Grid";
import ProvidersService from "./ProvidersService";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  wrapper: {
    margin: "80px 0",
    minHeight: "80vh"
  },
  sectionStyles: {
    marginTop: "100%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "60%"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "0%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "0%",
      marginLeft: "10%"
    }
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 3
  },
  map: {
    minWidth: "45vh",
    minHeight: "45vh",
    [theme.breakpoints.up("sm")]: {
      minWidth: "20vh",
      minHeight: "20vh"
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "60vh",
      minHeight: "60vh"
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "40vh",
      minHeight: "40vh"
    },
    [theme.breakpoints.between("sm", "md")]: {
      minWidth: "35vh",
      minHeight: "60vh"
    },
    position: "absolute"
  },
  card: {
    maxWidth: 345
  },
  media: {
    objectFit: "cover"
  }
});

class LocalProviders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ""
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Local providers
          </Typography>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={classes.map}>
                <GeolocationComponent />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={classes.sectionStyles}>
                <Typography variant="h5" gutterBottom>
                  Providers in your area
                </Typography>
                <ProvidersService />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
const StyledLocalProviders = withStyles(styles)(LocalProviders);
const authProviders = authUser => Boolean(authUser);

export default withAuthorization(authProviders)(StyledLocalProviders);
