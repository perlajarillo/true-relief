import React from "react";
import withAuthorization from "../WithAuthorization";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import treatmentsData from "./literals/treatmentsData";
import { db } from "../../firebase";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  wrapper: {
    margin: "80px 0",
    minHeight: "80vh"
  }
});

let PAIN_CONDITIONS_DB;
let SUGGESTED_TREATMENTS;

class Treatments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      painConditions: null,
      suggestedTreatment: null
    };
  }
  /**
   * getPatientConditions calls the database and retrieve a snapshot of the patients painConditions
   * @returns {Void}
   */
  getPatientConditions() {
    db.getPatientConditions(this.props.authUser.uid)
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({ painConditions: data });
      })
      .catch(error => {});
  }

  getPatientConditionsMatch(painConditions) {
    Object.keys(painConditions).map(painCondition => {
      treatmentsData.map(treatment => {
        treatment.conditions.map(condition => {
          if (condition === painConditions[painCondition].name)
            console.log(treatment);
        });
      });
    });
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.getPatientConditions();
    }
  }

  render() {
    const { classes } = this.props;
    const { painConditions } = this.state;
    painConditions !== null && this.getPatientConditionsMatch(painConditions);
    return (
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Suggested no-pharmacological treatments for you{" "}
          </Typography>
          {treatmentsData.map(treatment => {
            return (
              <Card className={classes.card} key={treatment.name}>
                <CardContent>
                  <Typography variant="h6">{treatment.name} </Typography>
                  <Typography variant="subtitle1">
                    {treatment.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={treatment.source}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
const StyledTreatments = withStyles(styles)(Treatments);
const authTreatments = authUser => Boolean(authUser);

export default withAuthorization(authTreatments)(StyledTreatments);
