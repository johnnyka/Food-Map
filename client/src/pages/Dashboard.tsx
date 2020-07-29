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
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  }

  return (
    <div className={classes.root}>
      {isLogedIn
        ? (
          <>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Reviews</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {reviews.map((review: IdatabaseData) => (
                  <AccordionCard key={review.id} data={review} updateDashboard={getSavedData} />
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Bookmarks</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
