import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Searchbar from './Searchbar';
import RestaurantCard from './RestaurantCard';
import Loader from './Loader'

function Board(): JSX.Element {
  const [searchResults, setSearchResults] = useState<Array<Object> | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function searchNearbyRestaurants(query: string, searchType: string) {
    if (searchType === 'city') {
      fetch(`/api/nearby/${query}`)
        .then((res) => res.json())
        .then((results) => setSearchResults(results.response.venues))
        .then(() => setLoading(false));
    } else if (searchType === 'geo') {
      const lat = query.split(':')[0];
      const lng = query.split(':')[1];
      fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
        .then((res) => res.json())
        .then((results) => setSearchResults(results.response.venues))
        .then(() => setLoading(false));
    }
  }

  interface IRestaurant {
    restaurant: {
      id: number
    }
  }

  function renderCards(): Array<JSX.Element> | string {
    if (searchResults) {
      return (
        searchResults.map((restaurant: any): JSX.Element => (
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
        <Searchbar setSearchResults={setSearchResults} setLoading={setLoading} nearbyRestaurants={searchNearbyRestaurants} />
      </Grid>
      <Grid container justify="space-evenly">
        {!searchResults ? null : renderCards()}
      </Grid>
      <Grid container justify="center">
        {loading ? <Loader /> : null}
      </Grid>
    </section>
  );
}

export default Board;

