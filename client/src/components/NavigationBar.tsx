import React, { useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GoogleLoginButton from './GoogleLoginButton';
import Searchbar from './Searchbar';
import NavigationDrawer from './NavigationDrawer';
import { LogedInContext } from './LogedInProvider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: '#fda32e',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    fontFamily: 'Amatic SC, cursive',
    fontSize: '3rem',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { updateLogedIn } = useContext(LogedInContext);

  useEffect(() => {
    fetch('/api/checkValidCookie')
      .then((res) => res.json())
      .then((res) => updateLogedIn(res.exists));
  }, []); // eslint-disable-line

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Food Map
          </Typography>

          <div className={classes.search}>
            <Searchbar />
          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <GoogleLoginButton />
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
