import React, { Component } from 'react';
import { db } from '../../firebase';
import { format } from 'date-fns';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import compareDesc from 'date-fns/compareDesc';
import withAuthorization from '../WithAuthorization';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteTrackPain } from '../../firebase/operations';

const styles = theme => ({
  card: {
    //330, 250
    width: theme.spacing.unit * 40,
    height: theme.spacing.unit * 25,
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    flexGrow: 1,
    marginLeft: '8%'
  }
});

const datesSorted = entries => {
  let sorted = Object.keys(entries)
    .map(key => {
      return entries[key].endDate;
    })
    .sort((a, b) => compareDesc(a, b));

  return sorted.reduce((newEntries, date) => {
    const entryObject = Object.keys(entries)
      .map(key => {
        if (entries[key].endDate === date) {
          entries[key].entryId = key;
          return entries[key];
        }
      })
      .filter(Boolean);
    newEntries.push(entryObject[0]);
    return newEntries;
  }, []);
};

const EntriesList = ({
  state,
  classes,
  handleClickDeleteEntry,
  handleClose,
  handleDeleteEntry,
  onChange
}) => {
  const { entries, open, uid } = state;
  const sortedDates = entries ? datesSorted(entries) : [];
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={9}>
          <Typography variant="title">All Pain Entries </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="small"
            variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
            component={Link}
            to={{
              pathname: '/newPainEntry',
              state: {
                authUser: uid
              }
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      {entries ? (
        sortedDates.map(entry => {
          let formatedStartDate, formatedEndDate;
          let painIsIn = entry.painIsIn;
          let keysInPainIsIn = Object.keys(painIsIn).map(key => {
            let c = ' - ';
            return (c += key);
          });
          formatedStartDate = format(entry.startDate, 'd MMM YYYY h:mm a');
          formatedEndDate = format(entry.endDate, 'd MMM YYYY h:mm a');

          return (
            <Card className={classes.card} key={entry.entryId}>
              <CardContent>
                <Typography>Start Date: {formatedStartDate}</Typography>
                <Typography>End date: {formatedEndDate}</Typography>
                <Typography variant="caption">
                  Pain was in: {keysInPainIsIn}
                </Typography>
                <Typography variant="caption">
                  Pain intensity was: {entry.painIntensity} |{' '}
                  {entry.eventDuration}{' '}
                </Typography>
                <Typography variant="caption">
                  Mood was: {entry.mood}
                </Typography>
                {/* <Typography variant="caption">Notes: {entry.notes}</Typography> */}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={{
                    pathname: '/newPainEntry',
                    state: {
                      entries: entry,
                      key: entry.entryId,
                      authUser: uid
                    }
                  }}
                >
                  <Icon>edit_icon</Icon>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickDeleteEntry(entry.entryId)}
                >
                  <DeleteIcon />
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <Typography variant="headline">
          {' '}
          You don't have any entries yet, to register a new event click in the
          button above (+)
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete entry?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEntry} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

class TrackPain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: null,
      uid: null,
      open: false,
      entryKey: ''
    };
  }

  handleDeleteEntry = () => {
    const { uid, entryKey } = this.state;
    deleteTrackPain(uid, entryKey);
    this.getPainEntries();
    this.handleClose();
  };

  handleClickDeleteEntry = entryId => {
    this.setState({ open: true, entryKey: entryId });
  };

  handleClose = () => {
    this.setState({ open: false, entryKey: '' });
  };
  getPainEntries = () => {
    db.getPainEntries(this.props.authUser.uid).then(snapshot => {
      this.setState({
        entries: snapshot.val(),
        uid: this.props.authUser.uid
      });
    });
  };
  componentDidMount() {
    if (this.props.authUser) {
      this.unregisterObserver = this.getPainEntries();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getPainEntries();
    }
  }
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="headline">Track Pain</Typography>
        <EntriesList
          classes={classes}
          state={this.state}
          handleClickDeleteEntry={this.handleClickDeleteEntry}
          handleClose={this.handleClose}
          handleDeleteEntry={this.handleDeleteEntry}
        />
      </div>
    );
  }
}

TrackPain.prototypes = {
  classes: PropTypes.object.isRequired
};

const StyledTrackPain = withStyles(styles)(TrackPain);
const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(StyledTrackPain);
