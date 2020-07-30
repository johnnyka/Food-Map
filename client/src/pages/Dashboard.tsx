import React, { useState, useEffect, useContext } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionCard from '../components/AccordionCard';
import { LogedInContext } from '../components/LogedInProvider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      width: '95%',
    },
  },
  accordion: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  summary: {
    backgroundColor: 'rgba(230, 230, 230, 0.9)',
    '&:hover': {
      backgroundColor: 'rgba(200, 200, 200, 0.9)',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Montserrat, sans-serif',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  cards: {
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(230, 230, 230, 0.3)',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(15),
      padding: 0,
    },
  },
}));

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const { isLogedIn } = useContext(LogedInContext);
  const classes = useStyles();

  function getSavedData() {
    fetch('/api/users/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));

    fetch('/api/users/bookmarks')
      .then((res) => res.json())
      .then((data) => setBookmarks(data));
  }

  useEffect(() => {
    getSavedData();
  }, []);

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
  }

  return (
    <div className={classes.root}>
      {isLogedIn
        ? (
          <>
            <Accordion className={classes.accordion} TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Reviews</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.cards}>
                {reviews.map((review: IdatabaseData) => (
                  <AccordionCard key={review.id} data={review} updateDashboard={getSavedData} />
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Bookmarks</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.cards}>
                {bookmarks.map((bookmark: IdatabaseData) => (
                  <AccordionCard key={bookmark.id} data={bookmark} updateDashboard={getSavedData} />
                ))}
              </AccordionDetails>
            </Accordion>
          </>
        )
        : <span>You are not logged in. Please sign in with your google account</span>}
    </div>
  );
}
