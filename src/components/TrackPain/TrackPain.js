import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Slider from "@material-ui/lab/Slider";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/formatDistanceStrict";
import Canvas from "./Canvas";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 3
  },
  dpMargin: {
    marginTop: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 3
  },
  sectionMargin: {
    marginTop: theme.spacing.unit * 6
  },
  slider: {
    maxWidth: 400,
    margin: theme.spacing.unit * 3
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
    this.setEventDuration = this.setEventDuration.bind(this);
    this.setPainIntensity = this.setPainIntensity.bind(this);
  }

  /**
   * componentDidMount – sets in the state today's date and format it
   * @returns {void}
   */
  componentDidMount = () => {
    const today = format(new Date(), "dddd MMMM D[,] YYYY h[:]mm a");
    this.setState({
      today: today
    });
  }

  /**
   * handleStartDateChange – the handleStartDateChange sets a start date for a
   * pain event
   * @param {Object} the date object
   * @return {void}
   */
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  /**
   * handleEndDateChange – the handleEndDateChange sets a end date for a
   * pain event
   * @param {Object} the date object
   * @return {void}
   */
  handleEndDateChange = date => {
    this.setState({ endDate: date }, () => this.setEventDuration());
  };

  /**
   * setEventDuration – setEventDuration calculates the difference between start and end dates
   * @return {void}
   */
  setEventDuration = () => {
    const { endDate, startDate } = this.state;
    let eventDuration = distanceInWordsStrict(endDate, startDate, "h");
    this.setState({
      eventDuration:
      eventDuration === "0 seconds"
          ? "Duration: 00"
          : "Duration: " + eventDuration
    });
  };

  /**
   * setPainIntensity – Sets in the state a number from 1 to 10
   * @param {Object} event the event object
   * @param {Number} value a number between 1 and 10
   * @return {void}
   */
  setPainIntensity(event, value) {
    this.setState({
      painIntensity: value
    });
  }

  render() {
    const { classes } = this.props;
    const { today, startDate, endDate, painIntensity, eventDuration } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="headline">{today}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className={classes.sectionMargin}>
              <Typography variant="title">
                Choose a time frame for your pain
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  value={startDate}
                  onChange={this.handleStartDateChange}
                  label="Start"
                  minDate={"2000/01/01"}
                  maxDate={new Date()}
                  disableOpenOnEnter
                  disableFuture={true}
                  className={classes.dpMargin}
                />
                <DateTimePicker
                  value={endDate}
                  onChange={this.handleEndDateChange}
                  label="End"
                  minDate={"2000/01/01"}
                  maxDate={new Date()}
                  disableOpenOnEnter
                  disableFuture={true}
                  className={classes.dpMargin}
                />
              </MuiPickersUtilsProvider>
              <Typography variant="title" className={classes.sectionMargin}>
                {eventDuration}
              </Typography>
            </div>
            <div className={classes.sectionMargin}>
              <Typography variant="subheading">
                How was the pain intensity during that time frame, 0 being no
                pain at all and 10 the worst pain imaginable
              </Typography>
              <div className={classes.slider}>
                <Typography id="label">Pain Intensity: ({painIntensity})</Typography>
                <Slider
                  value={painIntensity}
                  min={0}
                  max={10}
                  step={1}
                  onChange={this.setPainIntensity}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className={classes.sectionMargin}>
              <Canvas />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TrackPain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrackPain);
