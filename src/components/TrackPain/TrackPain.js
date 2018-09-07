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
      <Typography variant="title">All Pain Entries</Typography>
      {entries &&
        Object.keys(entries).map(key => {
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
                <p>Start Date: {formatedStartDate}</p>
                <p>End date: {formatedEndDate}</p>
                <p>Duration: {entries[key].eventDuration}</p>
                <p>My mood was: {entries[key].mood}</p>
                <p>Pain intensity was: {entries[key].painIntensity}</p>
							<p>Pain was in: {keysInPainIsIn}</p>

                <p>Notes: {entries[key].notes}</p>
              </CardContent>
              <CardActions>
                      <Link
                      to={{
                            pathname: '/newPainEntry',
                              state: {
                                  entries: entries[key],
                                  key: key,
                                  authUser: uid
                            }
                          }}
                      >
                <Button size="small">Edit</Button>
              </Link>
              </CardActions>
            </Card>
          );
        })}
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
        <h1>Track Pain</h1>
        <EntriesList classes={classes} entries={entries} uid={uid}/>
      </div>
    );
  }
}

TrackPain.prototypes = {
  classes: PropTypes.object.isRequired
};

export default TrackPain;
