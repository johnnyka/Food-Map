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
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
    margin: '2rem auto',
    height: 425,
    [theme.breakpoints.down('xs')]: {
      margin: '0.5rem 1rem',
      height: 300,
    },
  },
  cardHeader: {
    [theme.breakpoints.down('xs')]: {
      padding: '8px 0',
    },
  },
  cardAction: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      justifyContent: 'center',
    },
  },
  header: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  text: {
    fontFamily: 'Mulish, sans-serif',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  textWrapper: {
      paddingTop: 8,
      paddingBottom: 0,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.down('xs')]: {
      height: 0,
      fontSize: theme.typography.pxToRem(12),
    },
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
  unfilled: {
    color: 'lightgray',
  },
  star: {
    color: '#ffe100',
    width: '2rem',
    height: '2rem',
    [theme.breakpoints.down('xs')]: {
      width: '1.5rem',
      height: '1.5rem',
    },
  },
  bookmark: {
    color: 'green',
    width: '2rem',
    height: '2rem',
    [theme.breakpoints.down('xs')]: {
      width: '1.5rem',
      height: '1.5rem',
    },
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
  const [bookmark, setbookmark] = useState(false);
  const [review, setReview] = useState(false);

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

  useEffect(() => {
    if (props.hasBookmark) {
      setbookmark(true);
    }
    if (props.hasReview) {
      setReview(true)
    }

  }, []);

  function saveToVisited(stars: number, review: string) {
    fetch('/api/users/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...restaurant, stars, review }),
      headers: {
        'content-type': 'Application/json',
      },
    })
      .then(() => setVisitedOpen(false));
    setReview(true);
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
    setbookmark(true);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          classes={{
            title: classes.header,
            subheader: classes.text,
          }}
          title={name}
          subheader={categories[0].name}
        />
        <CardMedia
          className={classes.media}
          image={props.restaurant.picture}
          title={name}
        />
        <CardContent className={classes.textWrapper}>
          <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
            {`${location.address}, ${location.neighborhood ? `${location.neighborhood},` : ''} ${location.city ? location.city : ''}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction} disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleVisitedClickOpen}>
            {review ? <StarIcon className={classes.star} /> : <StarBorderIcon className={classes.star} />}
          </IconButton>
          <IconButton aria-label="share" onClick={handleBookmarkOpen}>
            {bookmark ? <BookmarkIcon className={classes.bookmark} /> : <BookmarkBorderIcon className={classes.bookmark} />}

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
