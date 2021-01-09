import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Container, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: 'center',
    justifyContent: 'center',
    height: '100%'
  },
})

const NotFoundPage = ({ data, location }) => {
  const classes = useStyles()

  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Container className={classes.container}>
        <Typography variant="h1">404</Typography>
        <Typography variant="body1">
          Sorry, looks like that route doesn't exist
        </Typography>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
