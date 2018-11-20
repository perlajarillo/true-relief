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
  card: {
    maxWidth: 545
  },
  media: {
    objectFit: "cover"
  },
  coverImage: {
    width: 251,
    maxHeight: 200,
    marginRight: 10,
    marginLeft: 400,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 400
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
      marginRight: 0,
      width: 71,
      maxHeight: 70
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: 0,
      marginRight: 0,
      width: 251,
      maxHeight: 300
    }
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

  getProviders = () => {
    const doctors_url =
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" +
      process.env.REACT_APP_BETTER_DOCTOR_KEY;

    this.get(doctors_url)
      .then(response => {
        this.setState({ providers: response.data });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    //this.getSpecialties();
    this.getProviders();
  }

  render() {
    const { providers } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {providers !== null &&
          providers.map(item => (
            <Card className={classes.card} key={item.uid}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="body1">
                    {item.profile.title} {item.profile.first_name}{" "}
                    {item.profile.last_name}
                  </Typography>
                  {item.specialties.map(specialty => (
                    <Typography variant="body1">{specialty.name}</Typography>
                  ))}
                  {item.practices.map(practice => (
                    <Fragment>
                      <Typography variant="body1">{practice.name}</Typography>
                      <Typography variant="body1">
                        {practice.visit_address.street}{" "}
                        {practice.visit_address.city}{" "}
                        {practice.visit_address.state}
                        {""}
                        {practice.visit_address.zip}
                      </Typography>
                    </Fragment>
                  ))}
                </CardContent>
              </div>
              <div>
                <img src={item.profile.image_url} height="100px" />
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
