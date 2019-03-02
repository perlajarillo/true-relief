import React from "react";
import withAuthorization from "../WithAuthorization";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GeolocationComponent from "../GeolocationComponent/GeolocationComponent";
import Grid from "@material-ui/core/Grid";
import ProvidersService from "./ProvidersService";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

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
  query: {
    marginTop: "5%",
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: 5
    }
  },
  button: { marginTop: "3%", marginLeft: "3%" },

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
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  rootPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: 270
    }
  }
});

class LocalProviders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      selectedPlace: {
        position: {
          lat: -34.397,
          lng: 150.644
        },
        name: "Current location"
      },
      activeMarker: {},
      query: ""
    };
  }
  /**
   * updateParentStateLocation - sets user location in state
   * @param {Object} event the event object
   * @return {void}
   */
  updateParentStateLocation = (pos, name) => {
    this.setState({
      selectedPlace: { position: pos, name: name }
    });
  };

  /**
   * updateQuery sets the user's query.
   * @param {void}
   * @returns {void}
   */
  updateQuery = event => {
    const value = event.target.value;
    this.setState({
      query: value
    });
  };
  render() {
    const { classes } = this.props;
    const { query } = this.state;
    return (
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Local providers
          </Typography>

          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div className={classes.map}>
                <GeolocationComponent
                  parentState={this.state}
                  updateParentStateLocation={this.updateParentStateLocation}
                />
                }{" "}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <div className={classes.sectionStyles}>
                <Typography variant="h5" gutterBottom>
                  Providers in your area
                </Typography>
                <div className={classes.query}>
                  <Typography variant="subtitle2" gutterBottom>
                    Write a keyword to locate a proper provider for you
                  </Typography>
                  <Paper className={classes.rootPaper} elevation={1}>
                    <InputBase
                      id="query"
                      className={classes.input}
                      placeholder="e.g. Back pain"
                      value={query}
                      onChange={this.updateQuery}
                    />
                    <IconButton
                      className={classes.iconButton}
                      aria-label="Search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
                <ProvidersService
                  userLocation={this.state.selectedPlace.position}
                />
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
