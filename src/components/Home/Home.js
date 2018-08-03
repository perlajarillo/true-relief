import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import backgroundImg from "../../images/background.jpg";
import tools from "./literals/tools"

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: "20px",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: '#c43e00',
    },
  },
});

function Tools(props) {
  const { tool, classes } = props;
  const { name, icon, description } = tool;

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="headline" component="h2">
            { name }
          </Typography>
          <Icon className={classes.icon} color="secondary" style={{ fontSize: 48 }}>
            { icon }
          </Icon>
          <Typography component="p">{ description }</Typography>
          <Button size="small" color="primary">Read More</Button>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

function Home(props) {
  const { classes } = props;
    return (
      <React.Fragment>
        <Grid container>
          <Grid item>
            <img src={backgroundImg} alt="" width="100%"/>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item sm={12} md={12} lg={12}>
              <Typography variant="title">About True Relief App</Typography>
              <Typography variant="body1">
                This App has a number of tools and strategies to help you best.
                Control your pain including:
              </Typography>
            </Grid>

            {tools.map(tool => (
              <Tools key={tool.name} classes={classes} tool={tool}/>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);