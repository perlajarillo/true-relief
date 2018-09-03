import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

/* COMPONENTS */
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Disclaimer from "./SignUp/Disclaimer/Disclaimer";
import Policy from "./SignUp/Policy/policy";
import LogIn from "./LogIn/LogIn";
import PasswordForget from "./PasswordForget/PasswordForget";
import Registration from "./Registration/Registration";
import Settings from "./Settings/Settings";
import TrackPain from "./TrackPain/TrackPain";
import theme from "./theme";
import withAuthentication from "./WithAuthentication";

const App = () => (
  <div className="App">
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/password-reset" component={PasswordForget} />
          <Route path="/policy" component={Policy} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/registration" component={Registration} />
          <Route path="/trackPain" component={TrackPain} />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </MuiThemeProvider>
  </div>
);
export default withAuthentication(App);
