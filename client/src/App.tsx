import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from './components/Board';
import LogedInProvider from './components/LogedInProvider';
import SearchresultsProvider from './components/SearchresultsProvider';
import LoadingProvider from './components/LoadingProvider';
import Dashboard from './pages/Dashboard';
import NavigationBar from './components/NavigationBar';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <LogedInProvider>
        <LoadingProvider>
          <SearchresultsProvider>
            <div className="App">
              <NavigationBar />

              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/">
                  <Board />
                </Route>
              </Switch>
            </div>
          </SearchresultsProvider>
        </LoadingProvider>
      </LogedInProvider>
    </BrowserRouter>
  );
}

export default App;
