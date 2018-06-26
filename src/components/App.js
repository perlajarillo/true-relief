import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Home from './Home/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffa040',
      main: '#ff6f00',
      dark: '#c43e00',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 16,
  },
  overflow: 'hidden'
});

class App extends Component {
  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Header />
          <Home />
          <Footer />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
