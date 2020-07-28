import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function NavigationDrawer(props: { toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void, isDrawerOpen: boolean }) {
  const classes = useStyles();

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {['Home', 'Dashboard', 'About'].map((text, index) => (
          <Link to={text === 'Home' ? '/' : `/${text}`}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={props.isDrawerOpen} onClose={props.toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
