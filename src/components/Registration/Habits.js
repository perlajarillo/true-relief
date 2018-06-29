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
  const { classes, parentState, updateParentState } = props;

  return (
    <Fragment>
      <Typography variant="subheading">
        The next questions are related to your health habits.
      </Typography>
      <div className={classes.root}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Do you smoke?</FormLabel>
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
            Level of physical activity you do
          </FormLabel>
          <RadioGroup
            aria-label="physicalActivity"
            name="physicalActivity"
            className={classes.group}
            value={parentState.physicalActivity}
            onChange={updateParentState}
          >
            <FormControlLabel
              value="sedentary"
              control={<Radio />}
              label="Sedentary (little or no exercise)"
            />
            <FormControlLabel
              value="lightly"
              control={<Radio />}
              label="Lightly active (little exercise, sports 1-3 days/week)"
            />
            <FormControlLabel
              value="moderate"
              control={<Radio />}
              label="Moderate (moderate exercise, sports 3-5 days/week)"
            />
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="Very active (hard exercise, sports 6-7 days/week)"
            />
            <FormControlLabel
              value="extraActive"
              control={<Radio />}
              label="Extra active (very hard exercise, sports and physical job)"
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            How many hours do you sleep per day?
          </FormLabel>
          <RadioGroup
            aria-label="sleepHours"
            name="sleepHours"
            className={classes.group}
            value={parentState.sleepHours}
            onChange={updateParentState}
          >
            <FormControlLabel
              value="less than 5"
              control={<Radio />}
              label="Less than 5 hours"
            />
            <FormControlLabel
              value="5-7"
              control={<Radio />}
              label="5-7 hours"
            />
            <FormControlLabel value="8" control={<Radio />} label="8 hours" />
            <FormControlLabel
              value="more than 8"
              control={<Radio />}
              label="More than 8 hours"
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">
            In general, how do you consider the quality of your sleep?
          </FormLabel>
          <RadioGroup
            aria-label="sleep-quality"
            name="sleepQuality"
            className={classes.group}
            value={parentState.sleepQuality}
            onChange={updateParentState}
          >
            <FormControlLabel
              value="well"
              control={<Radio />}
              label="Well - rested"
            />
            <FormControlLabel
              value="trouble falling asleep"
              control={<Radio />}
              label="Trouble falling asleep"
            />
            <FormControlLabel
              value="trouble staying asleep"
              control={<Radio />}
              label="Trouble staying asleep"
            />
            <FormControlLabel
              value="lack of sleep"
              control={<Radio />}
              label="Negatively impacted by lack of sleep"
            />
            <FormControlLabel
              value="Dozed unintentionally"
              control={<Radio />}
              label="Dozed unintentionally"
            />
          </RadioGroup>
        </FormControl>
        {/*************** ALCOHOL ************************/}
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Do you drink alcohol?</FormLabel>
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
              How often do you drink alcohol?
            </FormLabel>
            <RadioGroup
              aria-label="alcohol-frequency"
              name="alcoholFrequency"
              className={classes.group}
              value={parentState.alcoholFrequency}
              onChange={updateParentState}
            >
              <FormControlLabel
                value="occasionally"
                control={<Radio />}
                label="Occasionally"
              />
              <FormControlLabel
                value="1 per week"
                control={<Radio />}
                label="1 per week"
              />
              <FormControlLabel
                value="2-3 per week"
                control={<Radio />}
                label="2-3 per week"
              />
              <FormControlLabel
                value="Almost everyday"
                control={<Radio />}
                label="Almost everyday"
              />
              <FormControlLabel
                value="Everyday"
                control={<Radio />}
                label="Everyday"
              />
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
              Considering one "standard" drink contains roughly 14 grams of pure
              alcohol, how many drinks of alcohol do you drink per day?
            </FormLabel>
            <Input
              id="drinks-of-alcohol"
              name="drinksOfAlcohol"
              value={parentState.drinksOfAlcohol}
              onChange={updateParentState}
              inputProps={{
                "aria-label": "drinks-of-alcohol"
              }}
            />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <FormLabel component="legend">
              What kind of alcoholic beverage do you usually drink?
            </FormLabel>
            <RadioGroup
              aria-label="beer"
              name="kindOfDrink"
              className={classes.group}
              value={parentState.kindOfDrink}
              onChange={updateParentState}
            >
              <FormControlLabel
                value="beer"
                control={<Radio />}
                label="12 ounces of regular beer, which is usually about 5% alcohol"
              />
              <FormControlLabel
                value="wine"
                control={<Radio />}
                label="5 ounces of wine, which is typically about 12% alcohol"
              />
              <FormControlLabel
                value="spirits"
                control={<Radio />}
                label="1.5 ounces of distilled spirits, which is about 40% alcohol"
              />
              <FormControlLabel
                value="malt liquor"
                control={<Radio />}
                label="8-9 oz of Malt Liquor, which is usually 7% of alcohol"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {/**************** COFFEE **************************************/}
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Do you drink coffee?</FormLabel>
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
              How often do you drink coffee?
            </FormLabel>
            <RadioGroup
              aria-label="alcohol-frequency"
              name="coffeeFrequency"
              className={classes.group}
              value={parentState.coffeeFrequency}
              onChange={updateParentState}
            >
              <FormControlLabel
                value="occasionally"
                control={<Radio />}
                label="Occasionally"
              />
              <FormControlLabel
                value="1 per week"
                control={<Radio />}
                label="1 per week"
              />
              <FormControlLabel
                value="2-3 per week"
                control={<Radio />}
                label="2-3 per week"
              />
              <FormControlLabel
                value="4-5 per week"
                control={<Radio />}
                label="4-5 per week"
              />
              <FormControlLabel
                value="Almost everyday"
                control={<Radio />}
                label="Almost everyday"
              />
              <FormControlLabel
                value="Everyday"
                control={<Radio />}
                label="Everyday"
              />
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
              Considering an standar size of 12oz, how many cups of coffee do
              you drink per day?
            </FormLabel>
            <Input
              id="cups-of-coffee"
              name="cupsOfCoffee"
              value={parentState.cupsOfCoffee}
              onChange={updateParentState}
              inputProps={{
                "aria-label": "cups-of-coffee"
              }}
            />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <FormLabel component="legend">
              What kind of coffee do you regularly drink?
            </FormLabel>
            <RadioGroup
              aria-label="kind-coffee"
              name="kindOfCoffee"
              className={classes.group}
              value={parentState.kindOfCoffee}
              onChange={updateParentState}
            >
              <FormControlLabel
                value="espresso"
                control={<Radio />}
                label="Espresso"
              />
              <FormControlLabel
                value="americano"
                control={<Radio />}
                label="Americano"
              />
              <FormControlLabel
                value="machiato"
                control={<Radio />}
                label="Machiato"
              />
              <FormControlLabel
                value="cappuccino"
                control={<Radio />}
                label="Cappuccino"
              />
              <FormControlLabel
                value="latte"
                control={<Radio />}
                label="Latte"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl required className={classes.formControl}>
          <FormLabel component="legend">
            How do you consider your health status in general?
          </FormLabel>
          <RadioGroup
            aria-label="health-status"
            name="healthStatus"
            className={classes.group}
            value={parentState.healthStatus}
            onChange={updateParentState}
          >
            <FormControlLabel
              value="excellent"
              control={<Radio />}
              label="Excellent"
            />
            <FormControlLabel
              value="veryGood"
              control={<Radio />}
              label="Very Good"
            />
            <FormControlLabel value="good" control={<Radio />} label="Good" />
            <FormControlLabel value="fair" control={<Radio />} label="Fair" />
            <FormControlLabel value="poor" control={<Radio />} label="Poor" />
          </RadioGroup>
        </FormControl>
      </div>
    </Fragment>
  );
};

Habits.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Habits);
