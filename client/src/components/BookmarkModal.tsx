import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import {
  makeStyles, createStyles, useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  modal: {
    minWidth: '600px',
  },
}));

interface IModal {
  open: boolean;
  handleClose: () => void;
  handleSave: (comment: string) => void;
  name: string;
}

export default function BookmarkModal(props: IModal) {
  const {
    handleClose, handleSave, open, name,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [comment, setComment] = useState<string>('');

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
        <DialogTitle className={classes.modal} id="form-dialog-title">
          Bookmark
          {' '}
          {name}
        </DialogTitle>

        <DialogContent>
          <TextField
            onChange={(e) => setComment(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Write a comment"
            type="text"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave(comment)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
