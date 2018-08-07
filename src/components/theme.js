import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#fff",
      dark: "#c7c7c7",
      contrastText: "#1950ae"
    },
    secondary: {
      light: "#5c7ce1",
      main: "#1950ae",
      dark: "#00297e",
      contrastText: "#fff"
    }
  },
  typography: {
    fontSize: 16
  },
  overflow: "hidden",
});

