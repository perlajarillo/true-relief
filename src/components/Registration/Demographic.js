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
import FormHelperText from "@material-ui/core/FormHelperText";

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
    reviewValidations,
    updateDateInParentState
  } = props;

  this.input = React.createRef();

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
            ref={this.input}
            onChange={updateParentState}
            onBlur={reviewValidations}
            inputProps={{
              "aria-label": "Name"
            }}
          />
          <FormHelperText error={true}>{parentState.errorname}</FormHelperText>
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
              format="d/MM/YYYY"
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
          <FormHelperText error={true}>
            {parentState.errorSelectedDate}
          </FormHelperText>
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
          <FormHelperText error={true}>
            {parentState.errorgender}
          </FormHelperText>
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
            type="number"
            value={parentState.weight}
            ref={this.input}
            onChange={updateParentState}
            onBlur={reviewValidations}
            endAdornment={<InputAdornment position="end">lb</InputAdornment>}
            inputProps={{
              "aria-label": "Weight",
              min: "65",
              max: "800",
              step: "0.5"
            }}
          />
          <FormHelperText error={true}>
            {parentState.errorweight}
          </FormHelperText>
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
            type="number"
            ref={this.input}
            onChange={updateParentState}
            onBlur={reviewValidations}
            endAdornment={
              <InputAdornment position="end">ft+inch</InputAdornment>
            }
            inputProps={{
              "aria-label": "Height",
              min: "4",
              max: "8",
              step: "0.5"
            }}
          />
          <FormHelperText error={true}>
            {parentState.errorheight}
          </FormHelperText>
        </FormControl>
        <FormHelperText error={true}>{parentState.errorSection}</FormHelperText>
      </div>
    </Fragment>
  );
};

Demographic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Demographic);
