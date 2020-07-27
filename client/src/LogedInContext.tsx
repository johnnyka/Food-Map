import React, { useState, createContext } from 'react';

export const [islogedIn, setislogedIn] = useState(false);
export const logedInContext = createContext({islogedIn, setislogedIn});
