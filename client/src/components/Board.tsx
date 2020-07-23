import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Searchbar from './Searchbar';
import RestaurantCard from './RestaurantCard';

function Board(): JSX.Element {
  const [searchResults, setSearchResults] = useState<Array<Object> | false>(false);

  function searchNearbyRestaurants(query: string, searchType: string) {
    if (searchType === 'city') {
      fetch(`/api/nearby/${query}`)
        .then((res) => res.json())
        .then((results) => setSearchResults(results.response.venues));
    } else if (searchType === 'geo') {
      const lat = query.split(':')[0];
      const lng = query.split(':')[1];
      fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
        .then((res) => res.json())
        .then((results) => setSearchResults(results.response.venues));
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
          <Grid item xs={12} sm={6} md={4} justify="center">
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          </Grid>
        ))
      );
    } return '';
  }

  return (
    <section>
      <Grid container justify="center">
        <Searchbar nearbyRestaurants={searchNearbyRestaurants} />
      </Grid>
      <Grid container justify="space-evenly">
        {!searchResults ? null : renderCards()}
      </Grid>
    </section>
  );
}

export default Board;

// import React from 'react';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(1),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }),
// );

// export default function NestedGrid() {
//   const classes = useStyles();

//   function FormRow() {
//     return (
//       <React.Fragment>
//         <Grid item xs={4}>
//           <Paper className={classes.paper}>item</Paper>
//         </Grid>
//         <Grid item xs={4}>
//           <Paper className={classes.paper}>item</Paper>
//         </Grid>
//         <Grid item xs={4}>
//           <Paper className={classes.paper}>item</Paper>
//         </Grid>
//       </React.Fragment>
//     );
//   }

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={1}>
//         <Grid container item xs={12} spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item xs={12} spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item xs={12} spacing={3}>
//           <FormRow />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
