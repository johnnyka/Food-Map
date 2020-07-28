import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarIcon from '@material-ui/icons/Star';
import VisitedModal from './VisitedModal';
import BookmarkModal from './BookmarkModal';
import { LogedInContext } from './LogedInProvider';
import GoogleModal from './GoogleModal';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
    margin: '2rem auto',
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
  star: {
    color: '#ffe100',
    width: '2rem',
    height: '2rem',
  },
  bookmark: {
    color: 'green',
    width: '2rem',
    height: '2rem',
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
  const [visitedOpen, setVisitedOpen] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const { isLogedIn } = useContext(LogedInContext);
  const [googleOpen, setGoogleOpen] = useState(false);
  const [lastClick, setLastClick] = useState('');

  const handleVisitedClickOpen = () => {
    setLastClick('Visited');
    if (isLogedIn) setVisitedOpen(true);
    else setGoogleOpen(true);
  };
  const handleBookmarkOpen = () => {
    setLastClick('Bookmark');
    if (isLogedIn) setBookmarkOpen(true);
    else setGoogleOpen(true);
  };

  const handleVisitedClose = () => {
    setVisitedOpen(false);
  };
  const handleBookmarkClose = () => {
    setBookmarkOpen(false);
  };
  const handleGoogleClose = () => {
    setGoogleOpen(false);
  };

  useEffect(() => {
    if (isLogedIn) {
      handleGoogleClose();
      if (lastClick === 'Visited') {
        handleVisitedClickOpen();
      } else if (lastClick === 'Bookmark') {
        handleBookmarkOpen();
      }
    }
  }, [isLogedIn]); // eslint-disable-line

  function saveToVisited(stars: number, review: string) {
    fetch('/api/users/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...restaurant, stars, review }),
      headers: {
        'content-type': 'Application/json',
      },
    })
      .then(() => setVisitedOpen(false));
  }

  function saveToBookmarks(comment: string) {
    fetch('/api/users/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ ...restaurant, comment }),
      headers: {
        'content-type': 'Application/json',
      },
    })
      .then(() => setBookmarkOpen(false));
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={categories[0].name}
        />
        <CardMedia
          className={classes.media}
          image="https://res.cloudinary.com/tf-lab/image/upload/w_1312,h_736,c_fill,g_auto:subject,q_auto,f_auto/restaurant/65a25515-99ba-438b-8487-747414880faf/c6d11bf4-bdf0-4da3-93f8-ea2778c68c57.jpg"
          title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${location.address}, ${location.neighborhood ? `${location.neighborhood},` : ''} ${location.city ? location.city : ''}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleVisitedClickOpen}>
            <StarIcon className={classes.star} />
          </IconButton>
          <IconButton aria-label="share" onClick={handleBookmarkOpen}>
            <BookmarkIcon className={classes.bookmark} />
          </IconButton>

        </CardActions>
      </Card>
      <BookmarkModal
        name={name}
        handleSave={saveToBookmarks}
        handleClose={handleBookmarkClose}
        open={bookmarkOpen}
      />
      <VisitedModal
        name={name}
        handleSave={saveToVisited}
        handleClose={handleVisitedClose}
        open={visitedOpen}
      />
      <GoogleModal
        handleClose={handleGoogleClose}
        open={googleOpen}
      />
    </>
  );
}

export default RestaurantCard;
