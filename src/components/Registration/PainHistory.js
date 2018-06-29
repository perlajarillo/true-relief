import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const painConditionData = [
  { value: "postSurgicalPain", label: "Post - surgical pain" },
  { value: "kidneyStones", label: "Kidney stones" },
  { value: "chronicalLowerBackPain", label: "Chronical lower-back pain" },
  { value: "peripheralNeuropathy", label: "Peripheral neuropathy" },
  { value: "cancerPain", label: "Cancer pain" },
  { value: "posherpeticNeuralgia", label: "Posherpetic Neuralgia" },
  { value: "trigeminalNeuralgia", label: "Trigeminal Neuralgia" },
  { value: "interstitialCystitis", label: "Interstitial Cystitis" },
  {
    value: "complexRegionalPainSyndrome",
    label: "Complex Regional Pain Syndrome"
  },
  { value: "clusterHeadaches", label: "Cluster headaches" },
  { value: "abdominalPain", label: "Abdominal pain" },
  { value: "neckPain", label: "Neck pain" },
  { value: "chestPain", label: "Chest pain" }
];

const medicationData = [
  { value: "medication1", label: "medication 1" },
  { value: "medication2", label: "medication 2" },
  { value: "medication3", label: "medication 3" },
  { value: "medication4", label: "medication 4" },
  { value: "medication5", label: "medication 5" },
  { value: "medication6", label: "medication 6" }
];

const efficacyLevel = ["Effective", "Worked OK", "Did not worked"];

const proceduresData = ["surgery", "injections"];

const nonPharmaData = [
  { value: "massage", label: "Massage" },
  { value: "relaxationTechniques", label: "Relaxation techniques" },
  { value: "acupunture", label: "Acupunture" },
  { value: "physicalTherapy", label: "Physical therapy" },
  { value: "petTherapy", label: "Pet therapy" },
  { value: "gelPacks", label: "Gel packs" },
  { value: "meditation", label: "Meditation" },
  { value: "magnets", label: "Magnets" },
  { value: "chiropracticServices", label: "Chiropractic services" },
  { value: "homeopathy", label: "Homeopathy" },
  { value: "reiki", label: "Reiki" },
  { value: "musicTherapy", label: "Music therapy" },
  { value: "prayer", label: "Prayer" },
  { value: "acupressure", label: "Acupressure" },
  { value: "deepBreathing", label: "Deep breathing" },
  { value: "distraction", label: "Distraction" },
  { value: "guidedImagery", label: "Guided imagery" },
  { value: "hypnosisAndSelfHypnosis", label: "Hypnosis and self hypnosis" },
  {
    value: "herbsAndDietarySupplements",
    label: "Herbs and dietary supplements"
  }
];

const PainHistory = props => {
  const { classes, parentState, updateParentState } = props;
  return (
    <Fragment>
      <Typography variant="subheading">
        Now are going to ask questions about your pain as well as what makes it
        better or worse and how you currently treated so we can come up with the
        best ideas for additional pain
      </Typography>
      {/********** PAIN CONDITION ***************/}
      <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            What pain condition have you been diagnosed with?
          </FormLabel>
          <Select
            value={parentState.painCondition}
            onChange={updateParentState}
            name="painCondition"
            displayEmpty
            inputProps={{
              id: "painCondition-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {painConditionData.map(condition => (
              <MenuItem key={condition.value} value={condition.label}>
                {condition.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      {/*********** HAVE TRIED MEDICATION  *****************/}
      <div
        className={classes.root}
        style={{ display: parentState.painCondition === "" && "none" }}
      >
        <Typography variant="subheading">
          We want to know what you have tried for your pain and how it worked.
        </Typography>
        <div className={classes.root}>
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              Have you tried some medication for {parentState.painCondition}?
            </FormLabel>
            <RadioGroup
              aria-label="medication"
              name="medication"
              className={classes.group}
              value={parentState.medication}
              onChange={updateParentState}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      {/************* IF MEDICATION YES **************/}
      <div
        style={{
          display:
            (parentState.medication === "" ||
              parentState.medication === "no") &&
            "none"
        }}
      >
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend"> Medication you have tried</FormLabel>
          <Select
            value={parentState.medicationName}
            onChange={updateParentState}
            name="medicationName"
            displayEmpty
            inputProps={{
              id: "medicationName-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {medicationData.map(medication => (
              <MenuItem key={medication.value} value={medication.label}>
                {medication.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display:
            (parentState.medication === "no" ||
              parentState.medicationName === "") &&
            "none"
        }}
      >
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            How did medication {parentState.medicationName} worked?
          </FormLabel>
          <Select
            value={parentState.medEfficacy}
            onChange={updateParentState}
            name="medEfficacy"
            displayEmpty
            inputProps={{
              id: "medEfficacy-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {efficacyLevel.map(efficacy => (
              <MenuItem key={efficacy} value={efficacy}>
                {efficacy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/*************** PROCEDURES *********************/}
      <div
        style={{
          display:
            (parentState.medication === "no" && "block") ||
            (parentState.medEfficacy === "" && "none")
        }}
      >
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            Have you tried any procedures for {parentState.painCondition}?
          </FormLabel>
          <RadioGroup
            aria-label="procedures"
            name="procedures"
            className={classes.group}
            value={parentState.procedures}
            onChange={updateParentState}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      {/*********** IF PROCEDURES YES ********************/}
      <div
        style={{
          display:
            (parentState.procedures === "" ||
              parentState.procedures === "no") &&
            "none"
        }}
      >
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">Procedure you have tried</FormLabel>
          <Select
            value={parentState.procedureName}
            onChange={updateParentState}
            name="procedureName"
            displayEmpty
            inputProps={{
              id: "procedureName-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {proceduresData.map(procedure => (
              <MenuItem key={procedure} value={procedure}>
                {procedure}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/********* HOW IT WORKED *******************/}
      <div style={{ display: parentState.procedureName === "" && "none" }}>
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            Have {parentState.procedureName} worked?
          </FormLabel>
          <Select
            value={parentState.procedureEfficacy}
            onChange={updateParentState}
            name="procedureEfficacy"
            displayEmpty
            inputProps={{
              id: "procedureEfficacy-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {efficacyLevel.map(efficacy => (
              <MenuItem key={efficacy} value={efficacy}>
                {efficacy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/************* NON PHARMA  *****************/}
      <div
        style={{
          display:
            (parentState.procedures === "no" && "block") ||
            (parentState.procedureEfficacy === "" && "none")
        }}
      >
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            Have you tried non pharmacological treatments for{" "}
            {parentState.painCondition}?
          </FormLabel>
          <RadioGroup
            aria-label="nonPharma"
            name="nonPharma"
            className={classes.group}
            value={parentState.nonPharma}
            onChange={updateParentState}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      {/*********** IF NON PHARMA YES ********************/}
      <div
        style={{
          display:
            (parentState.nonPharma === "" || parentState.nonPharma === "no") &&
            "none"
        }}
      >
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            Non pharmacological treatments you have tried
          </FormLabel>
          <Select
            value={parentState.nonPharmaName}
            onChange={updateParentState}
            name="nonPharmaName"
            displayEmpty
            inputProps={{
              id: "nonPharmaName-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {nonPharmaData.map(treatment => (
              <MenuItem key={treatment.value} value={treatment.label}>
                {treatment.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/********* HOW IT WORKED *******************/}
      <div
        style={{
          display:
            (parentState.nonPharmaName === "" ||
              parentState.nonPharma === "no") &&
            "none"
        }}
      >
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            Have {parentState.nonPharmaName} worked?
          </FormLabel>
          <Select
            value={parentState.nonPharmaEfficacy}
            onChange={updateParentState}
            name="nonPharmaEfficacy"
            displayEmpty
            inputProps={{
              id: "nonPharmaEfficacy-required"
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select one option
            </MenuItem>
            {efficacyLevel.map(efficacy => (
              <MenuItem key={efficacy} value={efficacy}>
                {efficacy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Fragment>
  );
};

PainHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PainHistory);
