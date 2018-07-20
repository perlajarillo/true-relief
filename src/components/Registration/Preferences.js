import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import needsData from "./literals/preferences";
import FormHelperText from '@material-ui/core/FormHelperText';

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

const Preferences = props => {
  const { classes, parentGeneralState } = props;

  return (
    <Fragment>
      <Typography variant="subheading">{needsData.title}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Chose all that apply</FormLabel>
        <FormGroup>
          {needsData.data.map(need => (
            <CheckboxComponent
              key={need.value}
              value={need.value}
              label={need.label}
              {...props}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormHelperText>{parentGeneralState.errorSection}</FormHelperText>
    </Fragment>
  );
};

Preferences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preferences);
