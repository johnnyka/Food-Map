import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Board from './components/Board';
import LogedInProvider from './components/LogedInProvider';
import SearchresultsProvider from './components/SearchresultsProvider';
import LoadingProvider from './components/LoadingProvider';
import Dashboard from './pages/Dashboard';
import NavigationBar from './components/NavigationBar';
import About from './pages/About';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: 'Amatic SC, cursive',
      fontWeight: 'bolder',
    },
    h3: {
      fontFamily: 'Amatic SC, cursive',
      fontWeight: 'bolder',
    },
    h4: {
      fontFamily: 'Amatic SC, cursive',
      fontWeight: 'bolder',
    },
    h5: {
      fontFamily: 'Amatic SC, cursive',
      fontWeight: 'bolder',
    },
    h6: {
      fontFamily: 'Amatic SC, cursive',
      fontWeight: 'bolder',
    },
  },
});
function App() {
  return (
    <BrowserRouter>
      <LogedInProvider>
        <LoadingProvider>
          <SearchresultsProvider>
            <ThemeProvider theme={theme}>
              <div className="App" id="App">
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
            </ThemeProvider>
          </SearchresultsProvider>
        </LoadingProvider>
      </LogedInProvider>
    </BrowserRouter>
  );
}

export default App;
