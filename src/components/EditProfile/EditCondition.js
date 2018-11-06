import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import painHistoryData from "../Registration/literals/painHistoryData.js";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    maxWidth: 250
  },
  wrapper: {
    margin: "60px 0",
    minHeight: "30vh",
    maxWidth: "200vh"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const {
  sections,
  painConditionData,
  medicationData,
  efficacyLevel,
  proceduresData,
  nonPharmaData
} = painHistoryData;

const EditCondition = props => {
  const { classes, parentState, updateParentState } = props;

  return (
    <div className={classes.wrapper}>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">{sections.painCondition.title}</FormLabel>
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
          {painConditionData.map(condition => (
            <MenuItem key={condition.value} value={condition.label}>
              {condition.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          {sections.medication.whatHaveTried}
        </FormLabel>
        <Select
          value={parentState.medicationName}
          name="medicationName"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {medicationData.map(medication => (
            <MenuItem key={medication.value} value={medication.label}>
              {medication.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          How did medication {parentState.medicationName} work?
        </FormLabel>
        <Select
          value={parentState.medicationEffectiveness}
          name="medicationEffectiveness"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {efficacyLevel.map(efficacy => (
            <MenuItem key={efficacy} value={efficacy}>
              {efficacy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          {sections.nonPharma.whatHaveTried}
        </FormLabel>
        <Select
          value={parentState.nonPharmaName}
          name="nonPharmaName"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {nonPharmaData.map(treatment => (
            <MenuItem key={treatment.value} value={treatment.label}>
              {treatment.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          Have {parentState.nonPharmaName} worked?
        </FormLabel>
        <Select
          value={parentState.nonPharmaEffectiveness}
          name="nonPharmaEffectiveness"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {efficacyLevel.map(efficacy => (
            <MenuItem key={efficacy} value={efficacy}>
              {efficacy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          {sections.procedure.whatHaveTried}
        </FormLabel>
        <Select
          value={parentState.procedureName}
          name="procedureName"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {proceduresData.map(procedure => (
            <MenuItem key={procedure} value={procedure}>
              {procedure}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <FormLabel component="legend">
          Did {parentState.procedureName} work?
        </FormLabel>
        <Select
          value={parentState.procedureEffectiveness}
          name="procedureEffectiveness"
          onChange={updateParentState}
          displayEmpty
          className={classes.selectEmpty}
        >
          {efficacyLevel.map(efficacy => (
            <MenuItem key={efficacy} value={efficacy}>
              {efficacy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

EditCondition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCondition);
