import React from "react"
import Header from "./header"
import { Box, makeStyles, Typography, Link } from "@material-ui/core"
import { version } from "../../package"

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    backgroundColor: theme.palette.grey[900],
  },
}))

const Layout = ({ location, title, children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.body}>
      <Header />
      <Box component="main" flex="1 1 auto" display="flex" flexDirection="column1">
        {children}
      </Box>
      <Box component="footer" className={classes.footer} py={6}>
        <Box color="grey.500" clone>
          <Typography align="center">
            Made with
            <span role="img" aria-label="love">
              {" ❤️"}
            </span>
            for Turing by
            <Link href="https://github.com/SkelleyBelly" color="inherit">
              {" SkelleyBelly"}
            </Link>
          </Typography>
        </Box>
        <Box color="grey.600" clone>
          <Typography align="center">
            {`v${version}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
