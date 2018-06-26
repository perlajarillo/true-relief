import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const needsData = [
  { value: "copingStrategies", label: "Coping strategies" },
  { value: "trackingPain", label: "Tracking Pain" },
  {
    value: "communication",
    label: "Communicating pain status and the easy way with my doctor"
  },
  {
    value: "learningAboutCondition",
    label: "Learning about my pain condition"
  },
  { value: "newTreatments", label: "New ways to treat my pain" },
  { value: "learnTreatments", label: "Learn about treatments" },
  {
    value: "providers",
    label: "Identifying providers for treatments in my area"
  }
];

const CheckboxComponent = props => {
  const { value, label, parentState, updateParentState } = props;

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={parentState[value]}
            onChange={updateParentState(value)}
            value={value}
          />
        }
        label={label}
      />
    </Fragment>
  );
}

const Preferences = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Typography variant="subheading">
        Now we want to know what you are most looking for in an app that will
        help you with your pain. Based on your input we will pick specific tools
        that will meet your needs:
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Chose all that apply</FormLabel>
        <FormGroup>
          {needsData.map(need => (
            <CheckboxComponent
              key={need.value}
              value={need.value}
              label={need.label}
              {...props}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Fragment>
  );
};

Preferences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preferences);
