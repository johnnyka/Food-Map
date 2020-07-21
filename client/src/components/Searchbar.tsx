import React, { useState, useEffect } from 'react'
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import NearMeIcon from '@material-ui/icons/NearMe';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface CityInterface {
  city: string
  admin: string
  country: string
  population_proper: string
  iso2: string
  capital: string
  lat: string
  lng: string
  population: string
}


/* "city": "Stockholm", 
"admin": "Stockholm", 
"country": "Sweden", 
"population_proper": "1253309", 
"iso2": "SE", 
"capital": "primary", 
"lat": "59.333333", 
"lng": "18.05", 
"population": "1264000" */

function Searchbar(): JSX.Element {
  const classes = useStyles();
  //const [cities, setCities] = useState<Promise<[]>>(getCities());

  useEffect(() => {
    getCities();
  }, []);

 async function getCities():Promise<Array<Object>>{
    let listOfCities:[] = await fetch('/api/se/cities')
      .then(res => res.json())
      .then(data => listOfCities = data);
     return listOfCities;   
  }
  
  return (
    <Paper component="form" className={classes.root} onClick={() => getCities()} 
    style={{height:100}}>
    {/*   <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={cities.map((c) => c.city)}
        renderInput={(params) => (
          <>
            <InputBase
              className={classes.input}
              placeholder="Search for restaurants"
              inputProps={{ 'aria-label': 'search for restaurants' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="nearme">
              <NearMeIcon />
            </IconButton>
          </>
        )}
      /> */}
    </Paper>
  )
}

export default Searchbar;
