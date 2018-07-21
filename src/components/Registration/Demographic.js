import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { DatePicker } from "material-ui-pickers";
import demographicData from "./literals/demographic";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    maxWidth: 250
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const Demographic = props => {
  const {
    classes,
    parentState,
    updateParentState,
    updateDateInParentState
  } = props;

  return (
    <Fragment>
      <Typography variant="subheading">{demographicData.title}</Typography>
      <div className={classes.root}>
      <FormControl
          required={true}
          className={classes.formControl}
          aria-describedby="name-helper-text"
        >
          <FormLabel component="legend">{demographicData.name}</FormLabel>
          <Input
            id="adornment-name"
            name="name"
            value={parentState.name}
            onChange={updateParentState}
            inputProps={{
              "aria-label": "Name"
            }}
          />
      </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{demographicData.birth}</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              keyboard={false}
              label=""
              format="DD/MM/YYYY"
              placeholder="10/10/2018"
              mask={value =>
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              value={parentState.selectedDate}
              onChange={updateDateInParentState}
              disableOpenOnEnter
              animateYearScrolling={false}
              minDate="1920/01/01"
              maxDate="2050/01/01"
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl
          component="fieldset"
          required={true}
          className={classes.formControl}
        >
          <FormLabel component="legend">{demographicData.gender}</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            className={classes.group}
            value={parentState.gender}
            onChange={updateParentState}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <FormControl
          required={true}
          className={classes.formControl}
          aria-describedby="weight-helper-text"
        >
          <FormLabel component="legend">{demographicData.weight}</FormLabel>
          <Input
            id="adornment-weight"
            name="weight"
            value={parentState.weight}
            onChange={updateParentState}
            endAdornment={<InputAdornment position="end">lb</InputAdornment>}
            inputProps={{
              "aria-label": "Weight"
            }}
          />
        </FormControl>
        <FormControl
          required={true}
          className={classes.formControl}
          aria-describedby="height-helper-text"
        >
          <FormLabel component="legend">Height</FormLabel>
          <Input
            id="adornment-height"
            name="height"
            value={parentState.height}
            onChange={updateParentState}
            endAdornment={<InputAdornment position="end">ft</InputAdornment>}
            inputProps={{
              "aria-label": "Height"
            }}
          />
        </FormControl>
      </div>
    </Fragment>
  );
};

Demographic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Demographic);
