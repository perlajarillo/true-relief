import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertIcon from "@material-ui/icons/Warning";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deletePatient } from "../../firebase/operations";
import { auth } from "../../firebase";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconBig: {
    fontSize: 30
  }
});

class CancelAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: null
    };
  }

  handleClickDelete = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = event => {
    deletePatient(auth.currentUserUid())
      .then(() => {
        auth
          .onDeleteUser()
          .then(() => {
            this.setState({
              msg: "We are sorry you are leaving."
            });
          })
          .catch(error => {
            this.setState({
              msg: error.message
            });
          });
      })
      .catch(error => {
        this.setState({
          msg: error.message
        });
      });
  };

  render() {
    const { open, msg } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Typography>
          <AlertIcon className={classes.iconBig} />
          This operation can NOT be undone. If you delete your account you will
          not be able to use True Relief's tools, like Tracking Pain, Local
          Providers and Treatments.
        </Typography>
        <br />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.handleClickDelete}
        >
          Delete Account
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <FormHelperText error={true}>{msg}</FormHelperText>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {" "}
            <AlertIcon className={classes.iconBig} />
            {"Delete account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CancelAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CancelAccount);
