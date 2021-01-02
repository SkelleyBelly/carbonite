import React from "react"
import { Link } from "gatsby-theme-material-ui";
const { Box, Typography } = require("@material-ui/core")

const Header = () => (
  <Box bgcolor="primary.main" py={2}>
    <Link to="/" color="inherit" underline="none">
      <Typography variant="h4" align="center" style={{ color: "white" }}>
        Carbonite
      </Typography>
    </Link>
  </Box>
)

export default Header
