import React, { useState } from 'react';
import Searchbar from './Searchbar';
import RestaurantCard from './RestaurantCard';

function Board(): JSX.Element {
  const [searchResults, setSearchResults] = useState<Array<Object> | false>(false);

  function searchNearbyRestaurants(query: string, searchType: string) {
    if (searchType === 'city') {
      fetch(`/api/nearby/${query}`)
        .then((res) => res.json())
        .then((results) =>{ 
          setSearchResults(results.response.venues);
        })
    } else if (searchType === 'geo') {
      const lat = query.split(':')[0];
      const lng = query.split(':')[1];
      fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
        .then((res) => res.json())
        .then((results) =>{ 
          setSearchResults(results.response.venues);
        })
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
        searchResults.map((restaurant: any): JSX.Element => {
          return (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          )
          })
      );
    } return '';
  }

  // WEB SCRAPING GOOGLE PICTURES WITH PUPPETEER
/*   function webScrapePicture(nameOfRestaurant:string, city:string):void {
    console.log(nameOfRestaurant, city);
    fetch(`/api/restaurant/image/${city}/${nameOfRestaurant}`)
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error(err))
  } */

  return (
    <section>
      <Searchbar nearbyRestaurants={searchNearbyRestaurants} />
      {!searchResults ? null : renderCards()}
    </section>
  );
}

export default Board;
