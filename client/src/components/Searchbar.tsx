import React, { useState, useEffect, useContext } from 'react';
import {
  Paper, Divider, IconButton, TextField,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import NearMeIcon from '@material-ui/icons/NearMe';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { SearchresultsContext } from './SearchresultsProvider';
import { LoadingContext } from './LoadingProvider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',

  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: 250,
    [theme.breakpoints.down('xs')]: {
      minWidth: 105,
    },
  },
  iconButton: {
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 6,
    },
  },
  divider: {
    height: 28,
    margin: 4,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
}));

interface CityInterface {
  city: string
  admin?: string
  country?: string
  population_proper?: string
  iso2?: string
  capital?: string
  lat?: string
  lng?: string
  population?: string
}

function Searchbar(): JSX.Element {
  const classes = useStyles();
  const [cities, setCities] = useState<Array<CityInterface>>([{ city: 'Loading...' }]);
  const [searchText, setSearchText] = useState<string>('');
  const { updateSearchResults } = useContext(SearchresultsContext);
  const { updateisLoading } = useContext(LoadingContext);
  const history = useHistory();

  function searchNearbyRestaurants(query: string, searchType: string) {
    history.push('/');
    if (searchType === 'city') {
      fetch(`/api/nearby/${query}`)
        .then((res) => res.json())
        .then((results) => {updateSearchResults(results.response.venues)})
        .then(() => updateisLoading(false));
    } else if (searchType === 'geo') {
      const lat = query.split(':')[0];
      const lng = query.split(':')[1];
      fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
        .then((res) => res.json())
        .then((results) => updateSearchResults(results.response.venues))
        .then(() => updateisLoading(false));
    }
  }

  function getCities(): void {
    fetch('/api/se/cities')
      .then((res) => res.json())
      .then((data) => setCities(data));
  }

  useEffect(() => {
    getCities();
  }, []);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    updateisLoading(true);
    if (searchText === '') {
      updateisLoading(false);
    } else {
      updateSearchResults(false);
      searchNearbyRestaurants(searchText, 'city');
    }
  }

  function getGeoLocation(): void {
    updateisLoading(true);
    updateSearchResults(false);
    navigator.geolocation.getCurrentPosition((pos) => {
      searchNearbyRestaurants(`${pos.coords.latitude}:${pos.coords.longitude}`, 'geo');
    });
  }

  return (
    <Paper component="form" onSubmit={(e) => handleSubmit(e)} className={classes.root}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={cities.map((c) => c.city).sort()}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setSearchText(e.target.value)}
            // eslint-disable-next-line
            {...params}
            className={classes.input}
            placeholder="Search restaurants or cities"
            fullWidth
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" onClick={() => getGeoLocation()} className={classes.iconButton} aria-label="nearme">
        <NearMeIcon />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;
