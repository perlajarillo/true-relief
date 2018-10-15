import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import Demographic from "../Registration/Demographic";
import Habits from "../Registration/Habits";
import Preferences from "../Registration/Preferences";
import Challenges from "../Registration/Challenges";
import PainHistory from "../Registration/PainHistory";
import EditCondition from "./EditCondition";
import * as R from "ramda";
import {
  validateString,
  validateFreeInput,
  validateDemographicData,
  validateHabitsData,
  validatePainConditionData,
  validateThereIsAtLeastOneChallenge,
  validateThereIsAtLeastOneNeed,
  validateAge
} from "../Validations.js";
import { db } from "../../firebase";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import { format } from "date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
const styles = theme => ({
  wrapper: {
    margin: "80px 0",
    minHeight: "80vh"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  root: {
    padding: theme.spacing.unit,
    marginTop: "30%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "20%",
      padding: theme.spacing.unit * 3
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10%",
      padding: theme.spacing.unit * 3
    },
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  icons: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex",
    padding: theme.spacing.unit,
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 2
    }
  },
  panel: {
    padding: theme.spacing.unit
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

let PAIN_CONDITIONS_DB;
let NEW_PAIN_CONDITION = {};

const safeStringGetter = (prop, data) => R.propOr("", prop, data);
const safeNumberGetter = (prop, data) => R.propOr(0, prop, data);

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      birth: "",
      weight: "",
      height: "",
      gender: "",
      smoke: "",
      coffee: "",
      alcohol: "",
      physicalActivity: "",
      sleepHours: "",
      sleepQuality: "",
      selectedDate: new Date(),
      healthStatus: "",
      alcoholFrequency: "",
      coffeeFrequency: "",
      kindOfCoffee: "",
      cupsOfCoffee: "",
      drinksOfAlcohol: "",
      kindOfDrink: "",
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
      submitted: false,
      expanded: null,
      key: "",
      currentCondition: {},
      openSnackbarSaved: false,
      openSnackbarDeleted: false
    };
  }

  /**
   * updateDateInParentState - sets the selected date in the state
   * @param {Object} the date object
   * @return {void}
   */
  updateDateInParentState = date => {
    let birth = format(date, "d/MM/YYYY");
    validateAge(date)
      ? this.setState({
          selectedDate: date,
          birth: birth,
          errorSelectedDate: ""
        })
      : this.setState({
          errorSelectedDate: "You must be older than 16 to use this web site."
        });
  };

  reviewValidations = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formControl = "error" + name;
    this.setState({
      [formControl]: validateString(name, value)
    });
  };

  /**
   * updateParentState - sets values of all input except for Challenges and
   * Preferences
   * @param {Object} event the event object
   * @return {void}
   */
  updateParentState = event => {
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
  };

  /**
   * clearConditionalState - Helps to render conditional elements in the DOM for
   * painCondition component
   * @param {String} name the input name
   * @return {void}
   */
  clearConditionalState = name => {
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
  };

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
  getPropName = name => {
    const names = {
      medicationName: "medications",
      medicationEffectiveness: "medications",
      procedureName: "procedures",
      procedureEffectiveness: "procedures",
      nonPharmaName: "nonPharma",
      nonPharmaEffectiveness: "nonPharma"
    };
    return names[name];
  };

  /**
   * setPainConditionName - Sets the selected pain condition name and the
   * default object keys
   * @param {String} value pain condition name
   * @return {void}
   */
  setPainConditionName = value => {
    NEW_PAIN_CONDITION = {
      name: value,
      medications: [{ name: "", effectiveness: "" }],
      procedures: [{ name: "", effectiveness: "" }],
      nonPharma: [{ name: "", effectiveness: "" }]
    };
  };

  /**
   * setPainConditionProps - Sets the selected values for medications,
   * procedures and nonPharma
   * @param {String} name the object key, name or effectiveness
   * @param {String} value the medication, procedure or nonPharma option
   * @param {[String]} propPath the medication, procedure or nonPharma key in
   * the pain condition object
   * @return {void}
   */
  setPainConditionProps = (name, value, propPath) => {
    let propSubName = this.getSubName(name);
    const propLens = R.lensPath([propPath, 0]);
    const props = R.view(propLens, NEW_PAIN_CONDITION);
    const propToUpdate =
      propSubName.toLowerCase().indexOf("name") > -1
        ? { name: value }
        : { effectiveness: value };
    const dataToSet = Object.assign({}, props, propToUpdate);
    let newCondition = R.set(
      R.lensProp(propPath),
      [dataToSet],
      NEW_PAIN_CONDITION
    );
    NEW_PAIN_CONDITION = newCondition;
  };

  /**
   * getDemographicPayload - returns the data to send to validateDemographicData
   * @returns {Object} the Demographic payload
   */
  getDemographicPayload() {
    return R.pick(
      [
        "name",
        "birth",
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
  getNewConditionPayload() {
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
        thereAreErrors = validateDemographicData(
          this.demographicDataValidations()
        );
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

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleClickOpen = key => {
    this.selectCurrentCondition(key);

    this.setState({
      key: key !== this.state.key ? key : null
    });
  };

  /**
   * selectCurrentCondition maps through the current condition object to set in
   * the state the properties to be able to edit the current condition.
   * @param {Number} key the index of the current condition object in the pain
   * conditions array
   * @returns {void}
   */
  selectCurrentCondition = key => {
    let currCondition,
      currMedName,
      currMedEffect,
      currNPName,
      currNPEffect,
      currProcName,
      currProcEffect;
    currCondition = this.state.painConditions[key].name;

    this.state.painConditions[key].medications.map(medication => {
      currMedName = medication.name;
      currMedEffect = medication.effectiveness;
    });
    this.state.painConditions[key].procedures.map(procedure => {
      currProcName = procedure.name;
      currProcEffect = procedure.effectiveness;
    });
    this.state.painConditions[key].nonPharma.map(np => {
      currNPName = np.name;
      currNPEffect = np.effectiveness;
    });
    this.setState({
      currentCondition: {
        painCondition: currCondition,
        medicationName: currMedName,
        procedureName: currProcName,
        nonPharmaName: currNPName,
        medicationEffectiveness: currMedEffect,
        procedureEffectiveness: currProcEffect,
        nonPharmaEffectiveness: currNPEffect
      }
    });
  };

  /**
   * getPatientData calls the database and retrieve a snapshot of the patients data
   * which is set in the state
   * @returns {Void}
   */
  getPatientData() {
    db.getPatient(this.props.authUser.uid)
      .then(snapshot => {
        PAIN_CONDITIONS_DB = snapshot.val().painConditions;
        const data = snapshot.val();
        this.setState({
          painConditions: safeStringGetter("painConditions", data),
          name: safeStringGetter("name", data),
          selectedDate: safeStringGetter("birth", data),
          birth: safeStringGetter("birth", data),
          weight: safeStringGetter("weight", data),
          height: safeStringGetter("height", data),
          gender: safeStringGetter("gender", data),
          smoke: safeStringGetter("smoke", data),
          coffee: safeStringGetter("coffee", data),
          alcohol: safeStringGetter("alcohol", data),
          physicalActivity: safeStringGetter("physicalActivity", data),
          sleepHours: safeStringGetter("sleepHours", data),
          sleepQuality: safeStringGetter("sleepQuality", data),
          healthStatus: safeStringGetter("healthStatus", data),
          alcoholFrequency: safeStringGetter("alcoholFrequency", data),
          coffeeFrequency: safeStringGetter("coffeeFrequency", data),
          kindOfCoffee: safeStringGetter("kindOfCoffee", data),
          cupsOfCoffee: safeNumberGetter("cupsOfCoffee", data),
          drinksOfAlcohol: safeNumberGetter("drinksOfAlcohol", data),
          kindOfDrink: safeStringGetter("kindOfDrink", data),
          medicationName: safeStringGetter("medicationName", data),
          procedureName: safeStringGetter("procedureName", data),
          nonPharmaName: safeStringGetter("nonPharmaName", data),
          medication: safeStringGetter("medicationName", data),
          medicationEffectiveness: safeStringGetter(
            "medicationEffectiveness",
            data
          ),
          procedures: safeStringGetter("procedures", data),
          procedureEffectiveness: safeStringGetter(
            "procedureEffectiveness",
            data
          ),
          nonPharma: safeStringGetter("nonPharma,", data),
          nonPharmaEffectiveness: safeStringGetter(
            "nonPharmaEffectiveness",
            data
          ),
          needs: safeStringGetter("needs", data),
          challenges: safeStringGetter("challenges", data)
        });
      })
      .catch(error => {});
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.getPatientData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getPatientData();
    }
  }

  /**
   * updateCurrentCondition sets the new values for the current condition object
   * @param {Object} event object
   * @returns {void}
   *
   */
  updateCurrentCondition = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      currentCondition: {
        ...this.state.currentCondition,
        [name]: value
      }
    });

    this.updatePainConditionsObject(name, value);
  };

  /**
   * getSubName sets the properties for the medications, procedures and nonPharma arrays.
   * @param {String} name the name of the input
   * @returns {String} the name of the property in the current condition object
   */
  getSubName = name => {
    const names = {
      medicationName: "name",
      medicationEffectiveness: "effectiveness",
      procedureName: "name",
      procedureEffectiveness: "effectiveness",
      nonPharmaName: "name",
      nonPharmaEffectiveness: "effectiveness"
    };
    return names[name];
  };

  /**
   * updatePainConditionsObject updates the current condition, with the new values,
   * in the pain conditions array
   * @param {String} name the input name
   * @param {String} value the updated condition property
   * @returns {Object} the updated PAIN_CONDITIONS_DB
   */
  updatePainConditionsObject = (name, value) => {
    const currConditionId = this.state.key;

    if (name === "painCondition") {
      PAIN_CONDITIONS_DB[currConditionId] = Object.assign(
        {},
        PAIN_CONDITIONS_DB[currConditionId],
        { name: value }
      );
    } else {
      let propSubName = this.getSubName(name);
      let propName = this.getPropName(name);
      const propLens = R.lensPath([propName, 0]);
      const props = R.view(propLens, PAIN_CONDITIONS_DB[currConditionId]);
      const propToUpdate =
        propSubName.toLowerCase().indexOf("name") > -1
          ? { name: value }
          : { effectiveness: value };
      const dataToSet = Object.assign({}, props, propToUpdate);
      let updatedCondition = R.set(
        R.lensProp(propName),
        [dataToSet],
        PAIN_CONDITIONS_DB[currConditionId]
      );
      PAIN_CONDITIONS_DB[currConditionId] = updatedCondition;
    }
  };

  /**
   * updateDemographic updates the demographic values in the database
   * @returns {void}
   */
  updateDemographic = () => {
    const { authUser } = this.props;
    const { name, birth, gender, weight, height } = this.state;
    const demographicData = { name, birth, gender, weight, height };

    db.editDemographic(authUser.uid, demographicData).then(
      this.setState({ openSnackbarSaved: true })
    );
  };

  /**
   * updateHabits updates the habits values in the database
   * @returns {void}
   */
  updateHabits = () => {
    const { authUser } = this.props;
    const {
      smoke,
      physicalActivity,
      sleepHours,
      sleepQuality,
      alcohol,
      alcoholFrequency,
      drinksOfAlcohol,
      kindOfDrink,
      coffee,
      coffeeFrequency,
      cupsOfCoffee,
      kindOfCoffee,
      healthStatus
    } = this.state;

    const habitsData = {
      smoke,
      physicalActivity,
      sleepHours,
      sleepQuality,
      alcohol,
      alcoholFrequency,
      drinksOfAlcohol,
      kindOfDrink,
      coffee,
      coffeeFrequency,
      cupsOfCoffee,
      kindOfCoffee,
      healthStatus
    };

    db.editHabits(authUser.uid, habitsData).then(
      this.setState({ openSnackbarSaved: true })
    );
  };

  /**
   * updatePreferences updates the needs array in the database
   * @returns {void}
   */
  updatePreferences = () => {
    const { authUser } = this.props;
    const { needs } = this.state;

    db.editNeeds(authUser.uid, needs).then(
      this.setState({ openSnackbarSaved: true })
    );
  };

  /**
   * updateChallenges updates the challenges array in the database
   * @returns {void}
   */
  updateChallenges = () => {
    const { authUser } = this.props;
    const { challenges } = this.state;

    db.editChallenges(authUser.uid, challenges).then(
      this.setState({ openSnackbarSaved: true })
    );
  };

  /**
   * addNewCondition writes a new condition in the database
   * @returns {void}
   */
  addNewCondition = () => {
    const { authUser } = this.props;

    db.writeNewPainCondition(authUser.uid, NEW_PAIN_CONDITION).then(
      this.setState({ openSnackbarSaved: true })
    );
    this.getPatientData();
  };

  /**
   * updateCondition updates the selected condition in the database
   * @returns {void}
   */
  updateCondition = conditionID => {
    const { authUser } = this.props;
    let data = PAIN_CONDITIONS_DB[conditionID];

    db.editPainConditions(authUser.uid, data, conditionID).then(
      this.setState({ openSnackbarSaved: true })
    );
  };

  /**
   * deleteCurrentCondition deletes the selected condition in the database
   * @returns {void}
   */
  deleteCurrentCondition = conditionID => {
    const { authUser } = this.props;

    db.deletePainCondition(authUser.uid, conditionID).then(
      this.setState({ openSnackbarDeleted: true })
    );
    this.getPatientData();
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.state.openSnackbarSaved
      ? this.setState({ openSnackbarSaved: false })
      : this.setState({ openSnackbarDeleted: false });
  };
  render() {
    const { expanded, key, painConditions } = this.state;
    const { classes } = this.props;

    return (
      <main className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="headline" gutterBottom>
            Edit Profile{" "}
          </Typography>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Demographic</Typography>
              <Typography className={classes.secondaryHeading}>
                Date of birth, gender, height, weight.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Demographic
                  parentState={this.state}
                  updateParentState={this.updateParentState}
                  reviewValidations={this.reviewValidations}
                  updateDateInParentState={this.updateDateInParentState}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.updateDemographic}
                >
                  Save changes
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={this.handleChange("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Habits</Typography>
              <Typography className={classes.secondaryHeading}>
                Level of activity, alcohol and coffee drinking.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Habits
                  parentState={this.state}
                  updateParentState={this.updateParentState}
                  reviewValidations={this.reviewValidations}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.updateHabits}
                >
                  Save changes
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={this.handleChange("panel3")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Preferences</Typography>
              <Typography className={classes.secondaryHeading}>
                Personalize the information you are getting from us.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Preferences
                  parentState={this.state.needs}
                  errorSection={this.state.errorSection}
                  updateParentState={this.handleNeedsCheckboxChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.updatePreferences}
                >
                  Save changes
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel4"}
            onChange={this.handleChange("panel4")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Challenges</Typography>
              <Typography className={classes.secondaryHeading}>
                Your biggest challenges.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Challenges
                  parentState={this.state.challenges}
                  errorSection={this.state.errorSection}
                  updateParentState={this.handleChallengesCheckboxChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.updateChallenges}
                >
                  Save changes
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel5"}
            onChange={this.handleChange("panel5")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Pain Condition
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Pain conditions you have been diagnosed with.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panel}>
              <div>
                {painConditions &&
                  Object.keys(painConditions).map(condition => {
                    return (
                      <div key={condition}>
                        <Card className={classes.card}>
                          <CardActions
                            className={classes.actions}
                            disableActionSpacing
                          >
                            <div>
                              <Typography className={classes.heading}>
                                {painConditions[condition].name}
                              </Typography>
                            </div>
                            <div>
                              <IconButton
                                className={classes.icons}
                                aria-label="Delete pain condition"
                                onClick={() =>
                                  this.deleteCurrentCondition(condition)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                className={classnames(classes.expand, {
                                  [classes.expandOpen]: key === condition
                                })}
                                onClick={() => this.handleClickOpen(condition)}
                                aria-expanded={key === condition}
                                aria-label="Edit pain condition"
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </CardActions>
                          <Collapse
                            key={condition}
                            in={key === condition}
                            timeout="auto"
                            unmountOnExit
                          >
                            {key === condition && (
                              <Fragment>
                                <EditCondition
                                  parentState={this.state.currentCondition}
                                  updateParentState={
                                    this.updateCurrentCondition
                                  }
                                  handleClose={this.handleClose}
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                  onClick={() =>
                                    this.updateCondition(condition)
                                  }
                                >
                                  Save changes
                                </Button>
                              </Fragment>
                            )}
                            <CardContent />
                          </Collapse>
                        </Card>
                        <br />
                      </div>
                    );
                  })}
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<AddIcon />}>
                    <Typography className={classes.heading}>
                      Add a new Pain Condition
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      <PainHistory
                        parentState={this.state}
                        updateParentState={this.updateParentState}
                        handleCheckboxChange={this.handleCheckboxChange}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.addNewCondition()}
                      >
                        Add new pain condition
                      </Button>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.openSnackbarSaved}
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
            id="openSnackbarSaved"
            name="openSnackbarSaved"
          >
            <SnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Changes saved!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.openSnackbarDeleted}
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
            id="openSnackbarDeleted"
            name="openSnackbarDeleted"
          >
            <SnackbarContentWrapper
              variant="warning"
              className={classes.margin}
              message="Pain condition deleted!"
            />
          </Snackbar>
          <br />
        </div>
      </main>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
