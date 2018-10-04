import React, { Component } from "react";
import classNames from "classnames";
import { db } from "../../firebase";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import compareDesc from "date-fns/compareDesc";
import withAuthorization from "../WithAuthorization";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteTrackPain } from "../../firebase/operations";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Radio from "@material-ui/core/Radio";

const styles = theme => ({
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
  },
  root: {
    flexGrow: 1,
    marginLeft: "1%",
    width: "98%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },

  personalizedCell: {
    width: "7px",
    align: "center",
    whiteSpace: "nowrap"
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

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
const rows = [
  {
    id: "startDate",
    numeric: false,
    disablePadding: true,
    label: "Start date"
  },
  { id: "endDate", numeric: false, disablePadding: false, label: "End date" },
  {
    id: "eventDuration",
    numeric: false,
    disablePadding: false,
    label: "Duration"
  },
  {
    id: "painIsIn",
    numeric: false,
    disablePadding: false,
    label: "Body part affected"
  },
  {
    id: "painIntensity",
    numeric: true,
    disablePadding: false,
    label: "Intensity "
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: " Description"
  },
  { id: "mood", numeric: false, disablePadding: false, label: "Mood" },
  { id: "notes", numeric: false, disablePadding: false, label: "Notes" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12,
    width: "100px"
  }
}))(TableCell);

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox" />
          {rows.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "none"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 50%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { entryKey, classes, handleClickDeleteEntry, entry, uid } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: entryKey !== ""
      })}
    >
      <div className={classes.title}>
        {entryKey !== "" ? (
          <Typography color="inherit" variant="subheading">
            {1} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            All pain entries
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {entryKey !== "" ? (
          <div>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                color="primary"
                onClick={handleClickDeleteEntry}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                color="primary"
                component={Link}
                to={{
                  pathname: "/newPainEntry",
                  state: {
                    entries: entry,
                    key: entry.entryId,
                    authUser: uid
                  }
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  entryKey: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  entry: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const EntriesList = ({
  state,
  classes,
  handleClickDeleteEntry,
  handleClose,
  handleDeleteEntry,
  isSelected,
  handleClick,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const {
    entries,
    open,
    uid,
    order,
    orderBy,
    rowsPerPage,
    page,
    entryKey,
    entry
  } = state;
  const emptyRows = entries
    ? rowsPerPage - Math.min(rowsPerPage, entries.length - page * rowsPerPage)
    : 0;
  const sortedDates = entries ? datesSorted(entries) : [];
  console.log(sortedDates);
  return (
    <div className={classes.root}>
      <Button
        size="small"
        variant="extendedFab"
        color="primary"
        aria-label="Add"
        className={classes.button}
        component={Link}
        to={{
          pathname: "/newPainEntry",
          state: {
            authUser: uid
          }
        }}
      >
        <AddIcon /> Add new entry
      </Button>
      {entries ? (
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            entryKey={entryKey}
            handleClickDeleteEntry={handleClickDeleteEntry}
            uid={uid}
            entry={entry}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                entryKey={entryKey}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Object.keys(entries).length}
              />
              <TableBody>
                {stableSort(sortedDates, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(entry => {
                    let formatedStartDate, formatedEndDate;
                    let painIsIn = entry.painIsIn;
                    let keysInPainIsIn = Object.keys(painIsIn).map(key => {
                      let c = " - ";
                      return (c += key);
                    });
                    formatedStartDate = format(
                      entry.startDate,
                      "d MMM YYYY h:mm a"
                    );
                    formatedEndDate = format(
                      entry.endDate,
                      "d MMM YYYY h:mm a"
                    );
                    const itIsSelected = isSelected(entry);
                    return (
                      <TableRow
                        hover
                        onClick={event =>
                          handleClick(event, entry.entryId, entry)
                        }
                        role="checkbox"
                        aria-checked={itIsSelected}
                        tabIndex={-1}
                        key={entry.entryId}
                        selected={itIsSelected}
                        className={classes.row}
                      >
                        <CustomTableCell
                          padding="checkbox"
                          className={classes.personalizedCell}
                        >
                          <Radio
                            checked={entryKey === entry.entryId}
                            color="primary"
                          />
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {formatedStartDate}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {formatedEndDate}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {entry.eventDuration}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {keysInPainIsIn}
                        </CustomTableCell>
                        <CustomTableCell className={classes.personalizedCell}>
                          {entry.painIntensity}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {entry.description}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {entry.mood}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {entry.notes}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={Object.keys(entries).length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div className={classes.root}>
          <Typography variant="headline">
            {" "}
            You don't have any entries yet, to register a new event click in the
            button above (+)
          </Typography>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete entry?"}</DialogTitle>
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
      entries: [],
      uid: "",
      open: false,
      entryKey: "",
      order: "desc",
      orderBy: "endDate",
      selected: [],
      page: 0,
      rowsPerPage: 5,
      entry: {}
    };
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id, entry) => {
    this.state.entryKey === id
      ? this.setState({ entryKey: "", entry: {} })
      : this.setState({ entryKey: id, entry: entry });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.entryKey === id;

  handleDeleteEntry = () => {
    const { uid, entryKey } = this.state;
    deleteTrackPain(uid, entryKey);
    this.getPainEntries();
    this.handleClose();
  };

  handleClickDeleteEntry = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, entryKey: "" });
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
          isSelected={this.isSelected}
          handleClick={this.handleClick}
          handleSelectAllClick={this.handleSelectAllClick}
          handleRequestSort={this.handleRequestSort}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
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
