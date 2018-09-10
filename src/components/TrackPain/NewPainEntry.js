import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/lab/Slider";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/formatDistanceStrict";
import compareAsc from "date-fns/compareAsc";
import Canvas from "./Canvas";
import trackPainData from "./literals/trackPainData";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { writeNewTrackPain } from "../../firebase/operations";
import { editTrackPain } from "../../firebase/operations";
import * as R from "ramda";
import { validateTrackPainData } from "../Validations";
import { validateSelectedValue } from "../Validations";
import Paper from '@material-ui/core/Paper';

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
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

const { moodState, painDescription } = trackPainData;

class NewPainEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      eventDuration: "Duration: 00",
      painIntensity: 0,
      description: "",
      mood: "",
      datesError: "",
      sectionError: "",
      descriptionError: "",
      painIntensityError: "",
      moodError: "",
      notes: "",
      painIsIn: "",
      successMsg: "",
      btnText: "Register pain event",
      key: null
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setEventDuration = this.setEventDuration.bind(this);
    this.compareDates = this.compareDates.bind(this);
    this.setPainIntensity = this.setPainIntensity.bind(this);
    this.getFirebasePayload = this.getFirebasePayload.bind(this);
    this.reviewSelectedValue = this.reviewSelectedValue.bind(this);
    this.updateParentState = this.updateParentState.bind(this);
    this.clearParentState = this.clearParentState.bind(this);
    this.painIsInData = this.painIsInData.bind(this);
  }
  /**
    * areThereParameters – sets the state whit the parameters sent via url
    * @returns {void}
    *
    */
  areThereParameters = entries => {
      const { key } = this.props.location.state;
      this.setState({
        startDate: entries.startDate,
        endDate: entries.endDate,
        description: entries.description,
        mood: entries.mood,
        notes: entries.notes,
        eventDuration: entries.eventDuration,
        painIntensity: entries.painIntensity,
        painIsIn: entries.painIsIn,
        btnText: "Modify pain event",
        key: key
      });
    };

      /**
    * painIsInData – returns to the child te data saved in painIsIn
    * @returns {painIsIn}
    *
    */
    painIsInData(){
        return this.state.painIsIn;
    }
  /**
   * updateParentState - sets painIsIn in the state
   * @param {Object} body part and (x,y) points
   * @return {void}
   */
  updateParentState(bodyPart, x, y, front, color) {
    const xLens = R.lensProp(bodyPart);
    this.setState({
      painIsIn: R.set(xLens, { x: x, y: y, front: front, color: color }, this.state.painIsIn)
    });
  }

  /**
   * clearParentState - sets the empty string in painIsIn
   * @param {void}
   * @return {void}
   */
  clearParentState() {
    this.setState({
      painIsIn: ""
    });
  }
  /**
   * reviewSelectedValue - sets an error if the field is null
   * @returns {void}
   */
  reviewSelectedValue = name => event => {
    const formControl = name + "Error";
    const value = this.state[name];
    this.setState({
      [formControl]: validateSelectedValue(value)
    });
  };
  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(
      [
        "startDate",
        "endDate",
        "eventDuration",
        "painIntensity",
        "description",
        "mood",
        "notes",
        "multiline",
        "painIsIn"
      ],
      this.state
    );
  }

  /**
   * componentDidMount – sets in the state today's date and format it
   * @returns {void}
   */
  componentDidMount = () => {
    const today = format(new Date(), "MMMM d, YYYY h:mm a");
    this.setState({
      today: today
      });
    this.authUser = this.props.location.state.authUser;
    if (this.props.location.state.entries)
    {
        const { entries } = this.props.location.state;
        this.areThereParameters(entries);
    }

  };

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
   * handleChange – the handleChange sets the value selected in a select list
   * or a multiline text
   * @param {Object} the object name and event
   * @return {void}
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    const formControl = name + "Error";
    this.setState({
      [name]: value,
      [formControl]: ""
    });
  }

  /**
   * compareDates – sets in the state datesError. compareAsc will compare the
   * two dates and return 1 if the first date is after the second, -1 if the
   * first date is before the second or 0 if dates are equal.
   * @returns {Object} result of comparing the dates with compareAsc
   */
  compareDates() {
    const { endDate, startDate } = this.state;
    const datesComparison = compareAsc(startDate, endDate);
    datesComparison === 1
      ? this.setState({
          datesError: "First date must be before to the second.",
          eventDuration: "Duration: 00"
        })
      : this.setState({
          datesError: ""
        });
    return datesComparison;
  }

  /**
   * setEventDuration – setEventDuration calculates the difference between start and end dates
   * @return {void}
   */
  setEventDuration = () => {
    const { endDate, startDate } = this.state;
    let eventDuration = distanceInWordsStrict(endDate, startDate, "h");
    this.compareDates() !== 1 &&
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
      painIntensity: value,
      painIntensityError: validateSelectedValue(value)
    });
  }

  /**
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
    handleSubmit = authUser => {
    const thereAreErrors = validateTrackPainData(this.getFirebasePayload());
        const key = this.state.key;
    if (thereAreErrors) {
      this.setState({
        sectionError: "The fields with * are required"
      });
    } else if (this.state.painIsIn === "") {
      this.setState({
        sectionError:
          "Draw in the human body image where do/did you feel the pain"
      });
    } else {
        !key ?
        (
            //it does not exist a key, so we are going to add a new entrie
            writeNewTrackPain(authUser, this.getFirebasePayload())
        ) :(
            //it does exist a key, so we are going to edit an entrie
            editTrackPain(authUser, this.getFirebasePayload(), key)
      );
      this.setState({
        sectionError: "",
        successMsg: "Your entry was submitted"
      });
    }
  };

  render() {
    const { classes } = this.props;
      let { authUser } = this.props;
    const {
      today,
      startDate,
      endDate,
      painIntensity,
      eventDuration,
      mood,
      description,
      notes,
      sectionError,
      datesError,
      painIntensityError,
      descriptionError,
      moodError,
      successMsg,
      btnText,
      painIsIn
    } = this.state;
      let keysInPainIsIn = Object.keys(painIsIn).map(key => {
      let c ="- ";
      return c += key;
    });
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
                  onBlur={this.compareDates}
                  label="Start date"
                  minDate={"2000/01/01"}
                  maxDate={new Date()}
                  format={"d MMM YYYY h:mm a"}
                  disableFuture={true}
                  className={classes.dpMargin}
                  required
                />
                <DateTimePicker
                  value={endDate}
                  onChange={this.handleEndDateChange}
                  onBlur={this.compareDates}
                  label="End date"
                  minDate={"2000/01/01"}
                  maxDate={new Date()}
                  format={"d MMM YYYY h:mm a"}
                  disableFuture={true}
                  className={classes.dpMargin}
                  required
                />
                <FormHelperText error={true}>{datesError}</FormHelperText>
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
                <Typography id="label">
                  Pain Intensity: ({painIntensity}) *
                </Typography>
                <Slider
                  value={painIntensity}
                  min={0}
                  max={10}
                  step={1}
                  id="painIntensity"
                  name="painInsensity"
                  onChange={this.setPainIntensity}
                  onBlur={this.reviewSelectedValue("painIntensity")}
                />
                <FormHelperText error={true}>
                  {painIntensityError}
                </FormHelperText>
              </div>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <FormLabel component="legend">
                  What word describe better your pain?
                </FormLabel>
                <Select
                  value={description}
                  onChange={this.handleChange}
                  onBlur={this.reviewSelectedValue("description")}
                  name="description"
                  id="description"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" disabled>
                    Select one option
                  </MenuItem>
                  {painDescription.map(description => (
                    <MenuItem key={description.value} value={description.label}>
                      {description.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={true}>{descriptionError}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <FormLabel component="legend">How is your mood like?</FormLabel>
                <Select
                  value={mood}
                  onChange={this.handleChange}
                  onBlur={this.reviewSelectedValue("mood")}
                  name="mood"
                  id="mood"
                  displayEmpty
                  className={classes.selectEmpty}
                  required
                >
                  <MenuItem value="" disabled>
                    Select one option
                  </MenuItem>
                  {moodState.map(mood => (
                    <MenuItem key={mood.value} value={mood.label}>
                      {mood.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={true}>{moodError}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <TextField
                id="notes"
                name="notes"
                label="Include here any notes related to the pain"
                multiline
                rowsMax="4"
                value={notes}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleSubmit(this.authUser)}
                className={classes.button}
              >
                {btnText}
              </Button>
              <FormHelperText error={true}>
                {sectionError ? sectionError : successMsg}
              </FormHelperText>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className={classes.sectionMargin}>
              <Canvas
                updateParentState={this.updateParentState}
                clearParentState={this.clearParentState}
                painIsInData={this.painIsInData}
              />
                <Paper elevation={1}>
                <Typography variant="body2" component="h3">
                Parts of your body affected.
                </Typography>
                <Typography component="p">
               {keysInPainIsIn}
                </Typography>
            </Paper>
         </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewPainEntry.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewPainEntry);
