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
import StarWidget from './StarWidget';

const useStyles = makeStyles(() => createStyles({
  modal: {
    minWidth: '600px',
  },
}));

interface IModal {
  open: boolean;
  handleClose: () => void;
  handleSave: (stars: number, review: string) => void;
  name: string;
}

export default function VisitedModal(props: IModal) {
  const {
    handleClose, handleSave, open, name,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [stars, setStars] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
        <DialogTitle className={classes.modal} id="form-dialog-title">
          Rate
          {' '}
          {name}
        </DialogTitle>
        <StarWidget stars={stars} setStars={setStars} />
        <DialogContent>
          <TextField
            onKeyPress={(e) => { if (e.key === 'Enter') handleSave(stars, review); }}
            onChange={(e) => setReview(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Write your review"
            type="text"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave(stars, review)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
