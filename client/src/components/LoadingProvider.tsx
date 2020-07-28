import React, { useState, createContext } from 'react';

export const LoadingContext = createContext<any>(false);

const LoadingProvider = (props: any) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        updateisLoading: (bool: boolean) => {
          setisLoading(bool);
        },
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
