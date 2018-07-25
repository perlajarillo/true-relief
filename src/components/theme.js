import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#53c2a2",
      main: "#109173",
      dark: "#006248",
      contrastText: "#fff"
    },
    secondary: {
      light: "#b2fef7",
      main: "#80cbc4",
      dark: "#4f9a94",
      contrastText: "#000"
    }
  },
  typography: {
    fontSize: 16
  },
  overflow: "hidden",
});

