import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import challengesData from "./literals/challenges";

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

const CheckboxComponent = props => {
  const { value, label, parentState, updateParentState } = props;
  const checkboxObject =
    parentState.find(checkboxValue => {
      return Object.keys(checkboxValue).includes(value);
    }) || {};
  const isChecked =
    (Object.keys(checkboxObject).length && checkboxObject[value]) || false;

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={updateParentState(value)}
            value={value}
          />
        }
        label={label}
      />
    </Fragment>
  );
};

const Challenges = props => {
  const { classes } = props;

  return (
    <Fragment>
      <Typography variant="subtitle1">
        What are the biggest challenges you face?
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Chose all that apply</FormLabel>
        <FormGroup>
          {challengesData.map(challenge => (
            <CheckboxComponent
              key={challenge.value}
              value={challenge.value}
              label={challenge.label}
              {...props}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Fragment>
  );
};

Challenges.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Challenges);
