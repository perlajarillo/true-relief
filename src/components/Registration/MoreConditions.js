import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

const MoreConditions = props => {
  const { classes, parentState, updateParentState } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="subheading">
          Complete your pain history...
        </Typography>
        <div className={classes.root}>
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              Have you been diagnosed with another pain condition?
            </FormLabel>
            <RadioGroup
              aria-label="anotherCondition"
              name="anotherCondition"
              className={classes.group}
              value={parentState.anotherCondition}
              onChange={updateParentState}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
};

MoreConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreConditions);
