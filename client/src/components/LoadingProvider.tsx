import React, { useState, createContext } from 'react';

export const LoadingContext = createContext<any>(false);

const LoadingProvider = (props: any) => {
  const [isLoading, setisLoading] = useState(false);
  const { children } = props;
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        updateisLoading: (bool: boolean) => {
          setisLoading(bool);
        },
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
