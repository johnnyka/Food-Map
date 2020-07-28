import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels: { [index: string]: string } = {
  0: 'Unrated',
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
});

interface IRating {
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
}

export default function HoverRating(props: IRating) {
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  const { stars, setStars } = props;

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={stars}
        precision={0.5}
        onChange={(event, newValue: any) => {
          setStars(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {stars !== null && <Box ml={2}>{labels[hover !== -1 ? hover : stars]}</Box>}
    </div>
  );
}
