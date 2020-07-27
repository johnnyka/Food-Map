import React, { useState, createContext } from 'react';
import './App.css';
import Board from './components/Board';
import GoogleLoginButton from './components/GoogleLoginButton'
import { logedInContext, islogedIn, setislogedIn } from './LogedInContext';

function App() {

  return (
    <logedInContext.Provider value={{ islogedIn, setislogedIn }}>
      <div className="App">
        {/* <GoogleLoginButton setislogedIn={setislogedIn}/> */}
        <GoogleLoginButton />
        <Board />
      </div>
    </ logedInContext.Provider >

  );
}

export default App;
