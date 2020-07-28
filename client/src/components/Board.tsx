import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import RestaurantCard from './RestaurantCard';
import Loader from './Loader';
import { SearchresultsContext } from './SearchresultsProvider';
import { LoadingContext } from './LoadingProvider';

function Board(): JSX.Element {
  const { searchresults } = useContext(SearchresultsContext);
  const { isLoading } = useContext(LoadingContext);

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

  return (
    <section>
      <Grid container justify="center">
        <h1>Board</h1>
      </Grid>
      <Grid container justify="space-evenly">
        {!searchresults ? null : renderCards()}
      </Grid>
      <Grid container justify="center">
        {isLoading ? <Loader /> : null}
      </Grid>
    </section>
  );
}

export default Board;
