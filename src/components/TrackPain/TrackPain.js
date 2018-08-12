import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import Icon from "@material-ui/core/Icon";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/formatDistanceStrict";
import Canvas from "./Canvas";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 7
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 250,
    marginTop: theme.spacing.unit * 7
  }
});

class TrackPain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      eventDuration: "Duration: 00",
      painIntensity: 0
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.setPainIntensity = this.setPainIntensity.bind(this);
  }
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  setPainIntensity(event) {
    this.setState({
      painIntensity: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { startDate, endDate, painIntensity } = this.state;
    const today = format(new Date(), "dddd MMMM D[,] YYYY h[:]mm a");
    let eventDuration = distanceInWordsStrict(endDate, startDate, "h");
    let duration =
      eventDuration === "0 seconds"
        ? "Duration: 00"
        : "Duration: " + eventDuration;

    return (
      <div className={classes.root}>
       <Typography variant="title">{today}</Typography>
        <Grid container>
          <Grid item lg={4}>
        <Typography variant="body1">
          Choose a time frame for your pain
        </Typography>
          </Grid>
          <Grid item lg={8}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            value={startDate}
            onChange={this.handleStartDateChange}
            label="Start"
            minDate={"2000/01/01"}
            maxDate={new Date()}
            disableOpenOnEnter
            disableFuture={true}
          />
          <DateTimePicker
            value={endDate}
            onChange={this.handleEndDateChange}
            label="End"
            minDate={"2000/01/01"}
            maxDate={new Date()}
            disableOpenOnEnter
            disableFuture={true}
          />
            </MuiPickersUtilsProvider>
        <Typography variant="subheading">{duration}</Typography>
          </Grid>
          <Grid item lg={4}>
          <Typography variant="subheading">
            How was the pain intensity during that time frame, being 0 not pain
            at all and 10 the worst pain imaginable
          </Typography>
          </Grid>
          <Grid item lg={8}>
            <fieldset className={classes.container}>
          <FormHelperText>Pain Intensity</FormHelperText>
          <input
            type="range"
            name="pain intensity"
            value={painIntensity}
            min="0"
            max="10"
            onChange={this.setPainIntensity}
          />
            <Typography variant="body1" style={{justifyContent: "flex-start"}}>No Pain</Typography>
            <Typography variant="body1" style={{justifyContent: "flex-end"}}>Worst Pain</Typography>
            </fieldset>
            </Grid>
          </Grid>
            <Canvas />
      </div>
    );
  }
}

TrackPain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrackPain);
