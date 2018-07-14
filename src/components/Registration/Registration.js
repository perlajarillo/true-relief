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
import {writeNewPatient} from "../FirebaseOperations.js";
import * as R from "ramda";
const styles = theme => ({
  root: {
    width: "90%"
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
      name: "",
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
      /*Needs y challenges ya se generan en la forma que necesitamos, por ejemplo:
      needs: {
        0:{
          newTreatments: true
        }
        1:
        {
          copingStrategies: true
        } 
      }
      Hará falta eliminar de la lista si el usuario dio clic para deseleccionarlo
      */
      needs: {},
      challenges: {},
      /* painConditions requiere más trabajo, por ahora solo agrega los painCondition 
      pero aún necesitamos agregar para cada painCondition medicamentos, procedimientos y noPharma
      */
      painConditions: {},
      medicationName: "",
      procedureName: "",
      nonPharmaName: "",
      medication: "",
      medEfficacy: "",
      procedures: "",
      procedureEfficacy: "",
      nonPharma: "",
      nonPharmaEfficacy: "",
      painCondition:"",
      open: false
    };

    this.updateParentState = this.updateParentState.bind(this);
    this.updateDateInParentState = this.updateDateInParentState.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleNeedsCheckboxChange =this.handleNeedsCheckboxChange.bind(this);
    this.handleChallengesCheckboxChange =this.handleChallengesCheckboxChange.bind(this);
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
    /* Razón para usar newList:
    si el usuario selecciona un valor y se da cuenta que se equivoco, por lo que selecciona otro...
    no queremos guardar el que habia seleccionado. Debemos eliminar el último agregado, 
    que está en PainCondition.
    Solo debemos recordar limpiar este valor cada vez que un pain condition es agregado, antes de
    agregar el siguiente (solo en caso de que queramos agregar un nuevo painCondition en el futuro)*/
        
    const newList = R.reject(R.equals(this.state.painCondition), this.state.painConditions);
    
    const lastPainConditionInserted = R.last(this.state.painConditions);
    const painConditionColection=this.state.painConditions;
    const name = event.target.name;
    const value = event.target.value;
    const isAnHabit =
      name === "smoke" || name === "alcohol" || name === "coffee";

    value === "no" && !isAnHabit
      ? this.clearConditionalState(name, value)
      : this.setState({
        [name]: value
     });
    
     /*Si el nombre del objeto es painCondition vamos a agregarlo a la colección PainConditions
     en lugar de la clave conditions se va a agregar una clave numérica, ya que el paciente
     puede tener más de un pain Condition 
     Retomando tu ejemplo:
     const conditions = {
      0: {
      name: 'headache',
      medications: [{name: 'ibuprofeno', effectiveness: 'OK'}, {name: 'peniciline', effectiveness: 'Nada'}],
      procedures: [{name: 'injections', effectiveness: 'no ON'}],
      nonParma: [{name: 'pet therapy', effectiveness: 'super'}], 
  }
}
     */
    name === "painCondition" &&
      this.setState(
        {
        painConditions: R.union(newList, [{"name": value}])
      });

    /*Hasta aquí me quedé, no he logrado que el medicamento quede dentro de la ultima 
    pain condition insertada, queda como un "hermanito", ya no intenté nada más aquí por que
    estaba tratando en el SandBox de Ramda, traté insert, append, merge, mergeDeepWith...*/
    name== "medicationName" &&
    this.setState(
      {
        painConditions: R.union(painConditionColection, [{"medication": value}])
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


  handleChallengesCheckboxChange = name => event => {
    let selectedChallenge={[name]: event.target.checked};
    this.setState(
      {challenges: R.union(this.state.challenges, [selectedChallenge])}
    )
  };

  handleNeedsCheckboxChange = name => event => {
    let selectedNeed={[name]: event.target.checked};
    this.setState(
      {needs: R.union(this.state.needs, [selectedNeed])}
    )
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
            parentState={this.state.needs}
            updateParentState={this.handleNeedsCheckboxChange}
          />
        );
      case 3:
        return (
          <Challenges
            parentState={this.state.challenges}
            updateParentState={this.handleChallengesCheckboxChange}
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
    /*En esta primera fase estoy enviando a la función writeNewPatient todo lo que contiene el estado*/
    if (this.state.activeStep === this.getSteps().length-1){
      writeNewPatient(this.state);
    }
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
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
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
