import React, { Fragment } from "react";
import { Input } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  cover: {
    width: 161,
    maxHeight: 200,
    marginRight: "0"
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  card: {
    display: "flex",
    marginTop: "10px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "auto"
  },
  controls: {
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

class ProvidersService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialties: null,
      providers: null
    };
  }

  get = resource_url => {
    let hasResponse = false;
    return new Promise((resolve, reject) => {
      const httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", resource_url);

      httpRequest.onload = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          resolve(JSON.parse(httpRequest.response));
        } else {
          reject({
            status: httpRequest.status,
            statusText: httpRequest.statusText
          });
        }
      };
      httpRequest.send();

      if (hasResponse === true) {
        httpRequest.abort();
      }
    });
  };

  getSpecialties = () => {
    const specialties_url =
      "https://api.betterdoctor.com/2016-03-01/specialties?skip=0&limit=20&user_key=" +
      process.env.REACT_APP_BETTER_DOCTOR_KEY;

    this.get(specialties_url)
      .then(response => {
        this.setState({ specialties: response.data });
      })
      .catch(error => console.log(error));
  };

  getProviders = userLocation => {
    console.log(userLocation.lat + ", " + userLocation.lng + ", 100");
    const doctors_url =
      "https://api.betterdoctor.com/2016-03-01/doctors?location=" +
      userLocation.lat +
      ", " +
      userLocation.lng +
      ", 100&skip=2&limit=10&user_key=" +
      process.env.REACT_APP_BETTER_DOCTOR_KEY;

    this.get(doctors_url)
      .then(response => {
        this.setState({ providers: response.data });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getProviders(this.props.userLocation);
    }
  }

  render() {
    const { providers } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {providers !== null &&
          providers.map(item => (
            <Card className={classes.card} key={item.uid}>
              <CardMedia
                component="img"
                className={classes.cover}
                image={item.profile.image_url}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="h6">
                    {item.profile.title} {item.profile.first_name}{" "}
                    {item.profile.last_name}
                  </Typography>
                  {item.specialties.map(specialty => (
                    <Typography variant="subtitle2" key={specialty.uid}>
                      {specialty.name}
                    </Typography>
                  ))}
                  <div className={classes.controls}>
                    {item.practices.map(practice => (
                      <Fragment key={practice.uid}>
                        <Typography variant="overline" gutterBottom>
                          {" "}
                          <li>{practice.name}</li>
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          {practice.visit_address.street}{" "}
                          {practice.visit_address.city}
                          {", "}
                          {practice.visit_address.state}{" "}
                          {practice.visit_address.zip}
                        </Typography>
                      </Fragment>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
      </div>
    );
  }
}

ProvidersService.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProvidersService);
