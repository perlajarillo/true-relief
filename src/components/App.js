import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import SignUp_disclamer from './SignUP_disclamer/SignUp_disclamer';
import Policy from './Policy/policy';
import LogIn from './LogIn/LogIn';
import Registration from './Registration/Registration';


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

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/policy" component={Policy} />
            <Route path="/sign-up_disclamer" component={SignUp_disclamer} />
            <Route path="/registration" component={Registration} />

          </Switch>

          <Footer />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
