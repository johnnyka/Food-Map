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
      display: 'inline',
      height: 250,
      width: 250,
      borderRadius: '160px'
    },
    space: {
      marginLeft: '.5rem',
    },
    membersinfo: {
      display: 'flex',
      flexDirection: 'row'
    },
    inlineText: {
      display: 'inline',
    }
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
              Food Map was born by need to save possible future dinners at a specific restaurant,
              <br />
              {' '}
              but also the
              avaiablility to save reviews for memorization.
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.importanceText}>
              "I want an app that's like "Vintino"", and then Food map was born.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.readingSpace + classes.titleFont} gutterBottom>
              Food Map Creators
             </Typography>
            <img alt="Johnny" src={Johnny} className={classes.large} />
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.inlineText}>
                Johnny
              </Typography>
              <a href="https://www.linkedin.com/in/johnny-kan-a4b0981a8/">
                <GitHubIcon className={classes.space} />
              </a>
            </Grid>
            <img alt="Danijela" src={Danijela} className={classes.large} />
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.inlineText} >
                Danijela
              </Typography>
              <a href="https://www.linkedin.com/in/danijela-milenkovic-926b0a57">
                <GitHubIcon className={classes.space} />
              </a>
            </Grid>
            <img alt="Josephine" src={Josephine} className={classes.large} />
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.inlineText} >
                Joséphine
              </Typography>
              <a href="https://github.com/code-crow1337">
                <GitHubIcon className={classes.space} />
              </a>
            </Grid>
            <img alt="Måns" src={Mans} className={classes.large} />
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.inlineText} >
                Måns
              </Typography>
              <a href="https://github.com/MansJackson">
                <GitHubIcon className={classes.space} />
              </a>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
