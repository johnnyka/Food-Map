import React, { useState, useEffect } from 'react';
import {
  Paper, Divider, IconButton, TextField,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import NearMeIcon from '@material-ui/icons/NearMe';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    marginTop: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: 200,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
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
interface SearchBarInterface {
  nearbyRestaurants: (query:string, searchType:string) => void
}

function Searchbar(props:SearchBarInterface): JSX.Element {
  const classes = useStyles();
  const [cities, setCities] = useState<Array<CityInterface>>([{ city: 'Loading...' }]);
  const [searchText, setSearchText] = useState<string>('');

  function getCities(): void {
    fetch('/api/se/cities')
      .then((res) => res.json())
      .then((data) => setCities(data));
  }

  useEffect(() => {
    getCities();
  }, []);

  function handleSubmit(e:React.FormEvent):void {
    e.preventDefault();
    props.nearbyRestaurants(searchText, 'city');
  }

  function getGeoLocation():void{
    navigator.geolocation.getCurrentPosition((pos) => {
      props.nearbyRestaurants(`${pos.coords.latitude}:${pos.coords.longitude}`, 'geo');
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
            margin="normal"
            placeholder="Search for restaurants"
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
