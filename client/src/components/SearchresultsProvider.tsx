import React, { useState, createContext } from 'react';

export const SearchresultsContext = createContext<any>([]);

const SearchresultsProvider = (props: any) => {
  const [searchresults, setSearchresults] = useState<Array<any>>([]);
  const { children } = props;

  return (
    <SearchresultsContext.Provider
      value={{
        searchresults,
        updateSearchResults: (results: Array<any>) => {
          setSearchresults(results);
        },
      }}
    >
      {children}
    </SearchresultsContext.Provider>
  );
};

export default SearchresultsProvider;
