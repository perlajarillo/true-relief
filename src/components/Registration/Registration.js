import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Demographic from "./Demographic";
import Habits from "./Habits";
import Preferences from "./Preferences";
import Challenges from "./Challenges";
import PainHistory from "./PainHistory";
import MoreConditions from "./MoreConditions";
import { writeNewPatient } from "../../firebase/operations";
import * as R from "ramda";
import { validateString } from "../Validations.js";
import { validateFreeInput } from "../Validations.js";
import { validateDemographicData } from "../Validations.js";
import { validateHabitsData } from "../Validations.js";
import { validatePainConditionData } from "../Validations.js";
import { validateThereIsAtLeastOneChallenge } from "../Validations.js";
import { validateThereIsAtLeastOneNeed } from "../Validations.js";
import { validateAge } from "../Validations.js";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "60%",
    margin: "0 auto",
    marginTop: "20px",
    backgroundColor: "#fafafa"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

const HABITS = ["smoke", "alcohol", "coffee"];
const PAIN_CONDITIONS = [
  "medicationName",
  "medicationEffectiveness",
  "procedureName",
  "procedureEffectiveness",
  "nonPharmaName",
  "nonPharmaEffectiveness"
];

class VerticalLinearStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      needs: [],
      challenges: [],
      painConditions: [],
      medicationName: "",
      procedureName: "",
      nonPharmaName: "",
      medication: "",
      medicationEffectiveness: "",
      procedures: "",
      procedureEffectiveness: "",
      nonPharma: "",
      nonPharmaEffectiveness: "",
      painCondition: "",
      errorheight: "",
      errorweight: "",
      errorgender: "",
      errorname: "",
      errorSelectedDate: "",
      errorSection: "",
      errorcupsOfCoffee: "",
      errordrinksOfAlcohol: "",
      open: false,
      submitted: false
    };

    this.updateParentState = this.updateParentState.bind(this);
    this.updateDateInParentState = this.updateDateInParentState.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleNeedsCheckboxChange = this.handleNeedsCheckboxChange.bind(this);
    this.handleChallengesCheckboxChange = this.handleChallengesCheckboxChange.bind(
      this
    );
    this.toggleStepContent = this.toggleStepContent.bind(this);
    this.clearConditionalState = this.clearConditionalState.bind(this);
    this.setPainConditionName = this.setPainConditionName.bind(this);
    this.setPainConditionProps = this.setPainConditionProps.bind(this);
    this.getPropName = this.getPropName.bind(this);
    this.getFirebasePayload = this.getFirebasePayload.bind(this);
    this.setCheckBoxesState = this.setCheckBoxesState.bind(this);
    this.reviewValidations = this.reviewValidations.bind(this);
  }
  /**
   * updateDateInParentState - sets the selected date in the state
   * @param {Object} the date object
   * @return {void}
   */
  updateDateInParentState(date) {
    validateAge(date)
      ? this.setState({
          selectedDate: date,
          errorSelectedDate: ""
        })
      : this.setState({
          errorSelectedDate: "You must be older than 16 to use this web site."
        });
  }

  reviewValidations(event) {
    const name = event.target.name;
    const value = event.target.value;
    const formControl = "error" + name;
    this.setState({
      [formControl]: validateString(name, value)
    });
  }

  /**
   * updateParentState - sets values of all input except for Challenges and
   * Preferences
   * @param {Object} event the event object
   * @return {void}
   */
  updateParentState(event) {
    const name = event.target.name;
    const value = event.target.value;
    const isAnHabit = HABITS.includes(name);
    const isPainConditionValue = PAIN_CONDITIONS.includes(name);
    const FREE_INPUTS = [
      "weight",
      "height",
      "name",
      "drinksOfAlcohol",
      "cupsOfCoffee"
    ];
    const isFreeInput = FREE_INPUTS.includes(name);

    value === "no" && !isAnHabit
      ? this.clearConditionalState(name, value)
      : this.setState({
          [name]: value
        });

    name === "painCondition" && this.setPainConditionName(value);

    isPainConditionValue &&
      this.setPainConditionProps(name, value, this.getPropName(name));

    isFreeInput && validateFreeInput(name, value) !== ""
      ? this.setState({
          ["error" + name]: validateFreeInput(name, value)
        })
      : this.setState({
          [name]: value,
          ["error" + name]: ""
        });
  }

  /**
   * clearConditionalState - Helps to render conditional elements in the DOM for
   * painCondition component
   * @param {String} name the input name
   * @return {void}
   */
  clearConditionalState(name) {
    name === "medication" &&
      this.setState({
        [name]: "no",
        medicationName: "",
        medEffectiveness: ""
      });
    name === "procedures" &&
      this.setState({
        [name]: "no",
        procedureName: "",
        procedureEffectiveness: ""
      });
    name === "nonPharma" &&
      this.setState({
        [name]: "no",
        nonPharmaName: "",
        nonPharmaEffectiveness: ""
      });
  }

  /**
   * handleCheckboxChange - generic function to set checkbox value
   * @param {String} name the input name
   * @param {Object} event the event object
   * @return {void}
   */
  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  /**
   * setCheckBoxesState - General method to set Preferences and Challenges
   * checkboxes in the component state
   * @param {Object} selectedItem the selected checkbox
   * @param {String} name the checkbox value
   * @param {String} stateKey the target key in the state
   * @return {void}
   */
  setCheckBoxesState = (selectedItem, name, stateKey) => {
    this.setState(function(prevState, props) {
      const list = prevState[stateKey];
      const selectedItemIndex = list.findIndex(item => {
        return Object.keys(item).includes(name);
      });
      const overwriteItem = () => {
        return [
          ...list.slice(0, selectedItemIndex),
          ...list.slice(selectedItemIndex + 1)
        ];
      };
      const addSelectedItem = () => list.concat(selectedItem);
      const stateToSet =
        selectedItemIndex > -1 ? overwriteItem() : addSelectedItem();
      const removeFalseValues = item => Object.values(item).includes(true);
      const newState = stateToSet.filter(removeFalseValues);

      return {
        ...prevState,
        [stateKey]: newState
      };
    });
  };

  /**
   * handleChallengesCheckboxChange - sets values for the checkboxes in the
   * Challenges component
   * @param {String} name the input name
   * @param {Object} event the event object
   * @return {void}
   */
  handleChallengesCheckboxChange = name => event => {
    const selectedChallenge = { [name]: event.target.checked };

    this.setCheckBoxesState(selectedChallenge, name, "challenges");
  };

  /**
   * handleNeedsCheckboxChange - sets values for the checkboxes in the
   * Preferences component
   * @param {String} name the input name
   * @param {Object} event the event object
   * @return {void}
   */
  handleNeedsCheckboxChange = name => event => {
    const selectedNeed = { [name]: event.target.checked };

    this.setCheckBoxesState(selectedNeed, name, "needs");
  };

  /**
   * getPropName - Grabbing dynamically the prop name
   * @param {String} name the input name
   * @return {String} the prop name
   */
  getPropName(name) {
    const names = {
      medicationName: "medications",
      medicationEffectiveness: "medications",
      procedureName: "procedures",
      procedureEffectiveness: "procedures",
      nonPharmaName: "nonPharma",
      nonPharmaEffectiveness: "nonPharma"
    };
    return names[name];
  }

  /**
   * setPainConditionName - Sets the selected pain condition name and the
   * default object keys
   * @param {String} value pain condition name
   * @return {void}
   */
  setPainConditionName(value) {
    const { painConditions } = this.state;
    const updatedPainConditions = painConditions.concat({
      name: value,
      medications: [{ name: "", effectiveness: "" }],
      procedures: [{ name: "", effectiveness: "" }],
      nonPharma: [{ name: "", effectiveness: "" }]
    });

    this.setState({
      painConditions: updatedPainConditions.slice(-1)
    });
  }

  /**
   * setPainConditionProps - Sets the selected values for medications,
   * procedures and nonPharma
   * @param {String} name the object key, name or effectiveness
   * @param {String} value the medication, procedure or nonPharma option
   * @param {[String]} propPath the medication, procedure or nonPharma key in
   * the pain condition object
   * @return {void}
   */
  setPainConditionProps(name, value, propPath) {
    const { painConditions } = this.state;
    const propLens = R.lensPath([painConditions.length - 1, propPath]);
    const props = R.view(propLens, painConditions);
    const prop = props[props.length - 1];
    const propToUpdate =
      name.toLowerCase().indexOf("name") > -1
        ? { name: value }
        : { effectiveness: value };
    const dataToSet = Object.assign({}, prop, propToUpdate);

    this.setState({
      painConditions: R.set(propLens, [dataToSet], painConditions)
    });
  }

  /**
   * toggleStepContent - opens and closes step contents
   */
  toggleStepContent = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  /**
   * getSteps - returns the step names for the stepper component
   * @returns {[String]} step names
   */
  getSteps() {
    return [
      "Demographic",
      "Habits",
      "Preferences",
      "Challenges",
      "Pain History",
      "Another condition"
    ];
  }

  /**
   * getStepContent - return correspondent step component
   * @param {Number} step step index
   * @returns {Function} the react component
   */
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Demographic
            parentState={this.state}
            updateParentState={this.updateParentState}
            reviewValidations={this.reviewValidations}
            updateDateInParentState={this.updateDateInParentState}
          />
        );
      case 1:
        return (
          <Habits
            parentState={this.state}
            updateParentState={this.updateParentState}
            reviewValidations={this.reviewValidations}
          />
        );
      case 2:
        return (
          <Preferences
            parentState={this.state.needs}
            parentGeneralState={this.state}
            updateParentState={this.handleNeedsCheckboxChange}
          />
        );
      case 3:
        return (
          <Challenges
            parentState={this.state.challenges}
            parentGeneralState={this.state}
            updateParentState={this.handleChallengesCheckboxChange}
          />
        );
      case 4:
        return (
          <PainHistory
            parentState={this.state}
            updateParentState={this.updateParentState}
            handleCheckboxChange={this.handleCheckboxChange}
            handleClose={this.toggleStepContent}
            handleOpen={this.toggleStepContent}
          />
        );
      case 5:
        return (
          <MoreConditions
            parentState={this.state}
            updateParentState={this.updateParentState}
          />
        );
      default:
        return "Unknown step";
    }
  }

  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    const nameTrimmed = this.state.name.trim();
    this.setState({ name: nameTrimmed });
    return R.pick(
      [
        "name",
        "gender",
        "selectedDate",
        "weight",
        "height",
        "smoke",
        "physicalActivity",
        "sleepHours",
        "sleepQuality",
        "alcohol",
        "alcoholFrequency",
        "drinksOfAlcohol",
        "kindOfDrink",
        "coffee",
        "coffeeFrequency",
        "cupsOfCoffee",
        "kindOfCoffee",
        "healthStatus",
        "needs",
        "challenges",
        "painConditions"
      ],
      this.state
    );
  }
  /**
   * getDemographicPayload - returns the data to send to validateDemographicData
   * @returns {Object} the Demographic payload
   */
  getDemographicPayload() {
    return R.pick(
      [
        "name",
        "gender",
        "weight",
        "height",
        "errorweight",
        "errorheight",
        "errorname",
        "selectedDate"
      ],
      this.state
    );
  }

  /**
   * getHabitsPayload - returns the data to send to validateHabitsData
   * @returns {Object} the Habits payload
   */
  getHabitsPayload() {
    return R.pick(
      [
        "smoke",
        "physicalActivity",
        "sleepHours",
        "sleepQuality",
        "alcohol",
        "alcoholFrequency",
        "drinksOfAlcohol",
        "kindOfDrink",
        "coffee",
        "coffeeFrequency",
        "cupsOfCoffee",
        "kindOfCoffee",
        "healthStatus",
        "errorcupsOfCoffee",
        "errordrinksOfAlcohol"
      ],
      this.state
    );
  }
  /**
   * getPainConditionPayload - returns the data to send to validatePainConditionData
   * @returns {Object} the Firebase payload
   */
  getPainConditionPayload() {
    return R.pick(
      [
        "medication",
        "medicationName",
        "medicationEffectiveness",
        "procedures",
        "procedureName",
        "procedureEffectiveness",
        "nonPharma",
        "nonPharmaName",
        "nonPharmaEffectiveness"
      ],
      this.state
    );
  }

  checkForErrors(step) {
    let thereAreErrors;
    let msg = "Some fields are required";
    switch (step) {
      case 0:
        thereAreErrors = validateDemographicData(this.getDemographicPayload());
        break;
      case 1:
        thereAreErrors = validateHabitsData(this.getHabitsPayload());
        break;
      case 2:
        const keysInNeeds = R.keys(this.state.needs);
        thereAreErrors = validateThereIsAtLeastOneNeed(R.length(keysInNeeds));
        msg = "Please select at least one preference";
        break;
      case 3:
        const keysInChallenges = R.keys(this.state.challenges);
        thereAreErrors = validateThereIsAtLeastOneChallenge(
          R.length(keysInChallenges)
        );
        msg = "Please select at least one challenge";
        break;
      case 4:
        const keysInPainConditions = R.keys(this.state.painConditions);
        const errorsAndMsg = validatePainConditionData(
          R.length(keysInPainConditions),
          this.getPainConditionPayload()
        );
        thereAreErrors = errorsAndMsg[0];
        msg = errorsAndMsg[1];
        break;
      default:
        return "Unknown step";
    }
    let errorsAndMsg = [thereAreErrors, msg];
    return errorsAndMsg;
  }
  /**
   * handleNext - sets active step in the state and sends Firebase payload on
   * last step
   * @returns {void}
   */
  handleNext = authUser => {
    if (this.state.activeStep === this.getSteps().length - 1) {
      //We need to review if there are changes in the session status
      writeNewPatient(authUser.uid, this.getFirebasePayload());
      this.setState({
        submitted: true
      });
    }
    let errorsAndMsg = this.checkForErrors(this.state.activeStep);
    !errorsAndMsg[0]
      ? this.setState({
          activeStep: this.state.activeStep + 1,
          errorSection: ""
        })
      : this.setState({
          errorSection: errorsAndMsg[1]
        });
  };

  /**
   * handleBack - sets active step in the state when going back
   * @returns {void}
   */
  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  /**
   * handleReset - resets active step to first step
   * @returns {void}
   */
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    this.unregisterAuthObserver =
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
      else
      {
        this.setState({ user: null });
      }
    });
  }

   /* In order to avoid a memory leak we need to un-register Firebase observers when the component unmounts */
  componentWillUnmount()
  {
    this.unregisterAuthObserver();
  }


  render() {
    const { classes, authUser } = this.props;
    const steps = this.getSteps();
    const { activeStep,submitted } = this.state;
    return !submitted ? (
      <div>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.root}
            >
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index)}
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                        </Button>
                          {<Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleNext(authUser)}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                          </Button>}
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
    : (<Redirect to="/trackPain"/>);
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);
