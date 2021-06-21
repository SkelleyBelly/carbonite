import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff323c",
    },
    secondary: {
      main: "#2897ff",
    },
    text: {
        primary: '#323232',
        secondary: '#7a7a7a'
    }
  },
  typography: {
    body1: {
      fontSize: '1.2rem',
    },
    h1: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
    h2: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
    h3: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
    h4: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
    h5: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
    h6: {
      fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
    },
  },
})

export default theme
