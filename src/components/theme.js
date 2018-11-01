import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#5c7ce1",
      main: "#1950ae",
      dark: "#00297e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#c7c7c7",
      main: "#969696",
      dark: "#686868",
      contrastText: "#000"
    }
  },
  typography: {
    fontSize: 16,
    useNextVariants: true
  }
});
