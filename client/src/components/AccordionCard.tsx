import React, { useState, useEffect } from 'react';
import {
  Theme, createStyles, makeStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: 380,
    minHeight: 165,
    margin: '10px 20px',
    [theme.breakpoints.down('xs')]: {
      margin: '8px 10px',
      minHeight: 100,
    },
  },
  header: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  text: {
    fontFamily: 'Mulish, sans-serif',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
  },
  content: {
    flex: '1 0 auto',
    paddingLeft: 0,
    paddingRight: 5,
    [theme.breakpoints.down('xs')]: {
      padding: '8px 0 0 0',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cover: {
    width: 280,
    [theme.breakpoints.down('xs')]: {
      width: 150,
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    paddingBottom: theme.spacing(1),
    textAlign: 'left',
    justifyContent: 'center',
    fontStyle: 'italic',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  cityText: {
    padding: '0 1rem 1rem',
    paddingLeft: 0,
    paddingRight: 5,
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 8px 0',
    },
  },
  size: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  removeBtn: {
    height: 'fit-content',
    paddingRight: 5,
    color: 'lightgrey',
    '&:hover': {
      color: 'black',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 5,
      paddingTop: 5,
    },
  },
  stars: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
}));

interface IdatabaseData {
  cookie: string;
  id: string;
  date: string;
  restaurant: {
    id: string;
    name: string;
    location: {
      address: string;
      city: string;
      lat: number;
      lng: number;
      postalCode: string;
      country: string;
      neighborhood: string;
    }
    categories: {
      categoryId: string;
      categoryName: string;
    }
  }
  picture: string;
  review?: {
    review: string;
    stars: number;
  }
  comment?: string;
}

function AccordionCard(props: { data: IdatabaseData, updateDashboard: any }): JSX.Element {
  const classes = useStyles();
  const { data, updateDashboard } = props;
  const {
    restaurant, review, comment, id, picture
  } = data;
  const { neighborhood, city } = restaurant.location;

  const [type, setType] = useState<string>('');

  useEffect(() => {
    if (review) {
      setType('reviews');
    } else if (comment) {
      setType('bookmarks');
    }
  }, []);

  async function handleRemove(): Promise<void> {
    await fetch(`/api/users/${type}/${id}`, { method: 'DELETE' });
    updateDashboard();
  }

  return (
    <Card className={classes.root}>
      <IconButton className={classes.removeBtn} aria-label="remove" onClick={handleRemove}>
        <HighlightOffIcon />
      </IconButton>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.header} component="h5" variant="h5">
            {restaurant.name}
          </Typography>
          {review ? <Rating className={classes.stars} name="read-only" value={review.stars} readOnly /> : null}
        </CardContent>
        <div className={classes.controls}>
          <Typography className={classes.text} component="p" variant="subtitle1">{review ? `"${review.review}"` : `"${comment}"`}</Typography>
        </div>
        <div className={classes.cityText}>
          <Typography className={classes.text + classes.size} component="p" variant="caption">
            {neighborhood ? `${neighborhood}, ${city}` : `${city}`}
          </Typography>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={picture}
        title={restaurant.name}
      />
    </Card>
  );
}

export default AccordionCard;
