import React, { useContext, useState, useEffect } from 'react';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import RestaurantCard from './RestaurantCard';
import Loader from './Loader';
import { SearchresultsContext } from './SearchresultsProvider';
import { LoadingContext } from './LoadingProvider';
import { LogedInContext } from './LogedInProvider';
import Header from './Header';

// const useStyles = makeStyles((theme: Theme) => createStyles({
//   cardSection: {
//     display: 'flex',
//     justifyContent: 'center',
//     margin: 'auto',
//     textAlign: 'center',
//   }
// }));

interface Ibookmarks {
  resturant: {
    id: string;
  }
}
interface Ireviews {
  restaurant: {
    id: string;
  }
}

function Board(): JSX.Element {
  // const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const { searchresults } = useContext(SearchresultsContext);
  const { isLoading } = useContext(LoadingContext);
  const { isLogedIn } = useContext(LogedInContext);
  interface IRestaurant {
    restaurant: {
      id: number
    }
  }

  function renderCards(): Array<JSX.Element> | string {
    if (searchresults) {
      return (
        searchresults.map((restaurant: any): JSX.Element => (
          <Grid key={restaurant.id} item xs={12} sm={6} md={4}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))
      );
    } return '';
  }

  useEffect(() => {
    getSavedData();
  }, [isLogedIn]);

  function getSavedData() {
    fetch('/api/users/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));

    fetch('/api/users/bookmarks')
      .then((res) => res.json())
      .then((data) => setBookmarks(data));
  }

  function hasReviweOrBookmark(venueID: any, dataArr: any) {
    return !!dataArr.find((data:any) => data.restaurant.id === venueID);
  }
  function userIsLogedIn() {
    return (
      searchresults.map((restaurant: any): JSX.Element => (
        <Grid key={restaurant.id} item xs={12} sm={6} md={4}>
          {hasReviweOrBookmark(restaurant.id, bookmarks)}
          <RestaurantCard
            restaurant={restaurant}
            hasBookmark={hasReviweOrBookmark(restaurant.id, bookmarks)}
            hasReview={hasReviweOrBookmark(restaurant.id, reviews)}
          />
        </Grid>
      ))
    );
  }
  return (
    <section>
      <Header />
      <Grid container justify="space-evenly">
        {!searchresults ? null : isLogedIn ? userIsLogedIn() : renderCards()}
      </Grid>
      <Grid container justify="center">
        {isLoading ? <Loader /> : null}
      </Grid>
    </section>
  );
}

export default Board;
