import React, { useState, createContext } from 'react';

export const LogedInContext = createContext<any>(false);

const LogedInProvider = (props: any) => {
  const [isLogedIn, setisLogedIn] = useState(false);

  return (
    <LogedInContext.Provider
      value={{
        isLogedIn,
        updateLogedIn: (bool: boolean) => {
          setisLogedIn(bool);
        },
      }}
    >
      {props.children}
    </LogedInContext.Provider>
  );
};

export default LogedInProvider;
