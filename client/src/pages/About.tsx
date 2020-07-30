import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Icon } from '@material-ui/core';
import Danijela from '../Dev_team/Danijela.jpeg';
import Johnny from '../Dev_team/Johnny.jpeg';
import Josephine from '../Dev_team/Josephine.jpeg';
import Mans from '../Dev_team/Mans.jpeg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: "rgba(255, 255, 255, 0.65)",
      color: 'black',
      display: 'flex',
      flexDirection: 'row',
    },
    control: {
      padding: theme.spacing(2),
    },
    readingSpace: {
      marginBottom: '3rem',
    },
    importanceText: {
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    titleFont: {
      fontFamily: 'Amatic SC, cursive',
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }),
);
function About() {
  const classes = useStyles();
  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.readingSpace + classes.titleFont} gutterBottom>
              What is Food Map?
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.readingSpace}>
              Food Map was born by need to save possible future dinners at a specific restaurant,<br /> but also the
              avaiablility to save reviews for memorization.
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.importanceText}>
              "I want an app that's like "Vintino"", and then Food map was born.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>6</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>6</Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.readingSpace + classes.titleFont} gutterBottom>
              Food Map Creators
             </Typography>
          </Paper>
        </Grid>

        <Grid
          container
          direction='row'
          justify="center"
          alignItems="center"
        >
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={3}>
              <Avatar alt="Johnny" src={Johnny} className={classes.large} />
              Johnny
              <GitHubIcon />
            </Grid>
            <Grid item xs={3}>
              <Avatar alt="Danijela" src={Danijela} className={classes.large} />
              Danijela
              <GitHubIcon />
            </Grid>
            <Grid item xs={3}>
              <Avatar alt="Josephine" src={Josephine} className={classes.large} />
              Joséphine
              <GitHubIcon />
            </Grid>
            <Grid item xs={3}>
              <Avatar alt="Måns" src={Mans} className={classes.large} />
              Måns
              <GitHubIcon />
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default About;







