import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  listWidth: {
    width: 250,
    backgroundColor: '#f98016',
    height: '100%',
  },
  fullList: {
    width: 'auto',
  },
  root: {
    fontWeight: 'bold',
    fontSize: '4rem',
  },
});

export default function NavigationDrawer(props: {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
  isDrawerOpen: boolean
}) {
  const classes = useStyles();
  const { listWidth } = classes;
  const { toggleDrawer, isDrawerOpen } = props;

  const list = () => (
    <div
      className={clsx(listWidth)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'Dashboard', 'About'].map((text) => (
          <Link key={text} to={text === 'Home' ? '/' : `/${text}`}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
