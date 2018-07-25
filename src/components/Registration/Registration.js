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

class VerticalLinearStepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      gender: "",
      selectedDate: new Date(),
      weight: "",
      height: "",
      smoke: "",
      physicalActivity: "",
      sleepHours: "",
      sleepQuality: "",
      alcohol: "",
      alcoholFrequency: "",
      drinksOfAlcohol: "",
      kindOfDrink: "",
      coffee: "",
      coffeeFrequency: "",
      cupsOfCoffee: "",
      kindOfCoffee: "",
      healthStatus: "",
      trackingPain: false,
      communication: false,
      learningAboutCondition: false,
      newTreatments: false,
      learnTreatments: false,
      providers: false,
      rememberingMedications: "",
      handleStress: "",
      eatingHealthy: "",
      socialize: "",
      painCondition: "",
      medication: "",
      medicationName: "",
      medEfficacy: "",
      procedures: "",
      procedureName: "",
      procedureEfficacy: "",
      nonPharma: "",
      nonPharmaName: "",
      nonPharmaEfficacy: "",
      open: false
    };

    this.updateParentState = this.updateParentState.bind(this);
    this.updateDateInParentState = this.updateDateInParentState.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.clearConditionalState = this.clearConditionalState.bind(this);
  }

  clearConditionalState(name, value) {
    name === "medication" &&
      this.setState({
        [name]: "no",
        medicationName: "",
        medEfficacy: ""
      });
    name === "procedures" &&
      this.setState({
        [name]: "no",
        procedureName: "",
        procedureEfficacy: ""
      });
    name === "nonPharma" &&
      this.setState({
        [name]: "no",
        nonPharmaName: "",
        nonPharmaEfficacy: ""
      });
  }

  updateParentState(event) {
    const name = event.target.name;
    const value = event.target.value;
    const isAnHabit =
      name === "smoke" || name === "alcohol" || name === "coffee";

    value === "no" && !isAnHabit
      ? this.clearConditionalState(name, value)
      : this.setState({
          [name]: value
        });
  }

  updateDateInParentState(date) {
    this.setState({
      selectedDate: date
    });
  }

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

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

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Demographic
            parentState={this.state}
            updateParentState={this.updateParentState}
            updateDateInParentState={this.updateDateInParentState}
          />
        );
      case 1:
        return (
          <Habits
            parentState={this.state}
            updateParentState={this.updateParentState}
          />
        );
      case 2:
        return (
          <Preferences
            parentState={this.state}
            updateParentState={this.handleCheckboxChange}
          />
        );
      case 3:
        return (
          <Challenges
            parentState={this.state}
            updateParentState={this.handleCheckboxChange}
          />
        );
      case 4:
        return (
          <PainHistory
            parentState={this.state}
            updateParentState={this.updateParentState}
            handleCheckboxChange={this.handleCheckboxChange}
            handleClose={this.handleClose}
            handleOpen={this.handleOpen}
          />
        );
      case 5:
        return (
          <MoreConditions
            parentState={this.state}
            updateParentState={this.updateParentState}
          />
        );
    }
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.root}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
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
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);
