import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import habitsData from './literals/habits.js'
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    maxWidth: 550
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

const Habits = props => {
  const { classes, parentState, updateParentState, reviewValidations } = props;

  return (
    <Fragment>
      <Typography variant="subheading">{habitsData.title}</Typography>
      <div className={classes.root}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{habitsData.smokeTitle}</FormLabel>
          <RadioGroup
            aria-label="smoke"
            name="smoke"
            className={classes.group}
            value={parentState.smoke}
            onChange={updateParentState}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            {habitsData.physicalActivity.title}
          </FormLabel>
          <RadioGroup
            aria-label="physicalActivity"
            name="physicalActivity"
            className={classes.group}
            value={parentState.physicalActivity}
            onChange={updateParentState}
          >
            {habitsData.physicalActivity.activityLevel.map(level => (
              <FormControlLabel
                key={level.value}
                value={level.value}
                control={<Radio />}
                label={level.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{habitsData.sleep.titleHours}</FormLabel>
          <RadioGroup
            aria-label="sleepHours"
            name="sleepHours"
            className={classes.group}
            value={parentState.sleepHours}
            onChange={updateParentState}
          >
            {habitsData.sleep.sleepHours.map(hours => (
              <FormControlLabel
                key={hours.value}
                value={hours.value}
                control={<Radio />}
                label={hours.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{habitsData.sleep.titleQuality}</FormLabel>
          <RadioGroup
            aria-label="sleep-quality"
            name="sleepQuality"
            className={classes.group}
            value={parentState.sleepQuality}
            onChange={updateParentState}
          >
            {habitsData.sleep.sleepQuality.map(quality => (
              <FormControlLabel
                key={quality.value}
                value={quality.value}
                control={<Radio />}
                label={quality.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {/*************** ALCOHOL ************************/}
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{habitsData.alcohol.title}</FormLabel>
          <RadioGroup
            aria-label="alcohol"
            name="alcohol"
            className={classes.group}
            value={parentState.alcohol}
            onChange={updateParentState}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <div
          id="alcohol-record"
          style={{ display: parentState.alcohol !== "yes" && "none" }}
        >
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              {habitsData.alcohol.frequencyTitle}
            </FormLabel>
            <RadioGroup
              aria-label="alcohol-frequency"
              name="alcoholFrequency"
              className={classes.group}
              value={parentState.alcoholFrequency}
              onChange={updateParentState}
            >
              {habitsData.alcohol.alcoholFrequency.map(frequency => (
                <FormControlLabel
                  key={frequency.value}
                  value={frequency.value}
                  control={<Radio />}
                  label={frequency.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div
          style={{
            display:
              parentState.alcoholFrequency === "Almost everyday" ||
              parentState.alcoholFrequency === "Everyday"
                ? "block"
                : "none"
          }}
        >
          <FormControl
            required
            className={classes.formControl}
            aria-describedby="drinks-of-alcohol"
          >
            <FormLabel component="legend">
              {habitsData.alcohol.quantityTitle}
            </FormLabel>
            <Input
              id="drinks-of-alcohol"
              name="drinksOfAlcohol"
              type="number"
              value={parentState.drinksOfAlcohol}
              onChange={updateParentState}
              onBlur={reviewValidations}
              inputProps={{
                "aria-label": "drinks-of-alcohol",
                min: "1", max: "30", step: "1"
              }}
            />
            <FormHelperText>{parentState.errordrinksOfAlcohol}</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <FormLabel component="legend">
              {habitsData.alcohol.kindOfDrinkTitle}
            </FormLabel>
            <RadioGroup
              aria-label="beer"
              name="kindOfDrink"
              className={classes.group}
              value={parentState.kindOfDrink}
              onChange={updateParentState}
            >
              {habitsData.alcohol.kindOfDrink.map(drink => (
                <FormControlLabel
                  key={drink.value}
                  value={drink.value}
                  control={<Radio />}
                  label={drink.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        {/**************** COFFEE **************************************/}
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{habitsData.coffee.title}</FormLabel>
          <RadioGroup
            aria-label="coffee"
            name="coffee"
            className={classes.group}
            value={parentState.coffee}
            onChange={updateParentState}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <div
          id="coffee-record"
          style={{ display: parentState.coffee !== "yes" ? "none" : "block" }}
        >
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              {habitsData.coffee.frequencyTitle}
            </FormLabel>
            <RadioGroup
              aria-label="coffee-frequency"
              name="coffeeFrequency"
              className={classes.group}
              value={parentState.coffeeFrequency}
              onChange={updateParentState}
            >
              {habitsData.coffee.coffeeFrequency.map(frequency => (
                <FormControlLabel
                  key={frequency.value}
                  value={frequency.value}
                  control={<Radio />}
                  label={frequency.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div
          style={{
            display:
              parentState.coffeeFrequency === "Almost everyday" ||
              parentState.coffeeFrequency === "Everyday"
                ? "block"
                : "none"
          }}
        >
          <FormControl
            required
            className={classes.formControl}
            aria-describedby="cups-of-coffee"
          >
            <FormLabel component="legend">
              {habitsData.coffee.quantityTitle}
            </FormLabel>
            <Input
              id="cups-of-coffee"
              name="cupsOfCoffee"
              type="number"
              value={parentState.cupsOfCoffee}
              onChange={updateParentState}
              onBlur={reviewValidations}
              inputProps={{
                "aria-label": "cups-of-coffee",
                min: "1", max: "30", step: "1"
              }}
            />
            <FormHelperText>{parentState.errorcupsOfCoffee}</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <FormLabel component="legend">
              {habitsData.coffee.kindOfCoffeeTitle}
            </FormLabel>
            <RadioGroup
              aria-label="kind-coffee"
              name="kindOfCoffee"
              className={classes.group}
              value={parentState.kindOfCoffee}
              onChange={updateParentState}
            >
              {habitsData.coffee.kindOfCoffee.map(kind => (
                <FormControlLabel
                  key={kind.value}
                  value={kind.value}
                  control={<Radio />}
                  label={kind.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">{habitsData.title}</FormLabel>
          <RadioGroup
            aria-label="health-status"
            name="healthStatus"
            className={classes.group}
            value={parentState.healthStatus}
            onChange={updateParentState}
          >
            {habitsData.health.status.map(status => (
              <FormControlLabel
                key={status.value}
                value={status.value}
                control={<Radio />}
                label={status.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <FormHelperText>{parentState.errorSection}</FormHelperText>
    </Fragment>
  );
};

Habits.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Habits);
