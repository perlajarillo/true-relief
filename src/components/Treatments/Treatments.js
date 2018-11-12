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
import Image from "./Image.js";

const RECOMMENDED_TREATMENTS = [];
const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  wrapper: {
    margin: "80px 0",
    minHeight: "80vh"
  },
  card: {
    display: "flex",
    marginTop: "10px"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  content: {
    flex: "auto"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  coverImage: {
    width: 251,
    maxHeight: 200,
    marginRight: 10,
    marginLeft: 400,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 400
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
      marginRight: 0,
      width: 71,
      maxHeight: 70
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: 0,
      marginRight: 0,
      width: 251,
      maxHeight: 300
    }
  }
});

class Treatments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      painConditions: null
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
  /**
   * getRecommendedTreatments matches the patient's pain conditions with the
   * recommended treatments and sets them in RECOMMENDED_TREATMENTS
   * @returns {Void}
   */
  getRecommendedTreatments(painConditions) {
    Object.keys(painConditions).map(painCondition => {
      treatmentsData.map(treatment => {
        if (treatment.conditions.includes(painConditions[painCondition].name)) {
          if (RECOMMENDED_TREATMENTS.indexOf(treatment) === -1) {
            RECOMMENDED_TREATMENTS.push(treatment);
          }
        }
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
    painConditions !== null && this.getRecommendedTreatments(painConditions);
    return RECOMMENDED_TREATMENTS ? (
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Suggested no-pharmacological treatments for you{" "}
          </Typography>
          {RECOMMENDED_TREATMENTS.map(treatment => {
            return (
              <Card className={classes.card} key={treatment.name}>
                <div className={classes.details}>
                  {" "}
                  <CardContent className={classes.content}>
                    <Typography variant="h6">{treatment.name} </Typography>
                    <Typography variant="subtitle1">
                      {treatment.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.controls}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      href={treatment.source}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </div>
                <Image
                  imageName={treatment.picture}
                  coverImage={classes.coverImage}
                />
              </Card>
            );
          })}
        </div>
      </div>
    ) : (
      <div>
        <Typography variant="h5" gutterBottom>
          There are not recommended treatments for you{" "}
        </Typography>
      </div>
    );
  }
}

const StyledTreatments = withStyles(styles)(Treatments);
const authTreatments = authUser => Boolean(authUser);

export default withAuthorization(authTreatments)(StyledTreatments);
