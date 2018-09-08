import React, { Component } from "react";
import { db } from "../../firebase";
import { format } from "date-fns";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';


const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const EntriesList = ({ entries, uid }, classes) => {
  return (
      <div>
          <Grid container spacing={16}>
          <Grid item xs={10}>
                <Typography variant="title">All Pain Entries </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" variant="fab" color="primary" aria-label="Add" className={classes.button} component={Link} to={{
            pathname: '/newPainEntry',
            state: {
                authUser: uid
            }
            }}>
            <AddIcon />
            </Button>

        </Grid>
        </Grid>
          {entries ?
              (Object.keys(entries).map(key => {
                  let formatedStartDate, formatedEndDate;
                  let painIsIn = entries[key].painIsIn;
                  let keysInPainIsIn = Object.keys(painIsIn).map(key => {
                      let c = " - ";
                      return c += key;
                  });
                  formatedStartDate = format(
                      entries[key].startDate,
                      "d MMM YYYY h:mm a"
                  );
                  formatedEndDate = format(entries[key].endDate, "d MMM YYYY h:mm a");

                  return (
                      <Card className={classes.card} key={key}>
                          <CardContent>
                          <Typography variant="subheading">Start Date: {formatedStartDate}</Typography>
                          <Typography variant="subheading">End date: {formatedEndDate}</Typography>
                          <Typography variant="body1">Pain was in: {keysInPainIsIn}</Typography>
                           <Typography variant="body1">Pain intensity was: {entries[key].painIntensity}  |  {entries[key].eventDuration} </Typography>
                          <Typography variant="body1">Mood was: {entries[key].mood}</Typography>
                          <Typography variant="caption">Notes: {entries[key].notes}</Typography>
                          </CardContent>
                          <CardActions>
                                <Button size="small" color="primary" component={Link} to={{
                                    pathname: '/newPainEntry',
                                    state: {
                                        entries: entries[key],
                                        key: key,
                                        authUser: uid
                                    }}}>
                                  <Icon>edit_icon</Icon>Edit
                                </Button>
                          </CardActions>
                      </Card>
                  );
              })) : (
                <Typography variant="headline"> You don't have any entries yet, to register a new event clic in the button above (+)</Typography>
              )
    }

    </div>
  );
};

class TrackPain extends Component {
  constructor(props) {
    super(props);

    this.state = {
			entries: null,
			uid: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.authUser !== prevProps.authUser) {
      db.getPainEntries(this.props.authUser.uid).then(snapshot => {
        this.setState({
					entries: snapshot.val(),
					uid: this.props.authUser.uid
        });
      });
    }
  }

  render() {
    const { entries, uid } = this.state;
		const { classes } = this.props;
    return (
      <div>
        <Typography variant="headline">Track Pain</Typography>
        <EntriesList classes={classes} entries={entries} uid={uid}/>
      </div>
    );
  }
}

TrackPain.prototypes = {
  classes: PropTypes.object.isRequired
};

export default TrackPain;
