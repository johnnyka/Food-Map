import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import {
  makeStyles, createStyles, useTheme,
} from '@material-ui/core/styles';
import GoogleLoginButton from './GoogleLoginButton';

const useStyles = makeStyles(() => createStyles({
  modal: {
    // minWidth: '600px',
  },
}));

interface IModal {
  open: boolean;
  handleClose: () => void;
}

export default function GoogleModal(props: IModal) {
  const {
    handleClose, open,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
        <DialogTitle className={classes.modal} id="form-dialog-title">
          Please login
        </DialogTitle>

        <DialogContent>
          <GoogleLoginButton />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
