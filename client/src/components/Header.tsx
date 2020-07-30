import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 500,
    textAlign: 'center',
    alignItems: 'center',
    color:'white',
  },
  styleh2: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
     margin:'0'
    },
  },
    styleh4: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      margin:'0'
    },
  },
      styleh5: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      margin:'0'
    }
  }
}));

export default function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.styleh2} variant="h2" gutterBottom>
        Welcome to the FOOD MAP
      </Typography>
      <Typography className={classes.styleh4} variant="h4" gutterBottom>
        A place for all food lovers
      </Typography>
      <Typography className={classes.styleh5} variant="h5" gutterBottom>
        This is a place for all food lovers that love to dine out in restaurants,
        write private reviews and share them only with friends
      </Typography>
    </div>
  );
}
