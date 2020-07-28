import React from 'react';
import {
  Theme, createStyles, makeStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: 345,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'left',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  cityText: {
    padding: '0 1rem 1rem',
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
  review?: {
    review: string;
    stars: number;
  }
  comment?: string;
}

export default function AccordionCard(props: { data: IdatabaseData }) {
  const classes = useStyles();
  const { data } = props;
  const { restaurant, review, comment } = data;
  const { neighborhood, city } = restaurant.location;

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {restaurant.name}
          </Typography>
          {review ? <Rating name="read-only" value={review.stars} readOnly /> : null}
        </CardContent>
        <div className={classes.controls}>
          <Typography component="p" variant="subtitle1">{review ? `"${review.review}"` : `"${comment}"`}</Typography>
        </div>
        <div className={classes.cityText}>
          <Typography component="p" variant="caption">
            {neighborhood ? `${neighborhood}, ${city}` : `${city}`}
          </Typography>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://res.cloudinary.com/tf-lab/image/upload/w_1312,h_736,c_fill,g_auto:subject,q_auto,f_auto/restaurant/65a25515-99ba-438b-8487-747414880faf/c6d11bf4-bdf0-4da3-93f8-ea2778c68c57.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
}
