import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface ILocation {
  address: string;
}

interface IRestaurantInfo {
  name: string;
  location: { address: string }
}

interface IRestaurantCard {
  restaurant: {
    name: string;
    location: { address: string };
    postalCode: string;
    distance: number;
    neighborhood: string;
    city: string;
    country: string;
    categories: [
      {
        name: string;
        icon: {
          prefix: string;
          suffix: string;
        }
      }
    ]
  }
}

function RestaurantCard(props: any): JSX.Element {
  const classes = useStyles();
  const { restaurant } = props;
  const { name, categories, location } = restaurant;
  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={categories[0].name}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${location.address} ${location.neighborhood ? location.neighborhood : ''} ${location.city ? location.city : ''}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}

export default RestaurantCard;
