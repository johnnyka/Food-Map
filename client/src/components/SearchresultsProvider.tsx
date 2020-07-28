import React, { useState, createContext } from 'react';

export const SearchresultsContext = createContext<any>([]);

const SearchresultsProvider = (props: any) => {
  const [searchresults, setSearchresults] = useState<Array<any>>([]);

  return (
    <SearchresultsContext.Provider
      value={{
        searchresults,
        updateSearchResults: (results: Array<any>) => {
          setSearchresults(results);
        },
      }}
    >
      {props.children}
    </SearchresultsContext.Provider>
  );
};

export default SearchresultsProvider;
