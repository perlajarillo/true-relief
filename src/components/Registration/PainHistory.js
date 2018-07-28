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
import painHistoryData from "./literals/painHistoryData.js";
import FormHelperText from '@material-ui/core/FormHelperText';

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

const PainHistory = props => {
  const { classes, parentState, updateParentState } = props;
  const {
    text,
    sections,
    painConditionData,
    medicationData,
    efficacyLevel,
    proceduresData,
    nonPharmaData
  } = painHistoryData;

  return (
    <Fragment>
      <Typography variant="subheading">{text}</Typography>
      {/********** PAIN CONDITION ***************/}
      <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            {sections.painCondition.title}
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
          {sections.medication.title}
        </Typography>
        <div className={classes.root}>
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              {sections.medication.haveTried}{parentState.painCondition}?
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
          <FormLabel component="legend">{sections.medication.whatHaveTried}</FormLabel>
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
            value={parentState.medicationEffectiveness}
            onChange={updateParentState}
            name="medicationEffectiveness"
            displayEmpty
            inputProps={{
              id: "medicationEffectiveness-required"
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
            (parentState.medicationEffectiveness === "" && "none")
        }}
      >
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            {sections.procedure.haveTried}{parentState.painCondition}?
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
          <FormLabel component="legend">{sections.procedure.whatHaveTried}</FormLabel>
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
            value={parentState.procedureEffectiveness}
            onChange={updateParentState}
            name="procedureEffectiveness"
            displayEmpty
            inputProps={{
              id: "procedureEffectiveness-required"
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
            (parentState.procedureEffectiveness === "" && "none")
        }}
      >
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            {sections.nonPharma.haveTried}
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
            {sections.nonPharma.whatHaveTried}
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
            value={parentState.nonPharmaEffectiveness}
            onChange={updateParentState}
            name="nonPharmaEffectiveness"
            displayEmpty
            inputProps={{
              id: "nonPharmaEffectiveness-required"
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
      <FormHelperText error={true}>{parentState.errorSection}</FormHelperText>
    </Fragment>
  );
};

PainHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PainHistory);
